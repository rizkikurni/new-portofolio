import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import Section from '../UI/Section';
import ScrollReveal from '../UI/ScrollReveal';

export default function Experience({ experiences = [] }) {
    if (!experiences.length) return null;

    return (
        <Section id="experience" tag="Experience" title="The work behind the skills." subtitle="Roles, responsibilities, and contributions that shaped how I build software.">
            <div className="relative border-l border-slate-200 pl-6 transition-colors dark:border-white/10 sm:pl-9">
                {experiences.map((experience, index) => (
                    <ScrollReveal
                        as="article"
                        key={experience.id}
                        variant={index % 2 === 0 ? 'from-left' : 'from-right'}
                        delay={250 + Math.min(index, 3) * 80}
                        className={`${index === 0 ? 'pb-12' : 'py-12'} relative border-b border-slate-200 transition-colors last:border-0 last:pb-0 dark:border-dark-600`}
                    >
                        <span className="absolute -left-[31px] top-1.5 flex h-3 w-3 rounded-full border-2 border-slate-50 bg-accent-500 transition-colors dark:border-dark-900 sm:-left-[43px]" />
                        <div className="grid gap-5 md:grid-cols-[0.33fr_1fr] md:gap-10">
                            <div>
                                <p className="font-mono text-xs text-slate-500 transition-colors dark:text-gray-500 md:text-sm">{experience.start_date} — {experience.end_date}</p>
                                {experience.is_current && (
                                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400 md:text-xs">
                                        <BriefcaseBusiness className="h-3 w-3" /> Current
                                    </span>
                                )}
                            </div>
                            <div>
                                <div className="flex items-start justify-between gap-5">
                                    <div>
                                        <h3 className="text-xl font-extrabold text-slate-900 transition-colors dark:text-white sm:text-2xl">{experience.position}</h3>
                                        <p className="mt-1 text-sm font-semibold text-slate-600 transition-colors dark:text-gray-400 md:text-base">{experience.company}</p>
                                    </div>
                                    {experience.company_url && (
                                        <a href={experience.company_url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${experience.company}`} className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition-colors hover:border-accent-500/40 hover:text-accent-500 dark:border-white/10 dark:bg-transparent dark:text-gray-400 dark:shadow-none">
                                            <ArrowUpRight className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                                {experience.description && (
                                    <p className="mt-5 max-w-3xl whitespace-pre-line text-sm leading-7 text-slate-600 transition-colors dark:text-gray-400 md:text-base md:leading-8">{experience.description}</p>
                                )}
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </Section>
    );
}
