<?php

use App\Http\Controllers\DriverController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserReportController;
use App\Models\Car;
use App\Models\Report;
use App\Models\Zone;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
  Route::get('/', fn () => Inertia::render('Main'))->name('index');

  Route::get('/reports', [UserReportController::class, 'index'])->name('reports.index');
  Route::post('/reports', [UserReportController::class, 'store'])->name('reports.store');
  Route::post('/reports/attend/{report}', [UserReportController::class, 'attend'])->name('reports.attend');

  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'access:Police'])->group(function () {
  Route::get('watch', fn () => Inertia::render('Watch', [
    'reports' => Report::where('state', 'false')->with('user')->get(),
    'zones' => Zone::all(),
  ]))->name('watch');

  Route::get('driver', [DriverController::class, 'index'])->name('driver.location');
  Route::get('driver/car', [DriverController::class, 'edit'])->name('driver.car.edit');
  Route::put('driver/car/{car}', [DriverController::class, 'update'])->name('driver.car.update');
  Route::delete('driver/car/{car}', [DriverController::class, 'destroy'])->name('driver.car.destroy');
  Route::put('driver/car/{car}/location', [DriverController::class, 'updatePosition'])->name('driver.car.location');
});

require __DIR__ . '/auth.php';
