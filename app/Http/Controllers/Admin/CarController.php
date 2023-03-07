<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Http\Requests\Admin\StoreCarRequest;
use App\Http\Requests\Admin\UpdateCarRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CarController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Inertia\Response
   */
  public function index(): Response
  {
    return Inertia::render('Admin/Cars/Index', [
      'cars' => Car::all(),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Inertia\Response
   */
  public function create(): Response
  {
    return Inertia::render('Admin/Cars/Create');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param \App\Http\Requests\Admin\StoreCarRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function store(StoreCarRequest $request): RedirectResponse
  {
    $car = new Car();
    $car->licensePlate = $request->licensePlate;

    $car->save();

    return Redirect::route('admin.cars.index');
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param \App\Models\Car $car
   * @return \Inertia\Response
   */
  public function edit(Car $car): Response
  {
    return Inertia::render('Admin/Cars/Edit', [
      'car' => $car,
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param \App\Http\Requests\Admin\UpdateCarRequest $request
   * @return \App\Models\Car $car
   */
  public function update(UpdateCarRequest $request, Car $car): RedirectResponse
  {
    $car->licensePlate = $request->licensePlate;

    $car->save();

    return Redirect::route('admin.cars.index');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param \App\Models\Car $car
   * @return \Illuminate\Http\RedirectResponse
   */
  public function destroy(Car $car): RedirectResponse
  {
    $car->delete();
    return redirect()->route('admin.cars.index');
  }
}
