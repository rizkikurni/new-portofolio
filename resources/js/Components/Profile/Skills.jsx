import Section from '../UI/Section';
import Badge from '../UI/Badge';
import { Cpu, Star, Layers } from 'lucide-react';

export default function Skills({ skillsByCategory = {}, skills = [] }) {
    const categories = Object.keys(skillsByCategory).length > 0
        ? skillsByCategory
        : skills.reduce((acc, skill) => {
              const cat = skill.category || 'Other';
              if (!acc[cat]) acc[cat] = [];
              acc[cat].push(skill);
              return acc;
          }, {});

    const categoryNames = Object.keys(categories);
    if (categoryNames.length === 0) return null;

    return (
        <Section
            id="skills"
            title="Skills & Technologies"
            subtitle="Technologies, frameworks, and tools I work with daily."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryNames.map((category) => {
                    const catSkills = categories[category];

                    return (
                        <div
                            key={category}
                            className="pro-card pro-card-glow group p-6"
                        >
                            <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                                        <Cpu className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                                        {category}
                                    </h3>
                                </div>
                                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                                    {catSkills.length} skills
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {catSkills.map((skill) => (
                                    <Badge
                                        key={skill.id}
                                        variant={skill.is_featured ? 'featured' : 'secondary'}
                                        className="text-xs py-1.5 px-3"
                                    >
                                        {skill.is_featured && (
                                            <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                                        )}
                                        <span>{skill.name}</span>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
