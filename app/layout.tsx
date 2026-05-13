import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'User Dashboard',
    template: '%s | User Dashboard',  
  },
  description: 'Dashboard manajemen user',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg text-blue-600 hover:text-blue-700">
              UserDash
            </Link>
            <Link
              href="/users"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Users
            </Link>
          </div>
        </nav>


        {children}
      </body>
    </html>
  );
}