<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private const RECRUITER_FIRST_ORDER = [
        'hero' => 0,
        'projects' => 1,
        'experience' => 2,
        'skills' => 3,
        'about' => 4,
        'education' => 5,
        'certifications' => 6,
        'contact' => 7,
    ];

    private const ORIGINAL_ORDER = [
        'hero' => 0,
        'about' => 1,
        'skills' => 2,
        'projects' => 3,
        'experience' => 4,
        'education' => 5,
        'certifications' => 6,
        'contact' => 7,
    ];

    public function up(): void
    {
        $this->applyOrder(self::RECRUITER_FIRST_ORDER);
    }

    public function down(): void
    {
        $this->applyOrder(self::ORIGINAL_ORDER);
    }

    private function applyOrder(array $sections): void
    {
        foreach ($sections as $key => $order) {
            DB::table('profile_sections')
                ->where('section_key', $key)
                ->update(['sort_order' => $order]);
        }
    }
};
