<?php

use App\Http\Controllers\DriverController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Models\Car;
use App\Models\Report;
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
  Route::get('watch', fn () => Inertia::render('Watch', [
    'reports' => Report::where('state', 'false')->with('user')->get(),
    'cars' => Car::has('user')->get()
  ]))->name('watch');

  Route::get('driver', [DriverController::class, 'index'])->name('driver.location');
  Route::get('driver/car', [DriverController::class, 'edit'])->name('driver.car.edit');
  Route::put('driver/car/{car}', [DriverController::class, 'update'])->name('driver.car.update');
  Route::delete('driver/car/{car}', [DriverController::class, 'destroy'])->name('driver.car.destroy');
  Route::put('driver/car/{car}/location', [DriverController::class, 'updatePosition'])->name('driver.car.location');
});

require __DIR__ . '/auth.php';
