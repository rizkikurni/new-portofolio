import Section from '../UI/Section';
import Button from '../UI/Button';
import SocialLinks from './SocialLinks';
import { Mail, MessageSquare, Send, Sparkles } from 'lucide-react';

export default function Contact({ profile = {}, socialLinks = [] }) {
    const email = profile.email || 'hello@example.com';

    return (
        <Section id="contact" className="relative overflow-hidden">
            <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 text-white text-center shadow-2xl overflow-hidden bg-slate-900 dark:bg-slate-900 border border-slate-800">
                {/* Gradient Glow Backdrops */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    {/* Icon Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 text-white flex items-center justify-center mx-auto shadow-inner">
                        <MessageSquare className="w-7 h-7" />
                    </div>

                    {/* Header */}
                    <div className="space-y-2">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-500/20 border border-primary-400/30 text-primary-300 text-xs font-semibold uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5" />
                            Get In Touch
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight pt-2">
                            Let's Work Together
                        </h2>
                    </div>

                    <p className="text-slate-300 text-base md:text-lg leading-relaxed font-sans">
                        Have a project in mind, an opportunity to discuss, or just want to connect? Send an email or reach out on social media.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            href={`mailto:${email}`}
                            variant="primary"
                            size="lg"
                            icon={Mail}
                            className="w-full sm:w-auto bg-white text-slate-950 hover:bg-slate-100 shadow-xl border-none font-bold"
                        >
                            {email}
                        </Button>
                    </div>

                    {/* Social Links Footer inside Contact */}
                    {socialLinks && socialLinks.length > 0 && (
                        <div className="pt-8 border-t border-white/10 flex justify-center">
                            <SocialLinks links={socialLinks} size="md" />
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
}
