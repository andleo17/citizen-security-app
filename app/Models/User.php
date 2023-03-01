<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/** @typescript **/
class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'dni',
    'name',
    'lastname',
    'email',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  protected $appends = [
    'fullname'
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  protected function fullname(): Attribute
  {
    return Attribute::make(
      get: fn ($value, $attributes) => "{$attributes['name']} {$attributes['lastname']}"
    );
  }

  protected function reports()
  {
    return $this->hasMany(Report::class);
  }

  public function hasRole(string $role): bool
  {
    return $this->role === $role;
  }

  public function isAdmin(): bool
  {
    return $this->hasRole(UserRole::Admin->value);
  }
}
