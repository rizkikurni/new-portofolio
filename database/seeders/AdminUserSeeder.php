<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@portfolio.test'],
            [
                'name'              => 'Portfolio Admin',
                'email'             => 'admin@portfolio.test',
                'password'          => 'password',
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('Admin user created: admin@portfolio.test / password');
    }
}

