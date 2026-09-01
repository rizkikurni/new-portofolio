const variants = {
    accent: 'bg-accent-500/15 text-accent-500 border border-accent-500/20',
    dark: 'bg-dark-600/50 text-gray-300 border border-dark-500/50',
    outline: 'bg-transparent text-gray-400 border border-dark-600',
};

export default function Badge({ children, variant = 'dark', className = '' }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${variants[variant] || variants.dark} ${className}`}>
            {children}
        </span>
    );
}
