import Section from '../UI/Section';
import { GraduationCap, Calendar } from 'lucide-react';

export default function Education({ educations = [] }) {
    if (!educations || educations.length === 0) return null;

    return (
        <Section
            id="education"
            title="Education"
            subtitle="Academic background, degree qualifications, and fields of study."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {educations.map((edu) => (
                    <div
                        key={edu.id}
                        className="pro-card pro-card-glow p-6 sm:p-8"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 shadow-sm border border-primary-100 dark:border-primary-900">
                                <GraduationCap className="w-6 h-6" />
                            </div>

                            <div className="flex-1 space-y-1.5">
                                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                    <Calendar className="w-3 h-3" />
                                    {edu.date_range}
                                </span>

                                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white pt-1">
                                    {edu.degree} in {edu.field}
                                </h3>

                                <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                                    {edu.institution}
                                </p>

                                {edu.description && (
                                    <p className="text-sm text-slate-600 dark:text-slate-300 pt-2 leading-relaxed font-sans">
                                        {edu.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
