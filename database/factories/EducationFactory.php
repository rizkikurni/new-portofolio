<?php

namespace Database\Factories;

use App\Models\Education;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Education>
 */
class EducationFactory extends Factory
{
    protected $model = Education::class;

    public function definition(): array
    {
        return [
            'institution' => fake()->company() . ' University',
            'degree'      => 'Bachelor of Science',
            'field'       => 'Computer Science',
            'description' => fake()->sentence(),
            'start_date'  => fake()->date(),
            'end_date'    => fake()->date(),
        ];
    }
}
