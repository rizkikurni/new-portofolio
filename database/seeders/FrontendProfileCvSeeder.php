<?php

namespace Database\Seeders;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FrontendProfileCvSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function (): void {
            $profile = Profile::query()
                ->whereIn('slug', ['frontend', 'rizki-kurniawan'])
                ->first() ?? Profile::query()->where('is_default', true)->firstOrFail();

            $profileData = [
                'slug' => 'rizki-kurniawan',
                'name' => 'Muhammad Rizki Kurniawan',
                'title' => 'Full-Stack Web Developer',
                'tagline' => 'Building end-to-end web applications, from robust Laravel APIs and databases to responsive React and Next.js interfaces.',
                'about' => '<p>Full-Stack Web Developer with hands-on experience building end-to-end web applications using Laravel, PHP, React, Next.js, TypeScript, JavaScript, MySQL, and PostgreSQL. Experienced in developing REST APIs, authentication, authorization, business logic, database relationships, and payment gateway integrations.</p><p>On the frontend, I build reusable components and responsive interfaces with React, Next.js, Tailwind CSS, and Bootstrap. I use Git/GitHub and AI-assisted workflows to support planning, development, debugging, and documentation.</p>',
                'location' => 'Jepara, Jawa Tengah',
                'email' => 'murizki3108@gmail.com',
                'phone' => '0851-5601-1560',
                'resume_label' => 'Download CV',
                'meta_title' => 'Muhammad Rizki Kurniawan - Full-Stack Web Developer',
                'meta_description' => 'Full-Stack Web Developer in Jepara experienced with Laravel, React, Next.js, TypeScript, REST APIs, MySQL, and PostgreSQL.',
                'is_default' => true,
                'is_active' => true,
            ];

            $resumePath = 'resumes/01M1F5E37C7VST9VJBVG845F0R.pdf';
            if (Storage::disk('public')->exists($resumePath)) {
                $profileData['resume_path'] = $resumePath;
            }

            $profile->update($profileData);

            $experiences = [
                [
                    'company' => 'Freelance',
                    'position' => 'Full-Stack Web Developer',
                    'description' => "Developed and maintained web applications using Laravel, PHP, JavaScript, and MySQL based on user requirements.\n- Built REST APIs, authentication, authorization, transaction flows, business logic, and database relationships\n- Handled debugging, maintenance, feature development, and version control with Git/GitHub",
                    'start_date' => '2024-04-01',
                    'end_date' => '2026-01-31',
                    'is_current' => false,
                    'company_url' => null,
                ],
                [
                    'company' => 'PT Campus Digital Indonesia',
                    'position' => 'Frontend Web Developer Intern',
                    'description' => "Developed the frontend of a CRM application using Next.js and integrated REST APIs from the backend team.\n- Built reusable components and responsive user interfaces\n- Collaborated on feature implementation and debugging",
                    'start_date' => '2025-01-01',
                    'end_date' => '2025-04-30',
                    'is_current' => false,
                    'company_url' => null,
                ],
            ];

            $experiencePivot = [];
            foreach ($experiences as $sortOrder => $experienceData) {
                $experience = Experience::withTrashed()->firstOrNew([
                    'company' => $experienceData['company'],
                    'position' => $experienceData['position'],
                ]);
                $experience->fill($experienceData);
                $experience->deleted_at = null;
                $experience->save();

                $experiencePivot[$experience->id] = ['sort_order' => $sortOrder];
            }
            $profile->experiences()->sync($experiencePivot);

