<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Admin/Dashboard');
})->name('admin.dashboard');

Route::resource('reports', ZoneController::class)->names('admin.reports');
Route::resource('categories', TruckController::class)->names('admin.categories');
Route::resource('users', UserController::class)->names('admin.users');
