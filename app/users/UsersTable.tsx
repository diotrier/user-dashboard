// app/users/UsersTable.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EnrichedUser } from '@/types';

interface Props {
  users: EnrichedUser[];
}

// Tipe filter yang tersedia
type FilterType = 'all' | 'hasPending' | 'noCompleted';

export default function UsersTable({ users }: Props) {
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = users
    .filter((u) => {
      // Filter 1: search by name/email
      const q = search.toLowerCase();
      const matchSearch =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);

      // Filter 2: filter tambahan
      const matchFilter =
        filter === 'all' ? true :
        filter === 'hasPending' ? u.pendingTodos > 0 :
        filter === 'noCompleted' ? u.completedTodos === 0 :
        true;

      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      const result = a.name.localeCompare(b.name);
      return sortAsc ? result : -result;
    });

  return (
    <div>
      {/* Baris kontrol: search + filter + sort */}
      <div className="mb-4 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <input
          type="search"
          placeholder="Cari nama atau email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64 text-sm"
        />

        {/* Filter buttons */}
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'Semua' },
            { value: 'hasPending', label: 'Ada Pending' },
            { value: 'noCompleted', label: 'Belum Ada yang Selesai' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value as FilterType)}
              className={`px-3 py-2 rounded text-sm border transition-colors ${
                filter === opt.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="border border-gray-300 rounded px-3 py-2 text-sm hover:bg-gray-50 ml-auto"
        >
          Sort Nama {sortAsc ? '↑' : '↓'}
        </button>
      </div>

      {/* Info jumlah hasil */}
      <p className="text-sm text-gray-500 mb-3">
        Menampilkan {filtered.length} dari {users.length} users
      </p>

      {/* Tabel — desktop */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-3 border border-gray-200">Name</th>
              <th className="px-4 py-3 border border-gray-200">Email</th>
              <th className="px-4 py-3 border border-gray-200">Website</th>
              <th className="px-4 py-3 border border-gray-200 text-center">Posts</th>
              <th className="px-4 py-3 border border-gray-200 text-center">✅ Selesai</th>
              <th className="px-4 py-3 border border-gray-200 text-center">⏳ Pending</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Tidak ada user yang cocok.
                  <button
                    onClick={() => { setSearch(''); setFilter('all'); }}
                    className="ml-2 text-blue-600 hover:underline"
                  >
                    Reset filter
                  </button>
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border border-gray-200">
                    <Link href={`/users/${user.id}`} className="text-blue-600 hover:underline font-medium">
                      {user.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 border border-gray-200 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 border border-gray-200 text-gray-600">{user.website}</td>
                  <td className="px-4 py-3 border border-gray-200 text-center">{user.totalPosts}</td>
                  <td className="px-4 py-3 border border-gray-200 text-center text-green-600 font-medium">
                    {user.completedTodos}
                  </td>
                  <td className="px-4 py-3 border border-gray-200 text-center text-orange-500 font-medium">
                    {user.pendingTodos}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cards — mobile */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Tidak ada user yang cocok.{' '}
            <button onClick={() => { setSearch(''); setFilter('all'); }} className="text-blue-600 hover:underline">
              Reset filter
            </button>
          </p>
        ) : (
          filtered.map((user) => (
            <Link
              key={user.id}
              href={`/users/${user.id}`}
              className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
            >
              <p className="font-semibold text-blue-600">{user.name}</p>
              <p className="text-sm text-gray-500 mb-2">{user.email}</p>
              <div className="flex gap-3 text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">📝 {user.totalPosts} posts</span>
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded">✅ {user.completedTodos}</span>
                <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded">⏳ {user.pendingTodos}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}