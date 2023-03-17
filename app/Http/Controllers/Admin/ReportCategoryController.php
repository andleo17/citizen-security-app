<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreReportCategoryRequest;
use App\Http\Requests\Admin\UpdateReportCategoryRequest;
use App\Models\ReportCategory;
use App\Models\ReportSubCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ReportCategoryController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Inertia\Response
   */
  public function index(): Response
  {
    return Inertia::render('Admin/Categories/Index', [
      'categories' => ReportCategory::paginate(10)
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Inertia\Response
   */
  public function create(): Response
  {
    return Inertia::render('Admin/Categories/Create');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param \App\Http\Requests\Admin\StoreReportCategoryRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function store(StoreReportCategoryRequest $request): RedirectResponse
  {
    $category = new ReportCategory();
    $category->name = $request->name;
    $category->description = $request->description;

    $category->save();

    return Redirect::route('admin.categories.edit', $category);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\ReportCategory $category
   * @return \Illuminate\Http\Response
   */
  public function edit(ReportCategory $category): Response
  {
    return Inertia::render('Admin/Categories/Edit', [
      'category' => $category->load('subCategories')
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param \App\Http\Requests\Admin\UpdateReportCategoryRequest $request
   * @param \App\Models\ReportCategory $category
   * @return \Illuminate\Http\RedirectResponse
   */
  public function update(UpdateReportCategoryRequest $request, ReportCategory $category): RedirectResponse
  {
    $category->name = $request->name;
    $category->description = $request->description;

    $subCategories = $category->subCategories()->get();
    foreach ($subCategories as $value) {
      if (!in_array($value->id, $request->subCategories)) {
        $value->delete();
      }
    }

    foreach ($request->subCategories as $value) {
      $subcategory = ReportSubCategory::find($value['id']);
      if (!$subcategory) $subcategory = new ReportSubCategory();

      $subcategory->name = $value['name'];
      $subcategory->description = $value['description'];
      $subcategory->report_category_id = $category->id;

      $subcategory->save();
    }

    $category->save();

    return Redirect::route('admin.categories.index');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param \App\Models\ReportCategory $category
   * @return \Illuminate\Http\RedirectResponse
   */
  public function destroy(ReportCategory $category): RedirectResponse
  {
    $category->delete();
    return Redirect::route('admin.categories.index');
  }
}
