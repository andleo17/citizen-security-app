<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use MatanYadaev\EloquentSpatial\Objects\Polygon;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;

class Zone extends Model
{
  use HasFactory;
  use HasSpatial;

  protected $casts = [
    'area' => Polygon::class,
  ];

  public function patrols(): HasMany
  {
    return $this->hasMany(Patrol::class);
  }
}
