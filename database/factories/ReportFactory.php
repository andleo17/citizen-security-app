<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'description' => $this->faker->text(),
      'location' => new Point($this->faker->latitude(-6.74805, -6.772256), $this->faker->longitude(-79.8676079, -79.8322459)),
      'user_id' => 1,
      'emergency' => $this->faker->boolean(30),
      'state' => $this->faker->boolean(100),
    ];
  }
}
