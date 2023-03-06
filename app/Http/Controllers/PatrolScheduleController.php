<?php

namespace App\Http\Controllers;

use App\Events\CarLocationChange;
use App\Models\Car;
use App\Utils\Geometry;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class PatrolScheduleController extends Controller
{
  public function index()
  {
    $currentPatrol = Auth::user()->currentPatrol();
    return Inertia::render('Patrol/EmitLocation', [
      'patrol' => $currentPatrol ? $currentPatrol->load('car') : null,
    ]);
  }

  public function start()
  {
    $currentPatrol = Auth::user()->currentPatrol();
    $currentPatrol->started_at = Carbon::now();

    $currentPatrol->save();

    return Response::json(['message' => 'Patrol started', 'status' => true]);
  }

  public function updatePosition(Request $request)
  {
    $currentPatrol = Auth::user()->currentPatrol();
    $currentPatrol->location = Geometry::toPoint($request->location);
    $currentPatrol->save();

    event(new CarLocationChange($currentPatrol));

    return response()->json(['message' => 'Patrol location updated']);
  }

  public function finish()
  {
    $currentPatrol = Auth::user()->currentPatrol();
    $currentPatrol->finished_at = Carbon::now();
    $currentPatrol->save();

    event(new CarLocationChange($currentPatrol));

    return redirect()->route('patrol.location');
  }

  public function schedules()
  {
    $now = Carbon::now();
    $patrols = Auth::user()->patrols->whereDate('start_at', $now->toDate())
      ->orWhereDate('end_at', $now->toDate());

    return Response::json($patrols);
  }
}
