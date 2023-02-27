<?php

namespace App\Http\Controllers;

use App\Casts\TimeAgo;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Models\Report;
use App\Utils\Geometry;
use Inertia\Inertia;
use MatanYadaev\EloquentSpatial\Objects\Point;

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
      ->with('user')
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
    $report = new Report();

    $report->location = Geometry::toPoint($request->location);
    $report->description = $request->description;
    $report->is_important = $request->isImportant;
    $report->user_id = $request->user()->id;

    if ($request->hasFile('photos')) {
      $photos_paths = [];
      foreach ($request->file('photos') as $photo) {
        $path = $photo->store('images/reports');
        array_push($photos_paths, str_replace('images', 'storage', $path));
      }
      $report->image_paths =  $photos_paths;
    }

    $report->save();

    return;
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
    return Inertia::render('Admin/Reports/Edit', ['report' => $report->load('user')]);
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