import Section from '../UI/Section';
import ScrollReveal from '../UI/ScrollReveal';
import { Award, ExternalLink } from 'lucide-react';

export default function Certifications({ certifications = [] }) {
    if (!certifications || certifications.length === 0) return null;

    return (
        <Section
            id="certifications"
            tag="Credentials"
            title="Certifications & Honors."
            subtitle="Verified licenses, technical certifications, and recognized credentials."
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                    <ScrollReveal
                        key={cert.id}
                        variant="rise"
                        delay={250 + (index % 3) * 80}
                        className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-colors dark:bg-dark-700 dark:border-dark-600/80 dark:shadow-none"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3">
                                <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-500 dark:bg-dark-600">
                                    <Award className="w-5 h-5" />
                                </div>
                                <span className="font-mono text-xs text-slate-500 transition-colors dark:text-gray-500 md:text-sm">
                                    {cert.issue_date}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-base font-bold leading-snug text-slate-900 transition-colors dark:text-white md:text-lg">
                                    {cert.name}
                                </h3>
                                <p className="mt-1 text-xs font-medium text-slate-600 transition-colors dark:text-gray-400 md:text-sm">
                                    {cert.issuer}
                                </p>
                            </div>
                        </div>

                        {cert.credential_url && (
                            <div className="pt-4 mt-4 border-t border-slate-200 transition-colors dark:border-dark-600/60">
                                <a
                                    href={cert.credential_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-500 transition-colors hover:text-accent-400 md:text-sm"
                                >
                                    <span>Verify Credential</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        )}
                    </ScrollReveal>
                ))}
            </div>
        </Section>
    );
}
