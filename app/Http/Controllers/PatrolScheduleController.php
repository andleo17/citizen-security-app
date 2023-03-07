<?php

namespace App\Http\Controllers;

use App\Events\CarLocationChange;
use App\Http\Requests\UpdatePositionRequest;
use App\Utils\Geometry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class PatrolScheduleController extends Controller
{
  /**
   * Show the emit location page.
   *
   * @return \Inertia\Response
   */
  public function index(): Response
  {
    $currentPatrol = Auth::user()->currentPatrol();
    return Inertia::render('Patrol/EmitLocation', [
      'patrol' => $currentPatrol ? $currentPatrol->load('car') : null,
    ]);
  }

  public function start(): JsonResponse
  {
    $currentPatrol = Auth::user()->currentPatrol();
    $currentPatrol->started_at = Carbon::now();

    $currentPatrol->save();

    return HttpResponse::json(['message' => 'Patrol started', 'status' => true]);
  }

  public function updatePosition(UpdatePositionRequest $request): JsonResponse
  {
    $currentPatrol = Auth::user()->currentPatrol();
    $currentPatrol->location = Geometry::toPoint(json_encode($request->location));
    $currentPatrol->save();

    event(new CarLocationChange($currentPatrol->load('car')));

    return HttpResponse::json(['message' => 'Patrol location updated']);
  }

  public function finish(): RedirectResponse
  {
    $currentPatrol = Auth::user()->currentPatrol();
    $currentPatrol->finished_at = Carbon::now();
    $currentPatrol->save();

    event(new CarLocationChange($currentPatrol->load('car')));

    return Redirect::route('patrol.location');
  }

  public function schedules(): JsonResponse
  {
    $now = Carbon::now();
    $patrols = Auth::user()->patrols->whereDate('start_at', $now->toDate())
      ->orWhereDate('end_at', $now->toDate());

    return HttpResponse::json($patrols);
  }
}
