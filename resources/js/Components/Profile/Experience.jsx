import Section from '../UI/Section';
import Badge from '../UI/Badge';
import { Briefcase, Calendar, Building2, ExternalLink } from 'lucide-react';

export default function Experience({ experiences = [] }) {
    if (!experiences || experiences.length === 0) return null;

    const sorted = [...experiences].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

    return (
        <Section
            id="experience"
            title="Work Experience"
            subtitle="My professional career timeline, technical roles, and key contributions."
        >
            <div className="relative pl-6 sm:pl-8 border-l-2 border-primary-200 dark:border-slate-800 space-y-10">
                {sorted.map((exp) => (
                    <div key={exp.id} className="relative group">
                        {/* Glowing Dot on Connector */}
                        <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-primary-600 dark:border-primary-500 group-hover:scale-125 transition-transform" />

                        {/* Pro Card Container */}
                        <div className="pro-card pro-card-glow p-6 sm:p-8">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                                <div>
                                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                                        {exp.position}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1 text-sm font-semibold text-primary-600 dark:text-primary-400">
                                        <Building2 className="w-4 h-4 shrink-0" />
                                        {exp.company_url ? (
                                            <a
                                                href={exp.company_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline inline-flex items-center gap-1"
                                            >
                                                {exp.company}
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        ) : (
                                            <span>{exp.company}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>
                                            {exp.start_date} – {exp.end_date}
                                        </span>
                                    </div>
                                    {exp.is_current && <Badge variant="success">Current</Badge>}
                                </div>
                            </div>

                            {/* Description */}
                            {exp.description && (
                                <div className="mt-4 text-sm md:text-base text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                                    {exp.description}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
