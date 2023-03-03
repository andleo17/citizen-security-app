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
    Schema::create('patrols', function (Blueprint $table) {
      $table->id();
      $table->integer('rounds')->default(0);
      $table->float('distance')->default(0);
      $table->dateTime('start_at');
      $table->dateTime('end_at');
      $table->lineString('route')->nullable();
      $table->point('location')->nullable();
      $table->timestamp('started_at')->nullable();
      $table->timestamp('finished_at')->nullable();
      $table->foreignId('user_id')->constrained();
      $table->foreignId('car_id')->constrained();
      $table->foreignId('zone_id')->constrained();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('patrols');
  }
};
