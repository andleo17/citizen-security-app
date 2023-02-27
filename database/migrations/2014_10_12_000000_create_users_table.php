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
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('dni')->unique();
      $table->string('name');
      $table->string('lastname');
      $table->string('email')->unique();
      $table->string('phone')->unique()->nullable();
      $table->timestamp('email_verified_at')->nullable();
      $table->boolean('has_criminal_record')->default(false);
      $table->string('password');
      $table->enum('role', ['Citizen', 'Police', 'Admin'])->default('Citizen');
      $table->softDeletes();
      $table->rememberToken();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('users');
  }
};
