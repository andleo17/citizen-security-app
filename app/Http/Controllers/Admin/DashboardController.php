<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
  /**
   * Show the dashboard admin.
   *
   * @return \Inertia\Response
   */
  public function __invoke(): Response
  {
    $now = Carbon::now();
    $reports = Report::count();
    $reportsByDay = Report::whereDay('created_at', $now)->count();

    return Inertia::render('Admin/Dashboard', [
      'reports' => $reports,
      'reportsByDay' => $reportsByDay,
    ]);
  }
}
