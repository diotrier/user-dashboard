// __tests__/UserDetailCard.test.tsx

import { render, screen } from '@testing-library/react';
import UserDetailCard from '@/components/UserDetailCard';
import { mockUsers, mockPosts, mockTodos } from './fixtures';

const mockUser = mockUsers[0]; // Leanne Graham

describe('UserDetailCard', () => {

  // ── Test 1: Render data user ──────────────────────────
  it('menampilkan informasi dasar user', () => {
    render(<UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />);

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('@Bret')).toBeInTheDocument();
    expect(screen.getByText('sincere@april.biz')).toBeInTheDocument();
    expect(screen.getByText('111-222-3333')).toBeInTheDocument();
  });

  it('menampilkan informasi perusahaan', () => {
    render(<UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />);

    expect(screen.getByTestId('company-section')).toBeInTheDocument();
    expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument();
    expect(screen.getByText('Multi-layered client-server neural-net')).toBeInTheDocument();
  });

  it('menampilkan alamat', () => {
    render(<UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />);

    expect(screen.getByTestId('address-section')).toBeInTheDocument();
    expect(screen.getByText(/Kulas Light/)).toBeInTheDocument();
    expect(screen.getByText('Gwenborough')).toBeInTheDocument();
  });

  // ── Test 2: Posts ─────────────────────────────────────
  it('menampilkan section posts', () => {
    render(<UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />);

    expect(screen.getByTestId('posts-section')).toBeInTheDocument();
    expect(screen.getByText('Post pertama')).toBeInTheDocument();
    expect(screen.getByText('Post kedua')).toBeInTheDocument();
  });

  it('menampilkan pesan kosong jika tidak ada posts', () => {
    render(<UserDetailCard user={mockUser} posts={[]} todos={mockTodos} />);

    expect(screen.getByText('Belum ada post.')).toBeInTheDocument();
  });

  // ── Test 3: Todos ─────────────────────────────────────
  it('menampilkan section todos dengan jumlah yang benar', () => {
    render(<UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />);

    // 1 completed, 1 pending dari mockTodos
    expect(screen.getByText(/1 selesai, 1 pending/)).toBeInTheDocument();
  });

  it('hanya menampilkan todo yang pending', () => {
    render(<UserDetailCard user={mockUser} posts={mockPosts} todos={mockTodos} />);

    // 'Cuci motor' adalah pending todo
    expect(screen.getByText('Cuci motor')).toBeInTheDocument();
    // 'Beli susu' adalah completed, tidak ditampilkan di list pending
    expect(screen.queryByText('Beli susu')).not.toBeInTheDocument();
  });

  // ── Test 4: Edge cases ────────────────────────────────
  it('handle todos kosong', () => {
    render(<UserDetailCard user={mockUser} posts={mockPosts} todos={[]} />);

    expect(screen.getByText(/0 selesai, 0 pending/)).toBeInTheDocument();
  });

});