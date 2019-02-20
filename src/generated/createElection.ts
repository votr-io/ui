/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateElectionRequest } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createElection
// ====================================================

export interface createElection_createElection_election {
  __typename: "Election";
  id: string;
}

export interface createElection_createElection {
  __typename: "CreateElectionResponse";
  election: createElection_createElection_election;
}

export interface createElection {
  createElection: createElection_createElection;
}

export interface createElectionVariables {
  input: CreateElectionRequest;
}
