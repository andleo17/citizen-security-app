<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use MatanYadaev\EloquentSpatial\Objects\LineString;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;

class Route extends Model
{
  use HasFactory;
  use HasSpatial;

  protected $casts = [
    'path' => LineString::class,
  ];

  public function zone(): BelongsTo
  {
    return $this->belongsTo(Zone::class);
  }

  public function patrols(): HasMany
  {
    return $this->hasMany(Patrol::class);
  }
}
