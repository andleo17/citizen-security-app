<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Route;
use App\Http\Requests\Admin\StoreRouteRequest;
use App\Http\Requests\Admin\UpdateRouteRequest;
use App\Models\Zone;
use App\Utils\Geometry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class RouteController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    $routes = Route::with('zone')->paginate(10);

    return Inertia::render('Admin/Routes/Index', [
      'routes' => $routes,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create(): Response
  {
    $zones = Zone::all();

    return Inertia::render('Admin/Routes/Create', [
      'zones' => $zones,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreRouteRequest $request): RedirectResponse
  {
    $route = new Route();

    $route->name = $request->name;
    $route->path = Geometry::toLineString($request->path);
    $route->zone_id = $request->zone_id;

    $route->save();

    return Redirect::route('admin.routes.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(Route $route)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Route $route): Response
  {
    $zones = Zone::all();

    return Inertia::render('Admin/Routes/Edit', [
      'zones' => $zones,
      'route' => $route,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateRouteRequest $request, Route $route): RedirectResponse
  {
    $route->name = $request->name;
    $route->path  = Geometry::toLineString($request->path);
    $route->zone_id = $request->zone_id;

    $route->save();

    return Redirect::route('admin.routes.index');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Route $route): RedirectResponse
  {
    $route->delete();

    return Redirect::route('admin.routes.index');
  }
}