            $skills = [
                ['name' => 'JavaScript', 'category' => 'Frontend', 'icon' => 'javascript', 'featured' => true],
                ['name' => 'TypeScript', 'category' => 'Frontend', 'icon' => 'typescript', 'featured' => true],
                ['name' => 'React', 'category' => 'Frontend', 'icon' => 'react', 'featured' => true],
                ['name' => 'Next.js', 'category' => 'Frontend', 'icon' => 'nextjs', 'featured' => true],
                ['name' => 'Vue.js', 'category' => 'Frontend', 'icon' => 'vuejs', 'featured' => false],
                ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'icon' => 'tailwind', 'featured' => true],
                ['name' => 'Bootstrap', 'category' => 'Frontend', 'icon' => 'bootstrap', 'featured' => false],
                ['name' => 'PHP', 'category' => 'Backend', 'icon' => 'php', 'featured' => false],
                ['name' => 'Laravel', 'category' => 'Backend', 'icon' => 'laravel', 'featured' => false],
                ['name' => 'Node.js', 'category' => 'Backend', 'icon' => 'nodejs', 'featured' => false],
                ['name' => 'REST API', 'category' => 'Backend', 'icon' => 'api', 'featured' => true],
                ['name' => 'MySQL', 'category' => 'Database', 'icon' => 'mysql', 'featured' => false],
                ['name' => 'PostgreSQL', 'category' => 'Database', 'icon' => 'postgresql', 'featured' => false],
                ['name' => 'Git', 'category' => 'Tools', 'icon' => 'git', 'featured' => false],
                ['name' => 'GitHub', 'category' => 'Tools', 'icon' => 'github', 'featured' => false],
                ['name' => 'Composer', 'category' => 'Tools', 'icon' => 'composer', 'featured' => false],
                ['name' => 'NPM', 'category' => 'Tools', 'icon' => 'npm', 'featured' => false],
                ['name' => 'Midtrans Payment Gateway', 'category' => 'Tools', 'icon' => 'credit-card', 'featured' => false],
                ['name' => 'Hermes Agent', 'category' => 'AI-Assisted Development', 'icon' => 'bot', 'featured' => false],
                ['name' => 'AI Agent Setup & Configuration', 'category' => 'AI-Assisted Development', 'icon' => 'settings', 'featured' => false],
                ['name' => 'Custom Skills & Instructions', 'category' => 'AI-Assisted Development', 'icon' => 'sparkles', 'featured' => false],
            ];

            $createdSkills = [];
            $profileSkillPivot = [];
            foreach ($skills as $sortOrder => $skillData) {
                $skill = Skill::withTrashed()->firstOrNew(['name' => $skillData['name']]);
                $skill->fill([
                    'category' => $skillData['category'],
                    'icon' => $skillData['icon'],
                ]);
                $skill->deleted_at = null;
                $skill->save();

                $createdSkills[$skill->name] = $skill;
                $profileSkillPivot[$skill->id] = [
                    'sort_order' => $sortOrder,
                    'is_featured' => $skillData['featured'],
                ];
            }
            $profile->skills()->sync($profileSkillPivot);

            $projects = [
                [
                    'slug' => 'e-voting-subscription-platform',
                    'title' => 'Subscription-Based E-Voting Platform',
                    'short_description' => 'An e-voting platform for managing events, candidates, voters, ballots, results, subscriptions, and access.',
                    'description' => '<p>Developed an e-voting platform covering event, candidate, voter, voting, results, and dashboard management.</p><p>Integrated Midtrans Payment Gateway for subscription payments and controlled feature access based on transaction status.</p>',
                    'role' => 'Full-Stack Web Developer',
                    'impact' => 'Integrated subscription payments and transaction-based access control through Midtrans Payment Gateway.',
                    'status' => 'completed',
                    'is_active' => true,
                    'skills' => ['Laravel', 'MySQL', 'Midtrans Payment Gateway', 'Bootstrap'],
                ],
                [
                    'slug' => 'tamerin-personal-finance',
                    'title' => 'Tamerin - Personal Finance Management',
                    'short_description' => 'A personal finance application for tracking income, expenses, transactions, and financial summaries.',
                    'description' => '<p>Developed a personal finance management application with income and expense transactions and a dashboard that summarizes the user\'s financial activity.</p>',
                    'role' => 'Full-Stack Web Developer',
                    'impact' => 'Centralized income and expense tracking in a financial summary dashboard.',
                    'status' => 'completed',
                    'is_active' => true,
                    'skills' => ['Laravel', 'React', 'TypeScript', 'Tailwind CSS'],
                ],
                [
                    'slug' => 'crm-system',
                    'title' => 'CRM System',
                    'short_description' => 'A responsive CRM frontend built with Next.js and integrated with REST APIs from the backend team.',
                    'description' => '<p>Developed the frontend of a CRM application during the internship program using Next.js, reusable components, responsive interfaces, and REST API integration.</p>',
                    'role' => 'Frontend Web Developer Intern',
                    'impact' => 'Delivered reusable interface components and integrated CRM data through REST APIs.',
                    'status' => 'completed',
                    'is_active' => true,
                    'skills' => ['Next.js', 'REST API'],
                ],
            ];

            $projectPivot = [];
            foreach ($projects as $sortOrder => $projectData) {
                $projectSkills = $projectData['skills'];
                unset($projectData['skills']);

                $project = Project::withTrashed()->firstOrNew(['slug' => $projectData['slug']]);
                $project->fill($projectData);
                $project->deleted_at = null;
                $project->save();

                $projectSkillPivot = [];
                foreach ($projectSkills as $skillOrder => $skillName) {
                    $skill = $createdSkills[$skillName];
                    $projectSkillPivot[$skill->id] = ['sort_order' => $skillOrder];
                }
                $project->skills()->sync($projectSkillPivot);

                $projectPivot[$project->id] = [
                    'sort_order' => $sortOrder,
                    'is_featured' => $sortOrder < 2,
                ];
            }
            $profile->projects()->sync($projectPivot);

            Education::query()->where('institution', 'State University')->delete();
            Education::query()->updateOrCreate(
                ['institution' => 'Universitas PGRI Semarang', 'degree' => 'S1'],
                [
                    'field' => 'Informatika',
                    'description' => 'IPK 3.87 / 4.00',
                    'start_date' => '2022-01-01',
                    'end_date' => '2026-12-31',
                ],
            );
            Education::query()->updateOrCreate(
                ['institution' => 'Mr. Bob Kampung Inggris Pare', 'degree' => 'Intensive English Program'],
                [
                    'field' => 'English',
                    'description' => null,
                    'start_date' => '2026-01-01',
                    'end_date' => '2026-02-28',
                ],
            );

            Certification::query()->where('name', 'Laravel Certified Developer')->delete();
            $certifications = [
                ['name' => 'Junior Web Programmer', 'issuer' => 'LSP Universitas PGRI Semarang', 'issue_date' => '2026-01-01'],
                ['name' => 'Junior Web Developer', 'issuer' => 'PT Campus Digital Indonesia', 'issue_date' => '2025-01-01'],
                ['name' => 'Memulai Pemrograman dengan Python', 'issuer' => 'Dicoding', 'issue_date' => '2024-01-01'],
                ['name' => 'Belajar JavaScript', 'issuer' => 'Codepolitan', 'issue_date' => '2024-01-01'],
                ['name' => 'Belajar Bootstrap CSS Framework', 'issuer' => 'Codepolitan', 'issue_date' => '2023-01-01'],
                ['name' => 'Belajar Membuat Aplikasi Back-End untuk Pemula', 'issuer' => 'Dicoding', 'issue_date' => '2023-01-01'],
            ];

            foreach ($certifications as $certificationData) {
                $certification = Certification::withTrashed()->firstOrNew([
                    'name' => $certificationData['name'],
                    'issuer' => $certificationData['issuer'],
                ]);
                $certification->fill($certificationData + [
                    'expiration_date' => null,
                    'credential_id' => null,
                    'credential_url' => null,
                    'image' => null,
                ]);
                $certification->deleted_at = null;
                $certification->save();
            }

            $profile->sections()
                ->where('section_key', 'certifications')
                ->update(['is_enabled' => true]);

            $socialLinks = [
                ['platform' => 'github', 'label' => 'GitHub', 'url' => 'https://github.com/rizkikurni', 'icon' => 'github', 'sort_order' => 0, 'is_active' => true],
                ['platform' => 'linkedin', 'label' => 'LinkedIn', 'url' => 'https://linkedin.com/in/rizkikurniawan-dev', 'icon' => 'linkedin', 'sort_order' => 1, 'is_active' => true],
                ['platform' => 'email', 'label' => 'Email', 'url' => 'mailto:murizki3108@gmail.com', 'icon' => 'mail', 'sort_order' => 2, 'is_active' => true],
            ];

            foreach ($socialLinks as $socialLinkData) {
                SocialLink::query()->updateOrCreate(
                    ['platform' => $socialLinkData['platform']],
                    $socialLinkData,
                );
            }
        });

        $this->command?->info('Frontend profile synchronized with Muhammad Rizki Kurniawan CV.');
    }
}
