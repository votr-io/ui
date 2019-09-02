import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <Grid item direction="column" justify="center">
      <Typography variant="h1">VOTR</Typography>
      <Link to="/elections/create">Create An Election</Link>
    </Grid>
  );
};
