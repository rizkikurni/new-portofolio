<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfileSection extends Model
{
    protected $fillable = [
        'profile_id',
        'section_key',
        'is_enabled',
        'sort_order',
    ];

    protected $casts = [
        'is_enabled'  => 'boolean',
        'sort_order'  => 'integer',
    ];

    // Default section keys with their default sort order
    public const DEFAULT_SECTIONS = [
        'hero'         => 0,
        'projects'     => 1,
        'experience'   => 2,
        'skills'       => 3,
        'about'        => 4,
        'education'    => 5,
        'certifications' => 6,
        'contact'      => 7,
    ];

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
