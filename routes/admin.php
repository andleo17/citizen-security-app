<?php

use App\Http\Controllers\Admin;
use Illuminate\Support\Facades\Route;

Route::get('', Admin\DashboardController::class)->name('admin.dashboard');

Route::resource('reports', Admin\ReportController::class)->names('admin.reports');
Route::resource('categories', Admin\ReportCategoryController::class)->names('admin.categories');
Route::resource('users', Admin\UserController::class)->names('admin.users');
Route::resource('cars', Admin\CarController::class)->names('admin.cars');
Route::resource('zones', Admin\ZoneController::class)->names('admin.zones');
Route::resource('patrols', Admin\PatrolController::class)->names('admin.patrols');
Route::post('patrols/filter', [Admin\PatrolController::class, 'getPatrolsByDate'])->name('patrols.filter');
Route::resource('routes', Admin\RouteController::class)->names('admin.routes');

Route::get('map', [Admin\MapController::class, 'index'])->name('admin.map');
