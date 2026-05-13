
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        User Dashboard
      </h1>
      <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
        Kelola dan pantau aktivitas user — posts, todos, dan informasi profil.
      </p>
      <Link
        href="/users"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Lihat Semua Users →
      </Link>
    </main>
  );
}