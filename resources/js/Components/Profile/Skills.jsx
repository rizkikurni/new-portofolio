import Section from '../UI/Section';
import ScrollReveal from '../UI/ScrollReveal';

export default function Skills({ skillsByCategory = {} }) {
    const groups = Object.entries(skillsByCategory || {});
    if (groups.length === 0) return null;

    return (
        <Section id="skills" tag="Capabilities" title="Tools I use to turn ideas into reliable products." subtitle="The highlighted technologies are the ones most relevant to this role and portfolio profile.">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-dark-800">
                {groups.map(([category, categorySkills], groupIndex) => (
                    <article
                        key={category}
                        className="grid items-start gap-6 border-b border-white/10 px-6 py-7 last:border-0 sm:px-8 md:grid-cols-[0.3fr_1fr] md:gap-8 lg:px-10 lg:py-9"
                    >
                        <ScrollReveal variant="from-left" delay={350}>
                            <span className="font-mono text-xs font-semibold text-accent-500 lg:text-sm">
                                {String(groupIndex + 1).padStart(2, '0')}
                            </span>
                            <h3 className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-white lg:text-base">
                                {category}
                            </h3>
                            <p className="mt-2 text-xs text-gray-500 lg:text-sm">
                                {categorySkills.length} {categorySkills.length === 1 ? 'technology' : 'technologies'}
                            </p>
                        </ScrollReveal>

                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {[...categorySkills]
                                .sort((a, b) => Number(b.is_featured) - Number(a.is_featured))
                                .map((skill, skillIndex) => (
                                    <ScrollReveal
                                        key={skill.id}
                                        variant={groupIndex % 2 === 0 ? 'rise' : 'zoom'}
                                        delay={450 + (skillIndex % 3) * 100}
                                        className={`flex min-h-14 items-start justify-between gap-3 rounded-xl border px-4 py-3.5 ${
                                            skill.is_featured
                                                ? 'border-accent-500/30 bg-accent-500/[0.06]'
                                                : 'border-white/[0.07] bg-white/[0.025]'
                                        }`}
                                    >
                                        <div className="min-w-0">
                                            <p className={`text-sm font-semibold lg:text-base ${skill.is_featured ? 'text-white' : 'text-gray-300'}`}>
                                                {skill.name}
                                            </p>
                                            {skill.description && (
                                                <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500 lg:text-sm lg:leading-6">
                                                    {skill.description}
                                                </p>
                                            )}
                                        </div>
                                        {skill.is_featured && (
                                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-500 shadow-[0_0_0_4px_rgba(255,112,77,0.10)]" aria-label="Featured skill" />
                                        )}
                                    </ScrollReveal>
                                ))}
                        </div>
                    </article>
                ))}
            </div>
        </Section>
    );
}
