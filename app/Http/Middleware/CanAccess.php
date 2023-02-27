<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Auth\Access\Response;
use Illuminate\Http\Request;

class CanAccess
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
   * @param  string $role
   * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
   */
  public function handle(Request $request, Closure $next, string $role)
  {
    if (!$request->user()->isAdmin() && !$request->user()->hasRole($role))
      return redirect()->route('index');

    return $next($request);
  }
}
