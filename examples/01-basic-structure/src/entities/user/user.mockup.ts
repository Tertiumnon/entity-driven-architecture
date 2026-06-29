import { User } from './user.interface';

/**
 * Mock user data for testing and development
 */
export const mockUsers: User[] = [
  {
    id: 1,
    email: 'alice@example.com',
    name: 'Alice Johnson',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    email: 'bob@example.com',
    name: 'Bob Smith',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 3,
    email: 'charlie@example.com',
    name: 'Charlie Brown',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 4,
    email: 'diana@example.com',
    name: 'Diana Prince',
    createdAt: new Date('2024-04-05'),
  },
  {
    id: 5,
    email: 'eve@example.com',
    name: 'Eve Adams',
    createdAt: new Date('2024-05-12'),
  },
];

export const mockUser: User = mockUsers[0];
