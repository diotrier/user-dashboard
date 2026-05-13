import { User, Post, Todo, EnrichedUser } from '@/types';
import UsersTable from './UsersTable';

async function getData() {
// await new Promise((resolve) => setTimeout(resolve, 3000));
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


  const enrichedUsers: EnrichedUser[] = users.map((user) => {
    const userPosts = posts.filter((p) => p.userId === user.id);
    const userTodos = todos.filter((t) => t.userId === user.id);

    return {
      ...user,                                              
      totalPosts: userPosts.length,                       
      completedTodos: userTodos.filter((t) => t.completed).length,  
      pendingTodos: userTodos.filter((t) => !t.completed).length,   
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