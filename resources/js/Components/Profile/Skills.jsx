import Section from '../UI/Section';
import Badge from '../UI/Badge';

export default function Skills({ skillsByCategory = {}, skills = [] }) {
    const categories = Object.keys(skillsByCategory || {});

    // Fallback if not grouped
    if (categories.length === 0 && (!skills || skills.length === 0)) {
        return null;
    }

    return (
        <Section
            id="skills"
            tag="Capabilities"
            title="Core Skills & Technologies."
            subtitle="Tools, frameworks, and proficiencies utilized across projects and workflows."
        >
            {categories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className="bg-dark-700 border border-dark-600/80 rounded-3xl p-6 sm:p-8"
                        >
                            <h3 className="text-lg font-bold text-white mb-4 pb-3 border-b border-dark-600/60 capitalize flex items-center justify-between">
                                <span>{category}</span>
                                <span className="text-xs font-mono text-gray-500">
                                    {skillsByCategory[category].length}
                                </span>
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {skillsByCategory[category].map((skill) => (
                                    <Badge
                                        key={skill.id}
                                        variant={skill.is_featured ? 'accent' : 'dark'}
                                    >
                                        {skill.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-dark-700 border border-dark-600/80 rounded-3xl p-8">
                    <div className="flex flex-wrap gap-2.5">
                        {skills.map((skill) => (
                            <Badge
                                key={skill.id}
                                variant={skill.is_featured ? 'accent' : 'dark'}
                            >
                                {skill.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </Section>
    );
}
