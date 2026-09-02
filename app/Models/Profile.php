<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profile extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'title',
        'tagline',
        'about',
        'location',
        'email',
        'phone',
        'avatar',
        'resume_path',
        'resume_label',
        'meta_title',
        'meta_description',
        'og_image',
        'is_default',
        'is_active',
    ];

    protected $casts = [
        'is_default' => 'boolean',
        'is_active'  => 'boolean',
    ];

    // -------------------------------------------------------------------------
    // Relationships
    // -------------------------------------------------------------------------

    public function sections(): HasMany
    {
        return $this->hasMany(ProfileSection::class)
            ->orderBy('sort_order');
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'profile_project')
            ->withPivot(['sort_order', 'is_featured'])
            ->withTimestamps()
            ->orderByPivot('sort_order');
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'profile_skill')
            ->withPivot(['sort_order', 'is_featured'])
            ->withTimestamps()
            ->orderByPivot('sort_order');
    }

    public function experiences(): BelongsToMany
    {
        return $this->belongsToMany(Experience::class, 'profile_experience')
            ->withPivot(['sort_order'])
            ->withTimestamps()
            ->orderByPivot('sort_order');
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    /**
     * Get sections as a key => is_enabled map for easy frontend consumption.
     */
    public function getSectionsMapAttribute(): array
    {
        return $this->sections
            ->sortBy('sort_order')
            ->mapWithKeys(fn ($s) => [$s->section_key => $s->is_enabled])
            ->toArray();
    }

    /**
     * Get featured projects (ordered by sort_order).
     */
    public function featuredProjects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'profile_project')
            ->withPivot(['sort_order', 'is_featured'])
            ->withTimestamps()
            ->wherePivot('is_featured', true)
            ->orderByPivot('sort_order');
    }

    /**
     * Get featured skills.
     */
    public function featuredSkills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'profile_skill')
            ->withPivot(['sort_order', 'is_featured'])
            ->withTimestamps()
            ->wherePivot('is_featured', true)
            ->orderByPivot('sort_order');
    }

    // -------------------------------------------------------------------------
    // Scopes
    // -------------------------------------------------------------------------

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeDefault($query)
    {
        return $query->where('is_default', true);
    }
}
