<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\ReportCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MapController extends Controller
{
  public function index(): Response
  {
    $reports = Report::with('reportSubCategory:id,report_category_id')
      ->get([
        'id',
        'location',
        'report_sub_category_id',
      ]);


    $categories = ReportCategory::with('subCategories')->get();

    return Inertia::render('Admin/HeatMap', [
      'reports' => $reports,
      'categories' => $categories,
    ]);
  }
}
