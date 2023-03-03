<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patrol;
use App\Http\Requests\StorePatrolRequest;
use App\Http\Requests\UpdatePatrolRequest;

class PatrolController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StorePatrolRequest $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Patrol $patrol)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Patrol $patrol)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdatePatrolRequest $request, Patrol $patrol)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Patrol $patrol)
  {
    //
  }
}
