<?php

namespace App\Filament\Resources\ProfileResource\Pages;

use App\Filament\Resources\ProfileResource;
use App\Models\ProfileSection;
use Filament\Resources\Pages\CreateRecord;

class CreateProfile extends CreateRecord
{
    protected static string $resource = ProfileResource::class;

    protected function afterCreate(): void
    {
        /** @var \App\Models\Profile $profile */
        $profile = $this->record;

        // If no sections were added during creation, populate with defaults
        if ($profile->sections()->count() === 0) {
            foreach (ProfileSection::DEFAULT_SECTIONS as $key => $sortOrder) {
                ProfileSection::create([
                    'profile_id'  => $profile->id,
                    'section_key' => $key,
                    'is_enabled'  => true,
                    'sort_order'  => $sortOrder,
                ]);
            }
        }
    }
}
