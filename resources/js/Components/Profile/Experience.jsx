import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import Section from '../UI/Section';
import ScrollReveal from '../UI/ScrollReveal';

export default function Experience({ experiences = [] }) {
    if (!experiences.length) return null;

    return (
        <Section id="experience" tag="Experience" title="The work behind the skills." subtitle="Roles, responsibilities, and contributions that shaped how I build software.">
            <div className="relative border-l border-white/10 pl-6 sm:pl-9">
                {experiences.map((experience, index) => (
                    <ScrollReveal
                        as="article"
                        key={experience.id}
                        variant={index % 2 === 0 ? 'from-left' : 'from-right'}
                        delay={350 + Math.min(index, 3) * 120}
                        className={`${index === 0 ? 'pb-12' : 'py-12'} relative border-b border-white/8 last:border-0 last:pb-0`}
                    >
                        <span className="absolute -left-[31px] top-1.5 flex h-3 w-3 rounded-full border-2 border-dark-900 bg-accent-500 sm:-left-[43px]" />
                        <div className="grid gap-5 md:grid-cols-[0.33fr_1fr] md:gap-10">
                            <div>
                                <p className="font-mono text-xs text-gray-500 lg:text-sm">{experience.start_date} — {experience.end_date}</p>
                                {experience.is_current && (
                                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-400 lg:text-xs">
                                        <BriefcaseBusiness className="h-3 w-3" /> Current
                                    </span>
                                )}
                            </div>
                            <div>
                                <div className="flex items-start justify-between gap-5">
                                    <div>
                                        <h3 className="text-xl font-extrabold text-white sm:text-2xl">{experience.position}</h3>
                                        <p className="mt-1 text-sm font-semibold text-gray-400 lg:text-base">{experience.company}</p>
                                    </div>
                                    {experience.company_url && (
                                        <a href={experience.company_url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${experience.company}`} className="rounded-full border border-white/10 p-2.5 text-gray-400 transition-colors hover:border-accent-500/40 hover:text-accent-500">
                                            <ArrowUpRight className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                                {experience.description && (
                                    <p className="mt-5 max-w-3xl whitespace-pre-line text-sm leading-7 text-gray-400 lg:text-base lg:leading-8">{experience.description}</p>
                                )}
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </Section>
    );
}
