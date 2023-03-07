<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
    return Inertia::render('Admin/Dashboard');
  }
}
