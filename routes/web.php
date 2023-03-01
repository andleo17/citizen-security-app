<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Models\Report;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
  Route::get('/', fn () => Inertia::render('Main'))->name('index');
  Route::get('/reports', fn () => Inertia::render('Reports/Index', [
    'reports' => auth()->user()->reports->load('reportSubCategory')->sortBy([['state', 'asc'], ['created_at', 'desc'],])->values()
  ]))->name('reports.index');
  Route::post('/reports', [ReportController::class, 'store'])->name('reports.store');
  Route::post('/reports/attend/{report}', [ReportController::class, 'attend'])->name('reports.attend');
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'access:Police'])->group(function () {
  Route::get('watch', fn () => Inertia::render('Watch', ['reports' => Report::where('state', 'false')->with('user')->get()]))->name('watch');

  Route::get('driver', [DriverController::class, 'index'])->name('driver.location');
  Route::get('driver/truck', [DriverController::class, 'edit'])->name('driver.truck.edit');
  Route::put('driver/truck/{truck}', [DriverController::class, 'update'])->name('driver.truck.update');
  Route::delete('driver/truck/{truck}', [DriverController::class, 'destroy'])->name('driver.truck.destroy');
  Route::put('driver/truck/{truck}/location', [DriverController::class, 'updatePosition'])->name('driver.truck.location');
});

require __DIR__ . '/auth.php';
