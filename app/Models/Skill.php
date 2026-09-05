<?php

namespace App\Models;

use App\Models\Pivots\ProfileSkill;
use App\Models\Pivots\ProjectSkill;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Skill extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'category',
        'icon',
        'description',
    ];

    // -------------------------------------------------------------------------
    // Relationships
    // -------------------------------------------------------------------------

    public function profiles(): BelongsToMany
    {
        return $this->belongsToMany(Profile::class, 'profile_skill')
            ->using(ProfileSkill::class)
            ->withPivot(['sort_order', 'is_featured'])
            ->withTimestamps();
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_skill')
            ->using(ProjectSkill::class)
            ->withPivot(['sort_order'])
            ->withTimestamps()
            ->orderByPivot('sort_order');
    }

    // -------------------------------------------------------------------------
    // Scopes
    // -------------------------------------------------------------------------

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }
}
