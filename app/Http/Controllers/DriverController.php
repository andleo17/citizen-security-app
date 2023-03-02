<?php

namespace App\Http\Controllers;

use App\Events\CarLocationChange;
use App\Models\Car;
use App\Utils\Geometry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DriverController extends Controller
{
  public function index()
  {
    $car = Auth::user()->car;
    return Inertia::render('Driver/EmitLocation', ['car' => $car]);
  }

  public function edit()
  {
    if (Auth::user()->car !== null) return redirect()->route('driver.location');
    $cars = Car::doesntHave('user')->get();
    return Inertia::render('Driver/ChangeCar', ['cars' => $cars]);
  }

  public function update(Request $request, Car $car)
  {
    $car->user_id = $request->user()->id;
    $car->save();

    event(new CarLocationChange($car));

    return redirect()->route('driver.location');
  }

  public function updatePosition(Request $request, Car $car)
  {
    $car->location = Geometry::toPoint($request->location);
    $car->save();

    event(new CarLocationChange($car));

    return response()->json(['message' => 'ok']);
  }

  public function destroy(Car $car)
  {
    $car->user_id = null;
    $car->save();

    event(new CarLocationChange($car));

    return redirect()->route('driver.location');
  }
}
