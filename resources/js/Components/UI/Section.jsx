export default function Section({ id, tag, title, subtitle, children, className = '' }) {
    return (
        <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
            {(tag || title) && (
                <div className="mb-10 grid gap-5 border-t border-white/10 pt-6 md:mb-14 md:grid-cols-[0.35fr_1fr] md:gap-10">
                    <div>
                        {tag && (
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">{tag}</p>
                        )}
                    </div>
                    <div>
                        {title && (
                            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">{title}</h2>
                        )}
                        {subtitle && (
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">{subtitle}</p>
                        )}
                    </div>
                </div>
            )}
            {children}
        </section>
    );
}
