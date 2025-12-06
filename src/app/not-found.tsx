import Link from "next/link";

export default function NotFound() {
    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <div className="text-center">
                <h1 
                    className="text-6xl font-bold mb-4"
                    style={{ color: 'var(--accent)' }}
                >
                    404
                </h1>
                <h2 
                    className="text-2xl font-semibold mb-4"
                    style={{ color: 'var(--text-primary)' }}
                >
                    Page Not Found
                </h2>
                <p 
                    className="mb-8 max-w-md mx-auto"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <Link
                        href="/home"
                        className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                        style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/user/user-dashboard"
                        className="border px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-80"
                        style={{ 
                            borderColor: 'var(--border)',
                            color: 'var(--text-primary)',
                        }}
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
