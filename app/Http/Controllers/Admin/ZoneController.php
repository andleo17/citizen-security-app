<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreZoneRequest;
use App\Http\Requests\UpdateZoneRequest;
use App\Models\Zone;
use App\Utils\Geometry;
use Inertia\Inertia;

class ZoneController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('Admin/Zones/Index', [
      'zones' => Zone::all(),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Admin/Zones/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreZoneRequest $request)
  {
    $zone = new Zone();
    $zone->name = $request->name;
    $zone->area = Geometry::toPolygon($request->area);

    $zone->save();

    return redirect()->route('admin.zones.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(Zone $zone)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Zone $zone)
  {
    return Inertia::render('Admin/Zones/Edit', ['zone' => $zone]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateZoneRequest $request, Zone $zone)
  {
    $zone->name = $request->name;
    $zone->area = Geometry::toPolygon($request->area);

    $zone->save();

    return redirect()->route('admin.zones.index');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Zone $zone)
  {
    $zone->delete();

    return redirect()->route('admin.zones.index');
  }
}
