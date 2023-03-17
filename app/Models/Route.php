<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Route extends Model
{
  use HasFactory;

  public function zone(): BelongsTo
  {
    return $this->belongsTo(Zone::class);
  }

  public function patrols(): HasMany
  {
    return $this->hasMany(Patrol::class);
  }
}
