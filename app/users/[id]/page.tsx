import Link from 'next/link';
import { notFound } from 'next/navigation';
import { User, Post, Todo } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

async function getUserData(id: string) {
  // Fetch user + posts + todos sekaligus
  const [userRes, postsRes, todosRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { next: { revalidate: 60 } }),
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, { next: { revalidate: 60 } }),
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`, { next: { revalidate: 60 } }),
  ]);

  if (!userRes.ok) throw new Error('Gagal mengambil data user');

  const user: User = await userRes.json();
  const posts: Post[] = await postsRes.json();
  const todos: Todo[] = await todosRes.json();

  return { user, posts, todos };
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const { user } = await getUserData(id);
    return {
      title: `${user.name} — User Detail`,
      description: `Profil ${user.name}, bekerja di ${user.company.name}`,
    };
  } catch {
    return { title: 'User tidak ditemukan' };
  }
}

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;

  const numId = parseInt(id);
  if (isNaN(numId) || numId < 1 || numId > 10) notFound();

  const { user, posts, todos } = await getUserData(id);

  const completedTodos = todos.filter((t) => t.completed);
  const pendingTodos = todos.filter((t) => !t.completed);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/users" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← Kembali ke daftar
      </Link>

      {/* Card utama */}
      <div className="border border-gray-200 rounded-lg p-6 mb-4">
        <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
        <p className="text-gray-500 mb-4">@{user.username}</p>
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div><span className="font-semibold text-gray-700">Email: </span><span className="text-gray-600">{user.email}</span></div>
          <div><span className="font-semibold text-gray-700">Phone: </span><span className="text-gray-600">{user.phone}</span></div>
          <div>
            <span className="font-semibold text-gray-700">Website: </span>
            <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{user.website}</a>
          </div>
        </div>
      </div>

      {/* Perusahaan */}
      <div className="border border-gray-200 rounded-lg p-6 mb-4">
        <h2 className="text-lg font-semibold mb-3">🏢 Perusahaan</h2>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div><span className="font-semibold text-gray-700">Nama: </span><span className="text-gray-600">{user.company.name}</span></div>
          <div><span className="font-semibold text-gray-700">Tagline: </span><span className="text-gray-600 italic">"{user.company.catchPhrase}"</span></div>
        </div>
      </div>

      {/* Alamat */}
      <div className="border border-gray-200 rounded-lg p-6 mb-4">
        <h2 className="text-lg font-semibold mb-3">📍 Alamat</h2>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div><span className="font-semibold text-gray-700">Jalan: </span><span className="text-gray-600">{user.address.street}, {user.address.suite}</span></div>
          <div><span className="font-semibold text-gray-700">Kota: </span><span className="text-gray-600">{user.address.city}</span></div>
          <div><span className="font-semibold text-gray-700">Kode Pos: </span><span className="text-gray-600">{user.address.zipcode}</span></div>
        </div>
      </div>

      {/* Posts */}
      <div className="border border-gray-200 rounded-lg p-6 mb-4">
        <h2 className="text-lg font-semibold mb-3">📝 Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada post.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="border-l-2 border-blue-300 pl-3">
                <p className="font-medium text-sm capitalize">{post.title}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{post.body}</p>
              </div>
            ))}
            {posts.length > 5 && (
              <p className="text-sm text-gray-400">+{posts.length - 5} post lainnya</p>
            )}
          </div>
        )}
      </div>

      {/* Todos */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-3">
          ✅ Todos ({completedTodos.length} selesai, {pendingTodos.length} pending)
        </h2>
        {pendingTodos.length === 0 ? (
          <p className="text-green-600 text-sm">Semua todo sudah selesai! 🎉</p>
        ) : (
          <div className="flex flex-col gap-2">
            {pendingTodos.slice(0, 5).map((todo) => (
              <div key={todo.id} className="flex items-start gap-2 text-sm">
                <div className="w-4 h-4 mt-0.5 border border-gray-400 rounded flex-shrink-0" />
                <span className="text-gray-600">{todo.title}</span>
              </div>
            ))}
            {pendingTodos.length > 5 && (
              <p className="text-sm text-gray-400">+{pendingTodos.length - 5} todo pending lainnya</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}