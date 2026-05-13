import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersTable from '@/app/users/UsersTable';
import { mockUsers } from './fixtures';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

function expectVisible(name: string) {
  expect(screen.getAllByText(name).length).toBeGreaterThan(0);
}
function expectNotVisible(name: string) {
  expect(screen.queryAllByText(name).length).toBe(0);
}

describe('UsersTable', () => {

  //Test 1 
  it('menampilkan semua users', () => {
    render(<UsersTable users={mockUsers} />);

    expectVisible('Leanne Graham');
    expectVisible('Ervin Howell');
    expectVisible('Clementine Bauch');
  });

  it('menampilkan activity signals (posts, todos)', () => {
    render(<UsersTable users={mockUsers} />);

    // totalPosts Leanne = 10
    expect(screen.getAllByText('10').length).toBeGreaterThan(0);
    // completedTodos Leanne = 5
    expect(screen.getAllByText('5').length).toBeGreaterThan(0);
    // pendingTodos Leanne = 3
    expect(screen.getAllByText('3').length).toBeGreaterThan(0);
  });

  // ── Test 2
  it('filter users berdasarkan nama', async () => {
    const user = userEvent.setup();
    render(<UsersTable users={mockUsers} />);

    const input = screen.getByPlaceholderText('Cari nama atau email...');
    await user.type(input, 'Leanne');

    expectVisible('Leanne Graham');
    expectNotVisible('Ervin Howell');
    expectNotVisible('Clementine Bauch');
  });

  it('memfilter users berdasarkan email', async () => {
    const user = userEvent.setup();
    render(<UsersTable users={mockUsers} />);

    const input = screen.getByPlaceholderText('Cari nama atau email...');
    await user.type(input, 'shanna@melissa');

    expectVisible('Ervin Howell');
    expectNotVisible('Leanne Graham');
  });

  // ── Test 3
  it('filter "Ada Pending" hanya menampilkan user yang punya pending todos', async () => {
    const user = userEvent.setup();
    render(<UsersTable users={mockUsers} />);

    await user.click(screen.getByRole('button', { name: 'Ada Pending' }));

    // User 1 (pending: 3) dan User 2 (pending: 8) harus muncul
    expectVisible('Leanne Graham');
    expectVisible('Ervin Howell');
    // User 3 (pending: 0) tidak boleh muncul
    expectNotVisible('Clementine Bauch');
  });

  it('filter "Belum Ada yang Selesai" hanya menampilkan user tanpa completed todos', async () => {
    const user = userEvent.setup();
    render(<UsersTable users={mockUsers} />);

    await user.click(screen.getByRole('button', { name: 'Belum Ada yang Selesai' }));

    // Hanya User 2 (completedTodos: 0) yang muncul
    expectVisible('Ervin Howell');
    expectNotVisible('Leanne Graham');
    expectNotVisible('Clementine Bauch');
  });

  // ── Test 4
  it('menampilkan pesan kosong ketika tidak ada hasil search', async () => {
    const user = userEvent.setup();
    render(<UsersTable users={mockUsers} />);

    const input = screen.getByPlaceholderText('Cari nama atau email...');
    await user.type(input, 'xyzxyzxyz');

    // getAllByText karena muncul di desktop table DAN mobile cards
    expect(screen.getAllByText(/Tidak ada user yang cocok/).length).toBeGreaterThan(0);
  });

  it('tombol reset filter berfungsi', async () => {
    const user = userEvent.setup();
    render(<UsersTable users={mockUsers} />);

    // Ketik tidak ada hasilnya
    const input = screen.getByPlaceholderText('Cari nama atau email...');
    await user.type(input, 'xyzxyzxyz');

    // Klik reset — ada 2 tombol (desktop+mobile), klik yang pertama
    await user.click(screen.getAllByRole('button', { name: /Reset filter/ })[0]);

    // Semua user harus muncul lagi
    expectVisible('Leanne Graham');
    expectVisible('Ervin Howell');
  });

  // ── Test 5:
  it('menampilkan jumlah user yang benar', () => {
    render(<UsersTable users={mockUsers} />);
    expect(screen.getByText(/Menampilkan 3 dari 3 users/)).toBeInTheDocument();
  });

});