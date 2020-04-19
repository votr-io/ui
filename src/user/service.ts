import { sdk } from '../graphql/sdk';
import { User as GqlUser } from '../graphql/generated/sdk';

/**
 * I'm not 100% if this is justified for a project of this size.
 *
 * The idea behind this "Service" is to abstract away any GQL types/queries/mutations
 * to achieve the following:
 * - create an extra layer of abstraction to protect against API changes
 * - remove nested types (ie. response.mutationName.OutputType.....)
 * - simplify types that are "T | undefined | null"
 */

export interface User {
  id: string;
  //can only see your own email, other users emails will not be returned by the server
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
  return toUser(response.login.user);
}

//helper to deal with gql types having stuff like "T | undefined | null"
function toUser(gqlUser: Pick<GqlUser, 'id' | 'email'>): User {
  return {
    ...gqlUser,
    email: gqlUser.email || null,
  };
}
