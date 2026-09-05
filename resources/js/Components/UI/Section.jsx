import ScrollReveal from './ScrollReveal';

export default function Section({ id, tag, title, subtitle, children, className = '' }) {
    return (
        <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
            {(tag || title) && (
                <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[0.35fr_1fr] md:gap-10">
                    <ScrollReveal variant="from-left">
                        {tag && (
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500 lg:text-sm">{tag}</p>
                        )}
                    </ScrollReveal>
                    <ScrollReveal variant="rise" delay={200}>
                        {title && (
                            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">{title}</h2>
                        )}
                        {subtitle && (
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base lg:text-lg lg:leading-8">{subtitle}</p>
                        )}
                    </ScrollReveal>
                </div>
            )}
            {children}
        </section>
    );
}
