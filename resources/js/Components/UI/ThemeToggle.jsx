import { Moon, Sun } from 'lucide-react';
import useTheme from '../../Hooks/useTheme';

export default function ThemeToggle({ className = '', showLabel = false }) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`
                group relative inline-flex items-center justify-center gap-2 rounded-xl
                border border-slate-200 bg-white/80 p-2.5 text-slate-700 shadow-sm backdrop-blur-md
                transition-all duration-300 hover:border-accent-500/50 hover:bg-slate-100 hover:text-slate-900
                dark:border-dark-600 dark:bg-dark-800 dark:text-gray-300 dark:shadow-none
                dark:hover:border-accent-500/50 dark:hover:bg-dark-700 dark:hover:text-white
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500
                ${className}
            `}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <div className="relative flex h-5 w-5 items-center justify-center">
                {/* Sun Icon for Light Mode transition */}
                <Sun
                    className={`
                        h-4 w-4 text-amber-500 transition-all duration-300
                        ${isDark ? 'rotate-0 scale-100 opacity-100' : 'absolute -rotate-90 scale-0 opacity-0'}
                    `}
                />
                {/* Moon Icon for Dark Mode transition */}
                <Moon
                    className={`
                        h-4 w-4 text-slate-700 transition-all duration-300
                        ${isDark ? 'absolute rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
                    `}
                />
            </div>

            {showLabel && (
                <span className="text-sm font-semibold">
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                </span>
            )}
        </button>
    );
}
