<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportCategoryRequest;
use App\Http\Requests\UpdateReportCategoryRequest;
use App\Models\ReportCategory;
use App\Models\ReportSubCategory;
use Inertia\Inertia;
use Inertia\Response;

class ReportCategoryController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('Admin/Categories/Index', [
      'categories' => ReportCategory::all()
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Admin/Categories/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreReportCategoryRequest $request)
  {
    $category = new ReportCategory();
    $category->name = $request->name;
    $category->description = $request->description;

    $category->save();

    return redirect()->route('admin.categories.edit', $category);
  }

  /**
   * Display the specified resource.
   */
  public function show(ReportCategory $category)
  {
    //
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
   */
  public function update(UpdateReportCategoryRequest $request, ReportCategory $category)
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

    return redirect()->route('admin.categories.index');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ReportCategory $category)
  {
    $category->delete();
    return redirect()->route('admin.categories.index');
  }
}
