import Section from '../UI/Section';
import { Award, ExternalLink, Calendar } from 'lucide-react';

export default function Certifications({ certifications = [] }) {
    if (!certifications || certifications.length === 0) return null;

    return (
        <Section
            id="certifications"
            title="Certifications & Credentials"
            subtitle="Verified industry certifications and technical qualifications."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert) => (
                    <div
                        key={cert.id}
                        className="pro-card pro-card-glow p-6 flex flex-col justify-between"
                    >
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-3">
                                {cert.image ? (
                                    <img
                                        src={cert.image}
                                        alt={cert.name}
                                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-800 shadow-sm"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900">
                                        <Award className="w-6 h-6" />
                                    </div>
                                )}

                                {cert.credential_url && (
                                    <a
                                        href={cert.credential_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-xl text-slate-400 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                        title="Verify Credential"
                                        aria-label="Verify Credential"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>

                            <div>
                                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                                    {cert.name}
                                </h3>
                                <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-0.5">
                                    {cert.issuer}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span className="inline-flex items-center gap-1.5 font-mono">
                                <Calendar className="w-3.5 h-3.5" />
                                Issued: {cert.issue_date}
                            </span>
                            {cert.credential_id && (
                                <span className="font-mono text-[11px] truncate max-w-[110px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                                    ID: {cert.credential_id}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
