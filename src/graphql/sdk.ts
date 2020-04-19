import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/sdk';

const url = '/graphql';

const client = new GraphQLClient(url, {
  credentials: 'include',
});

export const sdk = getSdk(client);
