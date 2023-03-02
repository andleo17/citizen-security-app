<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ReportCategoryController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Admin/Dashboard');
})->name('admin.dashboard');

Route::resource('reports', ReportController::class)->names('admin.reports');
Route::resource('categories', ReportCategoryController::class)->names('admin.categories');
Route::resource('users', UserController::class)->names('admin.users');
Route::resource('cars', CarController::class)->names('admin.cars');
