import Section from '../UI/Section';
import ScrollReveal from '../UI/ScrollReveal';
import { GraduationCap } from 'lucide-react';

export default function Education({ educations = [] }) {
    if (!educations || educations.length === 0) return null;

    return (
        <Section
            id="education"
            tag="Education"
            title="Academic Background."
            subtitle="Formal education, degrees, and foundational academic coursework."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {educations.map((edu, index) => (
                    <ScrollReveal
                        key={edu.id}
                        variant={index % 2 === 0 ? 'from-left' : 'from-right'}
                        delay={250 + (index % 2) * 80}
                        className="flex items-start gap-4 rounded-3xl border border-dark-600/80 bg-dark-700 p-6 sm:p-8 md:p-7 xl:p-8"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-dark-600 flex items-center justify-center flex-shrink-0 text-accent-500">
                            <GraduationCap className="w-6 h-6" />
                        </div>

                        <div className="space-y-1 flex-1">
                            <span className="font-mono text-xs text-gray-500 md:text-sm">
                                {edu.date_range}
                            </span>
                            <h3 className="text-lg font-bold leading-snug text-white md:text-xl">
                                {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                            </h3>
                            <p className="text-sm font-medium text-gray-400 md:text-base">
                                {edu.institution}
                            </p>
                            {edu.description && (
                                <p className="pt-2 text-xs leading-relaxed text-gray-500 md:text-sm md:leading-6">
                                    {edu.description}
                                </p>
                            )}
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </Section>
    );
}
