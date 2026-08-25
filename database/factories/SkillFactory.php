<?php

namespace Database\Factories;

use App\Models\Skill;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Skill>
 */
class SkillFactory extends Factory
{
    protected $model = Skill::class;

    public function definition(): array
    {
        return [
            'name'        => fake()->unique()->word() . ' ' . fake()->unique()->numberBetween(1, 999),
            'category'    => fake()->randomElement(['Frontend', 'Backend', 'Database', 'Programming', 'DevOps', 'Tools']),
            'icon'        => null,
            'description' => fake()->sentence(),
        ];
    }
}
