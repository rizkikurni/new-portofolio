export default function Index() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    🚀 Portfolio is{' '}
                    <span className="text-gradient">Live</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    Laravel + Inertia.js + React + Tailwind CSS stack is working.
                </p>
                <div className="mt-8 flex gap-4 justify-center">
                    <a
                        href="/admin"
                        className="btn-primary"
                    >
                        Open Admin Panel
                    </a>
                </div>
            </div>
        </div>
    );
}
