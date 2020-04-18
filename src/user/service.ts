export interface User {
  id: string;
  email?: string;
}

export async function self(): Promise<User | null> {
  return null;
  return {
    id: '123',
    email: 'asfd@fake.com',
  };
}
