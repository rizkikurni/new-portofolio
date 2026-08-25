export default function Section({
    id,
    title,
    subtitle,
    children,
    className = '',
    headerClassName = '',
}) {
    return (
        <section id={id} className={`py-16 md:py-24 ${className}`}>
            {(title || subtitle) && (
                <div className={`mb-12 ${headerClassName}`}>
                    {title && (
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
            {children}
        </section>
    );
}
