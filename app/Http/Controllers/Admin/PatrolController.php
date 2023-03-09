<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patrol;
use App\Http\Requests\Admin\StorePatrolRequest;
use App\Http\Requests\Admin\UpdatePatrolRequest;
use App\Models\Car;
use App\Models\User;
use App\Models\Zone;
use App\Utils\Geometry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class PatrolController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Inertia\Response
   */
  public function index(): Response
  {
    return Inertia::render('Admin/Patrols/Index', [
      'patrolsInDay' => Patrol::getByDate(Carbon::now()->toDate()),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Inertia\Response
   */
  public function create(): Response
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
   *
   * @param \App\Http\Requests\Admin\StorePatrolRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function store(StorePatrolRequest $request): RedirectResponse
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
   *
   * @param \App\Models\Patrol $patrol
   * @return \Inertia\Response
   */
  public function show(Patrol $patrol): Response
  {
    return Inertia::render('Admin/Patrols/Show', [
      'patrol' => $patrol->with('user', 'car', 'zone')
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param \App\Models\Patrol $patrol
   * @return \Inertia\Response
   */
  public function edit(Patrol $patrol): Response
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
   *
   * @param \App\Http\Requests\Admin\UpdatePatrolRequest $request
   * @param \App\Models\Patrol $patrol
   * @return \Illuminate\Http\RedirectResponse
   */
  public function update(UpdatePatrolRequest $request, Patrol $patrol): RedirectResponse
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
   *
   * @param \App\Models\Patrol $patrol
   * @return \Illuminate\Http\RedirectResponse
   */
  public function destroy(Patrol $patrol): RedirectResponse
  {
    $patrol->delete();

    return Redirect::route('admin.patrols.index');
  }

  public function getPatrolsByDate(Request $request): JsonResponse
  {
    $date = Carbon::parse($request->date)->toDate();

    return HttpResponse::json(Patrol::getByDate($date));
  }
}
