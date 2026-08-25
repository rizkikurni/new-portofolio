<?php

namespace Database\Factories;

use App\Models\Certification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Certification>
 */
class CertificationFactory extends Factory
{
    protected $model = Certification::class;

    public function definition(): array
    {
        return [
            'name'           => fake()->word() . ' Certification',
            'issuer'         => fake()->company(),
            'issue_date'     => fake()->date(),
            'expiration_date'=> fake()->optional()->date(),
            'credential_id'  => fake()->uuid(),
            'credential_url' => 'https://example.com/cert',
            'image'          => null,
        ];
    }
}
