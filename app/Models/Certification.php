<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Certification extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'issuer',
        'issue_date',
        'expiration_date',
        'credential_id',
        'credential_url',
        'image',
    ];

    protected $casts = [
        'issue_date'      => 'date',
        'expiration_date' => 'date',
    ];

    public function isExpired(): bool
    {
        return $this->expiration_date && $this->expiration_date->isPast();
    }

    public function isValid(): bool
    {
        return ! $this->isExpired();
    }
}
