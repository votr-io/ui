export interface User {
  id: string;
  email?: string;
}

let _self: User | null = null;

export async function self(): Promise<User | null> {
  return _self;
}

export async function login(email: string, password: string) {
  //TODO: make network call to login

  if (password !== 'test') {
    throw new Error('bad password');
  }

  const user = {
    id: '123',
    email,
  };

  _self = user;
  return user;
}
