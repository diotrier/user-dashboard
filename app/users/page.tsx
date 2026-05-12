// app/users/page.tsx

import { User, Post, Todo, EnrichedUser } from '@/types';
import UsersTable from './UsersTable';

async function getData() {
  // Fetch 3 API secara paralel — lebih cepat!
  const [usersRes, postsRes, todosRes] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/users', { next: { revalidate: 60 } }),
    fetch('https://jsonplaceholder.typicode.com/posts', { next: { revalidate: 60 } }),
    fetch('https://jsonplaceholder.typicode.com/todos', { next: { revalidate: 60 } }),
  ]);

  if (!usersRes.ok || !postsRes.ok || !todosRes.ok) {
    throw new Error('Gagal mengambil data');
  }

  const users: User[] = await usersRes.json();
  const posts: Post[] = await postsRes.json();
  const todos: Todo[] = await todosRes.json();

  // Gabungkan data: hitung aktivitas tiap user
  const enrichedUsers: EnrichedUser[] = users.map((user) => {
    const userPosts = posts.filter((p) => p.userId === user.id);
    const userTodos = todos.filter((t) => t.userId === user.id);

    return {
      ...user,                                              // semua data user asli
      totalPosts: userPosts.length,                        // jumlah post
      completedTodos: userTodos.filter((t) => t.completed).length,  // todo selesai
      pendingTodos: userTodos.filter((t) => !t.completed).length,   // todo belum
    };
  });

  return enrichedUsers;
}

export default async function UsersPage() {
  const users = await getData();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Daftar Users</h1>
      <UsersTable users={users} />
    </main>
  );
}