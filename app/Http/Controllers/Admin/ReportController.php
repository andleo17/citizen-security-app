<?php

namespace App\Http\Controllers\Admin;

use App\Casts\TimeAgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateReportRequest;
use App\Models\Report;
use App\Models\ReportCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Inertia\Response
   */
  public function index(): Response
  {
    $reports = Report::orderBy('state', 'asc')
      ->orderBy('created_at', 'desc')
      ->with('user', 'reportSubCategory')
      ->withCasts(['created_at' => TimeAgo::class])
      ->get();

    return Inertia::render('Admin/Reports/Index', ['reports' => $reports]);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Report  $report
   * @return \Inertia\Response
   */
  public function edit(Report $report): Response
  {
    return Inertia::render('Admin/Reports/Edit', [
      'report' => $report->load('user', 'reportSubCategory'),
      'categories' => ReportCategory::all()->load('subCategories')
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \App\Http\Requests\Admin\UpdateReportRequest $request
   * @param  \App\Models\Report $report
   * @return \Illuminate\Http\RedirectResponse
   */
  public function update(UpdateReportRequest $request, Report $report): RedirectResponse
  {
    $report->report_sub_category_id = $request->subCategory;
    $report->state = $request->state;
    $report->save();

    return Redirect::route('admin.reports.index');
  }
}
