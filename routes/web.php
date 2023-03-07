<?php

use App\Http\Controllers\PatrolScheduleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserReportController;
use App\Http\Controllers\WatchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
  Route::get('/', fn () => Inertia::render('Main'))->name('index');

  Route::get('/reports', [UserReportController::class, 'index'])->name('reports.index');
  Route::post('/reports', [UserReportController::class, 'store'])->name('reports.store');
  Route::post('/reports/attend/{report}', [UserReportController::class, 'attend'])->name('reports.attend');

  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'access:Police'])->group(function () {
  Route::get('watch', WatchController::class)->name('watch');

  Route::get('patrol', [PatrolScheduleController::class, 'index'])->name('patrol.index');
  Route::post('patrol', [PatrolScheduleController::class, 'start'])->name('patrol.start');
  Route::put('patrol', [PatrolScheduleController::class, 'updatePosition'])->name('patrol.location');
  Route::delete('patrol', [PatrolScheduleController::class, 'finish'])->name('patrol.finish');
  Route::get('patrol/schedules', [PatrolScheduleController::class, 'schedules'])->name('patrol.schedules');
});

require __DIR__ . '/auth.php';
