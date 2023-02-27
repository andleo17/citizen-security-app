<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return Inertia::render('Admin/Users/Index', ['users' => User::all()]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return Inertia::render('Admin/Users/Create');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \App\Http\Requests\StoreUserRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(StoreUserRequest $request)
  {
    $user = new User();

    $user->dni = $request->dni;
    $user->name = $request->name;
    $user->lastname = $request->lastname;
    $user->email = $request->email;
    $user->state = $request->state;
    $user->role = $request->role;
    $user->password = Hash::make($request->password);

    $user->save();

    return redirect()->route('admin.users.index');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function show(User $user)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function edit(User $user)
  {
    return Inertia::render('Admin/Users/Edit', ['user' => $user]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \App\Http\Requests\UpdateUserRequest  $request
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function update(UpdateUserRequest $request, User $user)
  {
    $user->dni = $request->dni;
    $user->name = $request->name;
    $user->lastname = $request->lastname;
    $user->email = $request->email;
    $user->role = $request->role;
    $user->state = $request->state;

    if ($request->password) $user->password = Hash::make($request->password);

    $user->save();

    return redirect()->route('admin.users.index');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function destroy(User $user)
  {
    $user->delete();
    return redirect()->route('admin.users.index');
  }
}
