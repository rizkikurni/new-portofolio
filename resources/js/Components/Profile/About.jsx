import { Code2, Layers3, UsersRound } from 'lucide-react';
import Section from '../UI/Section';
import ScrollReveal from '../UI/ScrollReveal';

const principles = [
    { icon: Code2, label: 'Clean implementation' },
    { icon: Layers3, label: 'Thoughtful architecture' },
    { icon: UsersRound, label: 'User-focused decisions' },
];

export default function About({ aboutText }) {
    if (!aboutText) return null;

    return (
        <Section id="about" tag="About" title="A little context beyond the code." subtitle="What I value, how I approach product work, and the kind of developer I am becoming.">
            <div className="grid gap-8 md:grid-cols-[1fr_0.7fr] md:gap-10 xl:grid-cols-[1fr_0.65fr] xl:gap-14">
                <ScrollReveal
                    variant="from-left"
                    delay={250}
                    className="portfolio-prose text-base leading-8 text-gray-300 md:text-[17px] md:leading-9 xl:text-lg"
                    dangerouslySetInnerHTML={{ __html: aboutText }}
                />
                <div className="space-y-3">
                    {principles.map(({ icon: Icon, label }, index) => (
                        <ScrollReveal
                            key={label}
                            variant="from-right"
                            delay={320 + index * 80}
                            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-dark-800 p-4"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500"><Icon className="h-5 w-5" /></span>
                            <span className="text-sm font-semibold text-gray-200 md:text-base">{label}</span>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </Section>
    );
}
