<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patrol;
use App\Http\Requests\StorePatrolRequest;
use App\Http\Requests\UpdatePatrolRequest;
use App\Models\Car;
use App\Models\User;
use App\Models\Zone;
use App\Utils\Geometry;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class PatrolController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $now = Carbon::now();
    return Inertia::render('Admin/Patrols/Index', [
      'patrolsInDay' => Patrol::whereDate('start_at', $now->toDate())
        ->orWhereDate('end_at', $now->toDate())
        ->with('user', 'zone', 'car')
        ->get(),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $drivers = User::whereIn('role', ['Police', 'Admin'])->get();
    $cars = Car::all();
    $zones = Zone::all();

    return Inertia::render('Admin/Patrols/Create', [
      'drivers' => $drivers,
      'cars' =>  $cars,
      'zones' => $zones,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StorePatrolRequest $request)
  {
    $patrol = new Patrol();
    $patrol->start_at = $request->start_at;
    $patrol->end_at = $request->end_at;
    $patrol->route = Geometry::toLineString($request->route);
    $patrol->user_id = $request->user_id;
    $patrol->car_id = $request->car_id;
    $patrol->zone_id = $request->zone_id;

    $patrol->save();

    return Redirect::route('admin.patrols.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(Patrol $patrol)
  {
    return Inertia::render('Admin/Patrols/Show', [
      'patrol' => $patrol->with('user', 'car', 'zone')
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Patrol $patrol)
  {
    $drivers = User::whereIn('role', ['Police', 'Admin']);
    $cars = Car::all();
    $zones = Zone::all();

    return Inertia::render('Admin/Patrols/Create', [
      'patrol' => $patrol->with('user', 'car', 'zone'),
      'drivers' => $drivers,
      'cars' =>  $cars,
      'zones' => $zones,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdatePatrolRequest $request, Patrol $patrol)
  {
    $patrol->start_at = $request->start_at;
    $patrol->end_at = $request->end_at;
    $patrol->route = Geometry::toLineString($request->route);
    $patrol->user_id = $request->user_id;
    $patrol->car_id = $request->car_id;
    $patrol->zone_id = $request->zone_id;

    $patrol->save();

    return Redirect::route('admin.patrols.index');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Patrol $patrol)
  {
    $patrol->delete();

    return Redirect::route('admin.patrols.index');
  }
}
