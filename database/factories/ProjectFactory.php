<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        $title = fake()->words(3, true);

        return [
            'slug'              => Str::slug($title) . '-' . fake()->unique()->numberBetween(100, 999),
            'title'             => ucfirst($title),
            'short_description' => fake()->sentence(),
            'description'       => fake()->paragraphs(3, true),
            'thumbnail'         => null,
            'github_url'        => 'https://github.com/example/' . Str::slug($title),
            'demo_url'          => 'https://demo.example.com/' . Str::slug($title),
            'start_date'        => fake()->date(),
            'end_date'          => fake()->optional()->date(),
            'status'            => fake()->randomElement(['completed', 'ongoing', 'archived']),
            'is_active'         => true,
        ];
    }
}
