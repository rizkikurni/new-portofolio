import Section from '../UI/Section';
import { ArrowRight } from 'lucide-react';

export default function Experience({ experiences = [] }) {
    if (!experiences || experiences.length === 0) return null;

    return (
        <Section
            id="experience"
            tag="Experience"
            title="Work Experience & Career."
            subtitle="Professional track record and roles contributing to high-impact products and teams."
        >
            <div className="border-t border-dark-600/60 divide-y divide-dark-600/60">
                {experiences.map((exp) => (
                    <div
                        key={exp.id}
                        className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                        {/* Date Range / Tag */}
                        <div className="sm:w-1/4">
                            <span className="text-xs font-mono font-medium text-gray-500">
                                {exp.start_date} — {exp.end_date}
                            </span>
                        </div>

                        {/* Position & Company */}
                        <div className="sm:w-1/2">
                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-accent-500 transition-colors">
                                {exp.position}
                            </h3>
                            <p className="text-sm text-gray-400 mt-0.5">
                                {exp.company}
                            </p>
                            {exp.description && (
                                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                                    {exp.description}
                                </p>
                            )}
                        </div>

                        {/* Arrow Link Action */}
                        <div className="sm:w-1/4 flex sm:justify-end items-center">
                            {exp.company_url ? (
                                <a
                                    href={exp.company_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-accent-500 hover:text-accent-400 group/btn transition-colors"
                                >
                                    <span>Visit</span>
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center text-gray-600 group-hover:text-accent-500 transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
