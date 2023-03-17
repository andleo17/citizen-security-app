<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Inertia\Response
   */
  public function index(): Response
  {
    return Inertia::render('Admin/Users/Index', [
      'users' => User::paginate(10),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Inertia\Response
   */
  public function create(): Response
  {
    return Inertia::render('Admin/Users/Create');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param \App\Http\Requests\Admin\StoreUserRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function store(StoreUserRequest $request): RedirectResponse
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

    return Redirect::route('admin.users.index');
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param \App\Models\User $user
   * @return \Inertia\Response
   */
  public function edit(User $user): Response
  {
    return Inertia::render('Admin/Users/Edit', [
      'user' => $user
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param \App\Http\Requests\Admin\UpdateUserRequest $request
   * @param \App\Models\User $user
   * @return \Illuminate\Http\RedirectResponse
   */
  public function update(UpdateUserRequest $request, User $user): RedirectResponse
  {
    $user->dni = $request->dni;
    $user->name = $request->name;
    $user->lastname = $request->lastname;
    $user->email = $request->email;
    $user->role = $request->role;

    if ($request->password) $user->password = Hash::make($request->password);

    $user->save();

    return Redirect::route('admin.users.index');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param \App\Models\User $user
   * @return \Illuminate\Http\RedirectResponse
   */
  public function destroy(User $user): RedirectResponse
  {
    $user->delete();
    return Redirect::route('admin.users.index');
  }
}
