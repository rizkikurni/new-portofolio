/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                display: ['Space Grotesk', 'DM Sans', 'sans-serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
            },
            colors: {
                primary: {
                    50:  '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                    950: '#1e1b4b',
                },
                slate: {
                    850: '#121827',
                    950: '#080c14',
                },
            },
            boxShadow: {
                'glow': '0 0 25px -5px rgba(99, 102, 241, 0.25)',
                'glow-lg': '0 0 40px -10px rgba(99, 102, 241, 0.35)',
                'card-hover': '0 20px 40px -15px rgba(15, 23, 42, 0.12)',
                'card-dark-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(24px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
};
