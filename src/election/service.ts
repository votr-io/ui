import { sdk } from '../graphql/sdk';

export enum ElectionStatus {
  Setup = 'SETUP',
  Open = 'OPEN',
  Tallying = 'TALLYING',
  Closed = 'CLOSED',
}

export interface Election {
  id: string;
  createdBy: {
    id: string;
  };
  name: string;
  description: string;
  status: ElectionStatus;
  candidates: Candidate[];
  voteCount: number;
  results?: any; //TODO: give this a type
}

export interface Candidate {
  id: string;
  name: string;
  description: string;
}

export interface UpsertElectionInput {
  id?: string;
  name: string;
  description: string;
  candidates: {
    name: string;
    description: string;
  }[];
}

export async function upsertElection(input: UpsertElectionInput): Promise<Election> {
  const response = sdk.upsertElection({ input });
  return (await response).upsertElection.election;
}

export async function getElection(id: string): Promise<Election | null> {
  const { election } = await sdk.getElection({ id });
  if (!election) {
    return null;
  }

  return election;
}

export async function startElection(electionId: string) {
  await sdk.startElection({ input: { electionId } });
}

export async function stopElection(electionId: string): Promise<Election> {
  const response = await sdk.stopElection({ input: { electionId } });
  return response.stopElection.election;
}

export async function castBallot(electionId: string, candidateIds: string[]) {
  await sdk.castBallot({ input: { electionId, candidateIds } });
}
