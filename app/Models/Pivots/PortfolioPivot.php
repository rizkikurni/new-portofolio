<?php

namespace App\Models\Pivots;

use App\Services\PortfolioDataService;
use Illuminate\Database\Eloquent\Relations\Pivot;

abstract class PortfolioPivot extends Pivot
{
    public $incrementing = true;

    public $timestamps = true;

    protected static function booted(): void
    {
        static::saved(fn () => app(PortfolioDataService::class)->invalidate());
        static::deleted(fn () => app(PortfolioDataService::class)->invalidate());
    }
}
