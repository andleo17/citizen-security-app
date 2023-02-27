<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
  use HasFactory;

  protected function user()
  {
    return $this->belongsTo(User::class);
  }

  protected function subCategory()
  {
    return $this->belongsTo(ReportSubCategory::class);
  }
}
