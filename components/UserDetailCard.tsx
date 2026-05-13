

import { User, Post, Todo } from '@/types';

interface Props {
  user: User;
  posts: Post[];
  todos: Todo[];
}

export default function UserDetailCard({ user, posts, todos }: Props) {
  const pendingTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div>
      
      <div data-testid="user-card">
        <h1>{user.name}</h1>
        <p>@{user.username}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>

      <div data-testid="company-section">
        <h2>Perusahaan</h2>
        <p>{user.company.name}</p>
        <p>{user.company.catchPhrase}</p>
      </div>

      <div data-testid="address-section">
        <h2>Alamat</h2>
        <p>{user.address.street}, {user.address.suite}</p>
        <p>{user.address.city}</p>
        <p>{user.address.zipcode}</p>
      </div>

      <div data-testid="posts-section">
        <h2>Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p>Belum ada post.</p>
        ) : (
          posts.slice(0, 5).map((post) => (
            <div key={post.id}>
              <p>{post.title}</p>
            </div>
          ))
        )}
      </div>

   
      <div data-testid="todos-section">
        <h2>Todos ({completedTodos.length} selesai, {pendingTodos.length} pending)</h2>
        {pendingTodos.slice(0, 5).map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
      </div>
    </div>
  );
}