import { useState } from 'react';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Contact({ profile = {}, socialLinks = [] }) {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const email = profile.email || 'hi@carlos.com';

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct mailto link
        const subject = encodeURIComponent(`Project Inquiry from ${form.name || 'Website Visitor'}`);
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        setSubmitted(true);
    };

    return (
        <section id="contact" className="py-16 md:py-24 border-t border-dark-600/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* 1. Left Side: Direct Contact Details */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="dash-tag">
                        <span>—</span>
                        <span>Contact</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        Estimate your project? Let me know here.
                    </h2>

                    <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                        Have a new idea, an existing project in need of overhaul, or want to discuss engineering & design? Feel free to reach out directly.
                    </p>

                    <div className="pt-4 space-y-3">
                        <div className="text-xs uppercase tracking-wider font-mono text-gray-500">
                            Direct Email
                        </div>
                        <a
                            href={`mailto:${email}`}
                            className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-accent-500 hover:text-accent-400 group transition-colors"
                        >
                            <span>{email}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* 2. Right Side: Minimalist Underline Form */}
                <div className="lg:col-span-7 bg-dark-700 border border-dark-600/80 rounded-3xl p-8 sm:p-12">
                    {submitted ? (
                        <div className="text-center py-10 space-y-4">
                            <div className="w-14 h-14 rounded-full bg-accent-500/10 text-accent-500 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">
                                Message Prepared!
                            </h3>
                            <p className="text-sm text-gray-400 max-w-sm mx-auto">
                                Your email client has been opened with your inquiry details.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-xs font-semibold text-accent-500 hover:underline pt-2"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                    What's your name?
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Jane Doe"
                                    className="w-full bg-transparent border-b border-dark-500 pb-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-500 transition-colors text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                    Your fancy email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="jane@company.com"
                                    className="w-full bg-transparent border-b border-dark-500 pb-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-500 transition-colors text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                    Tell me about your project...
                                </label>
                                <textarea
                                    rows="3"
                                    required
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    placeholder="Project objectives, timelines, scope..."
                                    className="w-full bg-transparent border-b border-dark-500 pb-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-500 transition-colors text-base resize-none"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent-500 hover:bg-accent-400 text-dark-900 font-bold text-sm tracking-wide transition-colors"
                                >
                                    <span>Send Inquiry</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
