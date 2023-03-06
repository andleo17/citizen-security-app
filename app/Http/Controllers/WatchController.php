<?php

namespace App\Http\Controllers;

use App\Models\Patrol;
use App\Models\Report;
use App\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class WatchController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Request $request)
  {
    $now = Carbon::now();

    $reports = Report::where('state', 'false')->with('user')->get();
    $zones = Zone::all();
    $patrols = Patrol::whereDate('start_at', $now->toDate())
      ->orWhereDate('end_at', $now->toDate())
      ->with('user', 'zone', 'car')
      ->get()
      ->filter(fn ($value) => $value->is_current)
      ->values();

    return Inertia::render('Watch', [
      'reports' => $reports,
      'zones' => $zones,
      'patrols' => $patrols,
    ]);
  }
}
