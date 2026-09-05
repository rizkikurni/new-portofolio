<?php

namespace App\Models;

use App\Models\Pivots\ProfileProject;
use App\Models\Pivots\ProjectSkill;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug',
        'title',
        'short_description',
        'description',
        'role',
        'challenge',
        'solution',
        'impact',
        'thumbnail',
        'github_url',
        'demo_url',
        'start_date',
        'end_date',
        'status',
        'is_active',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];

    // -------------------------------------------------------------------------
    // Relationships
    // -------------------------------------------------------------------------

    public function profiles(): BelongsToMany
    {
        return $this->belongsToMany(Profile::class, 'profile_project')
            ->using(ProfileProject::class)
            ->withPivot(['sort_order', 'is_featured'])
            ->withTimestamps();
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'project_skill')
            ->using(ProjectSkill::class)
            ->withPivot(['sort_order'])
            ->withTimestamps()
            ->orderByPivot('sort_order');
    }

    public function media(): HasMany
    {
        return $this->hasMany(ProjectMedia::class)
            ->orderBy('sort_order');
    }

    // -------------------------------------------------------------------------
    // Scopes
    // -------------------------------------------------------------------------

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }
}
