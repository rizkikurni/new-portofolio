export default function Badge({ children, variant = 'primary', className = '' }) {
    const variants = {
        primary: 'bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800',
        secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
        featured: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800',
        success: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800',
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-colors ${variants[variant] || variants.primary} ${className}`}
        >
            {children}
        </span>
    );
}
