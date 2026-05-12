// __tests__/fixtures.ts
// Data palsu yang kita pakai di semua test

import { EnrichedUser, Post, Todo } from '@/types';

export const mockUsers: EnrichedUser[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'sincere@april.biz',
    phone: '111-222-3333',
    website: 'hildegard.org',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
    },
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
    totalPosts: 10,
    completedTodos: 5,
    pendingTodos: 3,
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'shanna@melissa.tv',
    phone: '444-555-6666',
    website: 'anastasia.net',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
    },
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
    totalPosts: 5,
    completedTodos: 0,
    pendingTodos: 8,
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'nathan@yesenia.net',
    phone: '777-888-9999',
    website: 'ramiro.info',
    address: {
      street: 'Douglas Extension',
      suite: 'Suite 847',
      city: 'McKenziehaven',
      zipcode: '59590-4157',
    },
    company: {
      name: 'Romaguera-Jacobson',
      catchPhrase: 'Face to face bifurcated interface',
      bs: 'e-enable strategic applications',
    },
    totalPosts: 0,
    completedTodos: 10,
    pendingTodos: 0,
  },
];

export const mockPosts: Post[] = [
  { userId: 1, id: 1, title: 'Post pertama', body: 'Isi post pertama' },
  { userId: 1, id: 2, title: 'Post kedua', body: 'Isi post kedua' },
];

export const mockTodos: Todo[] = [
  { userId: 1, id: 1, title: 'Beli susu', completed: true },
  { userId: 1, id: 2, title: 'Cuci motor', completed: false },
];