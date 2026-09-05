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
                        delay={350 + (index % 3) * 120}
                        className="bg-dark-700 border border-dark-600/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3">
                                <div className="w-10 h-10 rounded-xl bg-dark-600 flex items-center justify-center text-accent-500">
                                    <Award className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-mono text-gray-500 lg:text-sm">
                                    {cert.issue_date}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-base font-bold text-white leading-snug lg:text-lg">
                                    {cert.name}
                                </h3>
                                <p className="text-xs text-gray-400 font-medium mt-1 lg:text-sm">
                                    {cert.issuer}
                                </p>
                            </div>
                        </div>

                        {cert.credential_url && (
                            <div className="pt-4 mt-4 border-t border-dark-600/60">
                                <a
                                    href={cert.credential_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-500 hover:text-accent-400 transition-colors lg:text-sm"
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
