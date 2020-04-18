import { sdk } from '../graphql/sdk';
import { User as GqlUser } from '../graphql/generated/sdk';

export interface User {
  id: string;
  email: string | null;
}

export async function self(): Promise<User | null> {
  const { self } = await sdk.self();
  if (!self) {
    return null;
  }
  return toUser(self);
}

export async function login(email: string, password: string): Promise<User> {
  const response = await sdk.login({ input: { email, password } });
  if (response.login.user) {
    console.log(
      'login mutation was successfull, but no user was on the response.  this should not happen.'
    );
  }
  return toUser(response.login.user);
}

//helper to deal with gql types having stuff like "T | undefined | null"
function toUser(gqlUser: Pick<GqlUser, 'id' | 'email'>): User {
  return {
    ...gqlUser,
    email: gqlUser.email || null,
  };
}
