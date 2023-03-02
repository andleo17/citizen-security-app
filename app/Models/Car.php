<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use MatanYadaev\EloquentSpatial\Objects\Point;

class Car extends Model
{
  use HasFactory;

  protected $casts = [
    'location' => Point::class,
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }
}
