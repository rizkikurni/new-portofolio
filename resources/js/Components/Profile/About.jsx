import Section from '../UI/Section';
import { UserCheck } from 'lucide-react';

export default function About({ aboutText = '' }) {
    if (!aboutText) return null;

    const paragraphs = aboutText.includes('<p>')
        ? null
        : aboutText.split('\n\n').filter(Boolean);

    return (
        <Section id="about" title="About Me" subtitle="A little bit about who I am, my philosophy, and what drives my work.">
            <div className="pro-card pro-card-glow group">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold">
                        <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                            Developer Overview
                        </h3>
                        <p className="text-xs text-slate-500">Background & Philosophy</p>
                    </div>
                </div>

                {paragraphs ? (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed font-sans">
                        {paragraphs.map((p, idx) => (
                            <p key={idx}>{p}</p>
                        ))}
                    </div>
                ) : (
                    <div
                        className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed font-sans"
                        dangerouslySetInnerHTML={{ __html: aboutText }}
                    />
                )}
            </div>
        </Section>
    );
}
