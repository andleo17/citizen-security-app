<?php

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use MatanYadaev\EloquentSpatial\Objects\LineString;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;

/**
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder query()
 */
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

  protected $appends = ['started', 'finished', 'is_current'];

  protected function started(): Attribute
  {
    return Attribute::make(
      get: fn ($value, $attributes) => !is_null($attributes['started_at'])
    );
  }

  protected function finished(): Attribute
  {
    return Attribute::make(
      get: fn ($value, $attributes) => !is_null($attributes['finished_at'])
    );
  }

  protected function isCurrent(): Attribute
  {
    return Attribute::make(
      get: fn () => $this->started && !$this->finished
    );
  }

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

  public static function getByDate(DateTime $date)
  {
    return Patrol::whereDate('start_at', $date)
      ->orWhereDate('end_at', $date)
      ->with('user', 'zone', 'car')
      ->orderBy('start_at')
      ->get()
      ->sortByDesc('isCurrent')
      ->values();
  }
}
