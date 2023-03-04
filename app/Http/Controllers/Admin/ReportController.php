<?php

namespace App\Http\Controllers\Admin;

use App\Casts\TimeAgo;
use App\Events\NewReport;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Utils\Geometry;
use Inertia\Inertia;

class ReportController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $reports = Report::orderBy('state', 'asc')
      ->orderBy('created_at', 'desc')
      ->with('user', 'reportSubCategory')
      ->withCasts(['created_at' => TimeAgo::class])
      ->get();
    return Inertia::render('Admin/Reports/Index', ['reports' => $reports]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \App\Http\Requests\StoreReportRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(StoreReportRequest $request)
  {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Report  $report
   * @return \Illuminate\Http\Response
   */
  public function show(Report $report)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Report  $report
   * @return \Illuminate\Http\Response
   */
  public function edit(Report $report)
  {
    return Inertia::render('Admin/Reports/Edit', [
      'report' => $report->load('user', 'reportSubCategory'),
      'categories' => ReportCategory::all()->load('subCategories')
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \App\Http\Requests\UpdateReportRequest  $request
   * @param  \App\Models\Report  $report
   * @return \Illuminate\Http\Response
   */
  public function update(UpdateReportRequest $request, Report $report)
  {
    $report->report_sub_category_id = $request->subCategory;
    $report->state = $request->state;
    $report->save();

    return redirect()->route('admin.reports.index');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Report  $report
   * @return \Illuminate\Http\Response
   */
  public function destroy(Report $report)
  {
    //
  }
}
