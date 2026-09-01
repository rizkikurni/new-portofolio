export default function Section({ id, tag, title, subtitle, children, className = '' }) {
    return (
        <section id={id} className={`py-16 md:py-24 ${className}`}>
            {(tag || title) && (
                <div className="mb-10 md:mb-14">
                    {tag && (
                        <div className="dash-tag mb-4">
                            <span>—</span>
                            <span>{tag}</span>
                        </div>
                    )}
                    {title && (
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="mt-3 text-sm text-gray-500 max-w-lg leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
            {children}
        </section>
    );
}
