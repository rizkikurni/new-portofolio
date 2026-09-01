import { ArrowRight, Layers, Palette, Code2 } from 'lucide-react';

export default function ServicesGrid({ profile = {}, projects = [], skills = [] }) {
    const email = profile.email || 'hi@carlos.com';
    const totalProjects = projects.length || 12;

    // Feature card specs matching Carlos Mendoza reference
    const services = [
        {
            title: 'Product Designer.',
            count: `${Math.max(totalProjects, 12)} Projects`,
            icon: Layers,
            featured: true, // Yellow highlight card
        },
        {
            title: 'Branding Designer.',
            count: `${Math.max(Math.floor(totalProjects * 0.6), 8)} Projects`,
            icon: Palette,
            featured: false, // Dark card
        },
        {
            title: 'Full Stack Developer.',
            count: `${Math.max(Math.floor(totalProjects * 0.8), 15)} Projects`,
            icon: Code2,
            featured: false, // Dark card
        },
    ];

    return (
        <section id="services" className="py-16 md:py-24 border-t border-dark-600/40">
            {/* 1. Top Section: Query & Discussion (Left) + Quote & Stats (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 md:mb-20">
                {/* Left Side: Contact Query */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="dash-tag">
                        <span>—</span>
                        <span>Contact</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white leading-tight">
                        Any Type Of Query & Discussion.
                    </h2>

                    <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                        {profile.tagline || 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.'}
                    </p>

                    <div className="pt-2">
                        <a
                            href={`mailto:${email}`}
                            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-accent-500 hover:text-accent-400 group transition-colors"
                        >
                            <span className="underline underline-offset-4 decoration-accent-500/50 group-hover:decoration-accent-400">
                                {email}
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Right Side: Creativity Quote & Metric Counters */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="space-y-3">
                        <p className="text-xl sm:text-2xl font-bold text-white leading-snug">
                            You can't use up creativity, the more you use, more you have in your signifiant mind.
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
                        </p>
                    </div>

                    {/* Stats Counters */}
                    <div className="flex flex-wrap items-center gap-12 sm:gap-16 pt-2">
                        <div className="flex items-baseline gap-3">
                            <span className="text-5xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
                                14
                            </span>
                            <span className="text-xs text-gray-400 font-medium leading-tight max-w-[90px]">
                                Years of Experience.
                            </span>
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-5xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
                                187
                            </span>
                            <span className="text-xs text-gray-400 font-medium leading-tight max-w-[90px]">
                                Satisfied Clients.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Bottom Section: 3 Large Specialty Cards (1 Yellow + 2 Dark) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {services.map((item, index) => {
                    const Icon = item.icon;
                    if (item.featured) {
                        return (
                            <div
                                key={index}
                                className="bg-accent-500 rounded-3xl p-8 sm:p-10 text-dark-900 flex flex-col justify-between min-h-[300px] shadow-xl relative overflow-hidden group"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-dark-900/10 flex items-center justify-center mb-12">
                                    <Icon className="w-6 h-6 text-dark-900" />
                                </div>
                                <div>
                                    <h3 className="text-2xl sm:text-[26px] font-bold text-dark-900 mb-2 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs font-semibold text-dark-900/70 uppercase tracking-wider">
                                        {item.count}
                                    </p>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={index}
                            className="bg-dark-700 border border-dark-600/80 rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between min-h-[300px] shadow-lg relative overflow-hidden group hover:border-dark-500 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-dark-600 flex items-center justify-center mb-12">
                                <Icon className="w-6 h-6 text-accent-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl sm:text-[26px] font-bold text-white mb-2 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {item.count}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
