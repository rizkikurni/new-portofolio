<?php

namespace App\Providers;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\ProfileSection;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use App\Services\PortfolioDataService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $models = [
            Profile::class,
            ProfileSection::class,
            Project::class,
            Skill::class,
            Experience::class,
            Education::class,
            Certification::class,
            SocialLink::class,
        ];

        foreach ($models as $model) {
            $model::saved(fn () => app(PortfolioDataService::class)->invalidate());
            $model::deleted(fn () => app(PortfolioDataService::class)->invalidate());
        }
    }
}
