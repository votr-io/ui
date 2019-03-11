/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateElectionRequest } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateElection
// ====================================================

export interface CreateElection_createElection_election {
  __typename: "Election";
  id: string;
}

export interface CreateElection_createElection {
  __typename: "CreateElectionResponse";
  election: CreateElection_createElection_election;
  adminToken: string | null;
}

export interface CreateElection {
  createElection: CreateElection_createElection;
}

export interface CreateElectionVariables {
  input: CreateElectionRequest;
}
