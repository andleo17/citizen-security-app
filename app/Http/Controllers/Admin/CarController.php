<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Http\Requests\StoreCarRequest;
use App\Http\Requests\UpdateCarRequest;
use Inertia\Inertia;

class CarController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('Admin/Cars/Index', [
      'cars' => Car::all(),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Admin/Cars/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreCarRequest $request)
  {
    $car = new Car();
    $car->licensePlate = $request->licensePlate;

    $car->save();

    return redirect()->route('admin.cars.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(Car $car)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Car $car)
  {
    return Inertia::render('Admin/Cars/Edit', [
      'car' => $car,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateCarRequest $request, Car $car)
  {
    $car->licensePlate = $request->licensePlate;

    $car->save();

    return redirect()->route('admin.cars.index');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Car $car)
  {
    $car->delete();
    return redirect()->route('admin.cars.index');
  }
}
