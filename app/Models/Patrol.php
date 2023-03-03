<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use MatanYadaev\EloquentSpatial\Objects\LineString;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;

class Patrol extends Model
{
  use HasFactory;
  use HasSpatial;

  protected $casts = [
    'location' => Point::class,
    'route' => LineString::class,
    'start_at' => 'datetime',
    'end_at' => 'datetime',
    'started_at' => 'timestamp',
    'finished_at' => 'timestamp',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function car(): BelongsTo
  {
    return $this->belongsTo(Car::class);
  }

  public function zone(): BelongsTo
  {
    return $this->belongsTo(Zone::class);
  }
}
