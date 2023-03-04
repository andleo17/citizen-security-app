<?php

namespace App\Http\Controllers;

use App\Events\NewReport;
use App\Http\Requests\StoreReportRequest;
use App\Models\Report;
use App\Utils\Geometry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserReportController extends Controller
{
  public function index()
  {
    $reports = Auth::user()->reports
      ->load('reportSubCategory')
      ->sortBy([['state', 'asc'], ['created_at', 'desc'],])
      ->values();

    return Inertia::render('Reports/Index', [
      'reports' => $reports
    ]);
  }

  public function store(StoreReportRequest $request)
  {
    $report = new Report();

    $report->location = Geometry::toPoint($request->location);
    $report->description = $request->description;
    $report->emergency = $request->emergency;
    $report->user_id = $request->user()->id;

    if ($request->hasFile('photos')) {
      $photos_paths = [];
      foreach ($request->file('photos') as $photo) {
        $path = $photo->store('images/reports');
        array_push($photos_paths, str_replace('images', 'storage', $path));
      }
      $report->images =  $photos_paths;
    }

    $report->save();

    event(new NewReport($report->load('user')));

    return redirect()->route('reports.index');
  }

  public function attend(Report $report)
  {
    $report->state = true;
    $report->save();

    return;
  }
}
