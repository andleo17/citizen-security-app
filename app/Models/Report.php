<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;

/** @typescript **/
class Report extends Model
{
  use HasFactory;
  use HasSpatial;

  protected $casts = [
    'emergency' => 'boolean',
    'state' => 'boolean',
    'images' => 'array',
    'location' => Point::class,
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function reportSubCategory(): BelongsTo
  {
    return $this->belongsTo(ReportSubCategory::class);
  }
}
