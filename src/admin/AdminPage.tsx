import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Typography, Button } from '@material-ui/core';
import { Page } from '../components/Page';
import { Flex } from '@rebass/grid/emotion';
import { theme } from '../theme';

import * as service from '../election/service';
import { Election, ElectionStatus } from '../election/service';

export const AdminPage: React.FC<RouteComponentProps<{ electionId: string }>> = props => {
  const { electionId } = props.match.params;
  const [election, setElection] = useState<Election | null>(null);

  useEffect(() => {
    (async () => {
      const election = await service.getElection(electionId);
      if (election == null) {
        //TODO: redirect to....where?
        alert(`404 - could not find election`);
        window.location.href = '/404';
        return;
      }

      setElection(election);
    })();
  }, [electionId]);

  const startElection = async () => {
    await service.startElection(electionId);
    setElection(election => {
      if (!election) return null;
      return {
        ...election,
        status: ElectionStatus.Open,
      };
    });
  };

  const stopElection = async () => {
    await service.stopElection(electionId);
    setElection(election => {
      if (!election) return null;
      return {
        ...election,
        status: ElectionStatus.Closed,
      };
    });
  };

  if (!election) {
    return <Page header>loading...</Page>;
  }

  return (
    <Page header>
      <Flex mb={theme.spacing(2)}>
        <Typography variant="h4">Manage Election</Typography>
      </Flex>

      <Flex mb={`${theme.spacing(1)}px`} flexDirection="column">
        <Typography variant="h6">Name</Typography>
        <Typography>{election.name}</Typography>

        <Typography variant="h6">Description</Typography>
        <Typography>{election.description}</Typography>

        <Typography variant="h6">Candidates</Typography>
        <ul>
          {election.candidates.map(candidate => (
            <li key={candidate.id}>{candidate.name}</li>
          ))}
        </ul>

        <Typography variant="h6">Status</Typography>
        <Typography>{election.status}</Typography>

        <Typography variant="h6">Number of Votes</Typography>
        <Typography>{election.voteCount}</Typography>

        {election.status === ElectionStatus.Setup && (
          <Button variant="contained" color="primary" onClick={startElection}>
            Start Election
          </Button>
        )}

        {election.status === ElectionStatus.Open && (
          <>
            <Button variant="contained" color="primary" onClick={stopElection}>
              Stop Election
            </Button>
            <a href={`/elections/${electionId}`}>Vote in this election!</a>
          </>
        )}

        {election.status === ElectionStatus.Closed && (
          <>
            <Typography variant="h6">Results</Typography>
            <pre>
              {election.results ? JSON.stringify(election.results) : 'no results'}
            </pre>
          </>
        )}
      </Flex>
    </Page>
  );
};
