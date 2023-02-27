<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('reports', function (Blueprint $table) {
      $table->id();
      $table->text('description');
      $table->point('location');
      $table->json('images')->nullable();
      $table->boolean('emergency')->default(false);
      $table->boolean('state')->default(false);
      $table->timestamps();
      $table->foreignId('user_id')->constrained();
      $table->foreignId('report_sub_category_id')->nullable()->constrained();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('reports');
  }
};
