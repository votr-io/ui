import React from "react";
import { RouteComponentProps } from "react-router";
import { Grid, Typography } from "@material-ui/core";

// Shows registration page, then success once you are registered
export const RegistrationPage: React.FC<
  RouteComponentProps<{ electionId: string }>
> = props => {
  return (
    <Grid item>
      <Typography variant="h1">
        Register for Election {props.match.params.electionId}
      </Typography>
    </Grid>
  );
};
