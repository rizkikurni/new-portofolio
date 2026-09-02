import Section from '../UI/Section';

export default function Skills({ skillsByCategory = {}, skills = [] }) {
    const categories = Object.entries(skillsByCategory || {});
    if (categories.length === 0 && skills.length === 0) return null;

    const groups = categories.length > 0 ? categories : [['Technologies', skills]];

    return (
        <Section id="skills" tag="Capabilities" title="Tools I use to turn ideas into reliable products." subtitle="The highlighted technologies are the ones most relevant to this role and portfolio profile.">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {groups.map(([category, categorySkills]) => (
                    <article key={category} className="rounded-3xl border border-white/10 bg-dark-800 p-6 sm:p-8">
                        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">{category}</h3>
                        <div className="mt-6 space-y-3">
                            {[...categorySkills]
                                .sort((a, b) => Number(b.is_featured) - Number(a.is_featured))
                                .map((skill) => (
                                    <div key={skill.id} className="flex items-center justify-between gap-3 border-b border-white/8 pb-3 last:border-0 last:pb-0">
                                        <div>
                                            <p className={`text-sm font-semibold ${skill.is_featured ? 'text-white' : 'text-gray-400'}`}>{skill.name}</p>
                                            {skill.description && <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">{skill.description}</p>}
                                        </div>
                                        {skill.is_featured && <span className="h-2 w-2 shrink-0 rounded-full bg-accent-500" aria-label="Featured skill" />}
                                    </div>
                                ))}
                        </div>
                    </article>
                ))}
            </div>
        </Section>
    );
}
