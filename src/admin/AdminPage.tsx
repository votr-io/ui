import React from "react";
import { RouteComponentProps } from "react-router";
import { Grid, Typography } from "@material-ui/core";

export const AdminPage: React.FC<
  RouteComponentProps<{ electionId: string }>
> = props => {
  return (
    <Grid item>
      <Typography variant="h1">
        Manage Election {props.match.params.electionId}
      </Typography>
    </Grid>
  );
};
