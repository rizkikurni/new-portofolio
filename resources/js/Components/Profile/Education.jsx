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
                        delay={350 + (index % 2) * 120}
                        className="bg-dark-700 border border-dark-600/80 rounded-3xl p-6 sm:p-8 flex items-start gap-4"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-dark-600 flex items-center justify-center flex-shrink-0 text-accent-500">
                            <GraduationCap className="w-6 h-6" />
                        </div>

                        <div className="space-y-1 flex-1">
                            <span className="text-xs font-mono text-gray-500 lg:text-sm">
                                {edu.date_range}
                            </span>
                            <h3 className="text-lg font-bold text-white leading-snug lg:text-xl">
                                {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                            </h3>
                            <p className="text-sm text-gray-400 font-medium lg:text-base">
                                {edu.institution}
                            </p>
                            {edu.description && (
                                <p className="text-xs text-gray-500 pt-2 leading-relaxed lg:text-sm lg:leading-6">
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
