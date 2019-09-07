import React from "react";
import { RouteComponentProps } from "react-router";
import {
  Grid,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
  CardContent,
  Card,
  Box,
  Avatar,
  Paper
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { GetElection, GetElectionVariables } from "./generated/GetElection";
import { loader } from "graphql.macro";
import styled from "@emotion/styled";
import { theme } from "../theme";

const getElection = loader("./getElection.gql");

// Depending on election status, will be ballot, awaiting results or results
export const ElectionPage: React.FC<
  RouteComponentProps<{ electionId: string }>
> = props => {
  const { loading, error, data } = useQuery<GetElection, GetElectionVariables>(
    getElection,
    {
      variables: { id: props.match.params.electionId }
    }
  );

  if (loading) {
    return (
      <Grid item>
        <CircularProgress></CircularProgress>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid item>
        <Typography variant="h6">Error</Typography>
        <Typography variant="body1">{error.message}</Typography>
      </Grid>
    );
  }

  if (data == null) {
    return (
      <Grid item>
        <Typography variant="h6">Error</Typography>
        <Typography variant="body1">Why is data null?</Typography>
      </Grid>
    );
  }

  const [election] = data.getElections.elections;

  return (
    <Grid container item xs={12} direction="column">
      <Grid item>
        <Typography variant="h4">{election.name}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">{election.description}</Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item container xs={4} direction="column">
          <Box textAlign="center">
            <Typography variant="h6">Candidates</Typography>
          </Box>{" "}
          <Grid item>
            {election.candidates.map(candidate => (
              <Box key={candidate.id} m={2}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{candidate.name}</Typography>
                    <Typography variant="body1" color="textSecondary">
                      {candidate.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Grid>
        </Grid>
        <Grid item container xs={8} direction="column">
          <Box textAlign="center">
            <Typography variant="h6">Ballot</Typography>
          </Box>
          <Card>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};
