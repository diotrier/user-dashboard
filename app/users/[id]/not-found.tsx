
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-6">User tidak ditemukan.</p>
      <Link
        href="/users"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Kembali ke daftar
      </Link>
    </main>
  );
}