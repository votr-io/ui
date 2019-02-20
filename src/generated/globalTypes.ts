/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Possible statuses an election can be in.
 * Transitions only go in one direction.  There's no going back.
 */
export enum ElectionStatus {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
  PENDING = "PENDING",
  TALLYING = "TALLYING"
}

export interface stCreateCandidateInput {
  name: string;
  description?: string | null;
}

export interface CreateElectionRequest {
  name: string;
  description: string;
  candidates: CreateCandidateInput[];
  email?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
