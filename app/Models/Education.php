<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $table = 'educations';

    protected $fillable = [
        'institution',
        'degree',
        'field',
        'description',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date'   => 'date',
    ];

    public function getDateRangeAttribute(): string
    {
        $start = $this->start_date?->format('Y') ?? '';
        $end   = $this->end_date?->format('Y') ?? 'Present';

        return "{$start} – {$end}";
    }
}
