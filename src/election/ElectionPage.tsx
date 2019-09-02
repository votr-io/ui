import React from "react";
import { RouteComponentProps } from "react-router";
import { Grid, Typography } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import getElection from "./getElection.gql";
import { GetElection, GetElectionVariables } from "./generated/GetElection";

// Depending on election status, will be ballot, awaiting results or results
export const ElectionPage: React.FC<
  RouteComponentProps<{ electionId: string }>
> = props => {
  const {} = useQuery<GetElection, GetElectionVariables>(getElection);

  return (
    <Grid item>
      <Typography variant="h1">
        View Election {props.match.params.electionId}
      </Typography>
    </Grid>
  );
};
