<?php

namespace Database\Factories;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Profile>
 */
class ProfileFactory extends Factory
{
    protected $model = Profile::class;

    public function definition(): array
    {
        $name = fake()->jobTitle();

        return [
            'slug'             => Str::slug($name) . '-' . fake()->unique()->numberBetween(100, 999),
            'name'             => $name,
            'title'            => $name,
            'tagline'          => fake()->sentence(),
            'about'            => fake()->paragraphs(2, true),
            'location'         => fake()->city() . ', ' . fake()->country(),
            'email'            => fake()->safeEmail(),
            'phone'            => fake()->phoneNumber(),
            'avatar'           => null,
            'meta_title'       => $name . ' Portfolio',
            'meta_description' => fake()->sentence(),
            'og_image'         => null,
            'is_default'       => false,
            'is_active'        => true,
        ];
    }
}
