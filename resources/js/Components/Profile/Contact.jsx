import { ArrowUpRight, Download, Mail } from 'lucide-react';
import ScrollReveal from '../UI/ScrollReveal';
import SocialLinks from './SocialLinks';

export default function Contact({ profile = {}, socialLinks = [] }) {
    if (!profile.email && socialLinks.length === 0) return null;

    return (
        <section id="contact" className="scroll-mt-24 py-20 md:py-28">
            <div className="relative overflow-hidden rounded-[2rem] border border-accent-500/25 bg-accent-500 p-7 text-dark-900 sm:p-10 lg:p-14">
                <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-dark-900/5" />
                <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
                    <ScrollReveal variant="from-left">
                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-dark-900/60 lg:text-sm">Contact</p>
                        <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.04em] text-dark-900 sm:text-5xl lg:text-6xl">Let&apos;s talk about the next opportunity.</h2>
                        <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-dark-900/70 sm:text-base lg:text-lg lg:leading-8">If my experience and projects match what your team is looking for, I would be glad to discuss the role and how I can contribute.</p>
                    </ScrollReveal>
                    <ScrollReveal variant="from-right" delay={350} className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                        {profile.email && (
                            <a href={`mailto:${profile.email}`} className="inline-flex min-w-48 items-center justify-center gap-2 rounded-xl bg-dark-900 px-5 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 lg:text-base">
                                <Mail className="h-4 w-4" /> Email me <ArrowUpRight className="h-4 w-4" />
                            </a>
                        )}
                        {profile.resume_url && (
                            <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-w-48 items-center justify-center gap-2 rounded-xl border border-dark-900/20 px-5 py-3.5 text-sm font-bold text-dark-900 transition-colors hover:bg-dark-900/5 lg:text-base">
                                <Download className="h-4 w-4" /> {profile.resume_label || 'Download CV'}
                            </a>
                        )}
                    </ScrollReveal>
                </div>
                {socialLinks.length > 0 && (
                    <ScrollReveal variant="rise" delay={500} className="relative mt-10 border-t border-dark-900/15 pt-6 [&_a]:border-dark-900/20 [&_a]:bg-dark-900/5 [&_a]:text-dark-900 [&_a:hover]:bg-dark-900/10 [&_a:hover]:text-dark-900">
                        <SocialLinks links={socialLinks} size="sm" showLabels />
                    </ScrollReveal>
                )}
            </div>
        </section>
    );
}
