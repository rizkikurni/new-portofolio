<?php

namespace Database\Factories;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Experience>
 */
class ExperienceFactory extends Factory
{
    protected $model = Experience::class;

    public function definition(): array
    {
        $isCurrent = fake()->boolean(30);

        return [
            'company'     => fake()->company(),
            'position'    => fake()->jobTitle(),
            'description' => fake()->paragraph(),
            'start_date'  => fake()->date(),
            'end_date'    => $isCurrent ? null : fake()->date(),
            'is_current'  => $isCurrent,
            'company_url' => 'https://example.com',
        ];
    }
}
