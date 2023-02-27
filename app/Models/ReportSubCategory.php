<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportSubCategory extends Model
{
  use HasFactory;

  protected function category()
  {
    return $this->belongsTo(ReportCategory::class);
  }

  protected function reports()
  {
    return $this->hasMany(Report::class);
  }
}
