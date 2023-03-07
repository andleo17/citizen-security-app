<?php

namespace App\Http\Controllers;

use App\Events\NewReport;
use App\Http\Requests\StoreReportRequest;
use App\Models\Report;
use App\Utils\Geometry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserReportController extends Controller
{
  public function index(): Response
  {
    $reports = Auth::user()->reports
      ->load('reportSubCategory')
      ->sortBy([['state', 'asc'], ['created_at', 'desc'],])
      ->values();

    return Inertia::render('Reports/Index', [
      'reports' => $reports
    ]);
  }

  public function store(StoreReportRequest $request): RedirectResponse
  {
    $report = new Report();

    $report->location = Geometry::toPoint(json_encode($request->location));
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

    return Redirect::route('reports.index');
  }

  public function attend(Report $report): void
  {
    $report->state = true;
    $report->save();

    return;
  }
}
