/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ElectionStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetElection
// ====================================================

export interface GetElection_getElections_elections_candidates {
  __typename: "Candidate";
  id: string;
  name: string;
  description: string | null;
}

export interface GetElection_getElections_elections {
  __typename: "Election";
  id: string;
  name: string;
  description: string;
  status: ElectionStatus;
  candidates: GetElection_getElections_elections_candidates[];
}

export interface GetElection_getElections {
  __typename: "GetElectionsResponse";
  elections: GetElection_getElections_elections[];
}

export interface GetElection {
  getElections: GetElection_getElections | null;
}

export interface GetElectionVariables {
  id: string;
}
