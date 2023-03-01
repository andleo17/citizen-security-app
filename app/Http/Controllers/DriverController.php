<?php

namespace App\Http\Controllers;

use App\Events\TruckLocationChange;
use App\Models\Car;
use App\Models\Truck;
use App\Utils\Geometry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Contracts\EventDispatcher\Event;

class DriverController extends Controller
{
  public function index()
  {
    $truck = Auth::user()->truck;
    return Inertia::render('Driver/EmitLocation', ['truck' => $truck]);
  }

  public function edit()
  {
    if (Auth::user()->truck !== null) return redirect()->route('driver.location');
    $trucks = Car::doesntHave('user')->with('zone')->get();
    return Inertia::render('Driver/ChangeTruck', ['trucks' => $trucks]);
  }

  public function update(Request $request, Car $truck)
  {
    $truck->user_id = $request->user()->id;
    $truck->save();

    // broadcast(new TruckLocationChange($truck));

    return redirect()->route('driver.location');
  }

  public function updatePosition(Request $request, Car $truck)
  {
    $truck->location = Geometry::toPoint($request->location);
    $truck->save();

    // broadcast(new TruckLocationChange($truck));

    return response()->json(['message' => 'ok']);
  }

  public function destroy(Car $truck)
  {
    $truck->user_id = null;
    $truck->save();

    // broadcast(new TruckLocationChange($truck));

    return redirect()->route('driver.location');
  }
}
