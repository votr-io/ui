import React from "react";
import { RouteComponentProps } from "react-router";
import { Grid, Typography } from "@material-ui/core";

// Depending on election status, will be ballot, awaiting results or results
export const ElectionPage: React.FC<
  RouteComponentProps<{ electionId: string }>
> = props => {
  return (
    <Grid item>
      <Typography variant="h1">
        View Election {props.match.params.electionId}
      </Typography>
    </Grid>
  );
};
