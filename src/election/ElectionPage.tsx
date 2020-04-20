import React, { useState, useContext, useEffect } from 'react';
import mockResponse from './mockElection';
import { RouteComponentProps, Redirect } from 'react-router';
import { Ballot } from './ballot/Ballot';
import { Election } from '../election/service';
import * as ElectionService from '../election/service';
import { ElectionStatus } from '../election/service';
import { UserContext } from '../user/context';
import { Page } from '../components/Page';

// Depending on election status, will be ballot, awaiting results or results
export const ElectionPage: React.FC<RouteComponentProps<{
  electionId: string;
}>> = props => {
  const { electionId } = props.match.params;

  const [userState] = useContext(UserContext);
  const [election, setElection] = useState<Election | null>(null);
  const [ballotCast, setBallotCast] = useState(false);

  useEffect(() => {
    //keep the mock data for erin
    if (electionId === 'dems') {
      setElection(mockResponse);
      return;
    }

    ElectionService.getElection(electionId)
      .then(election => {
        setElection(election);
      })
      .catch(e => {
        //TODO: real error handling
        console.log(e);
        alert('there was an error fetching the election, see logs for details');
      });
  }, [electionId]);

  const castBallot = (candidateIds: string[]) => {
    if (!election) {
      return;
    }

    ElectionService.castBallot(election.id, candidateIds)
      .then(() => {
        setBallotCast(true);
      })
      .catch(e => {
        //TODO: real error handling
        console.log(e);
        alert('there was an error casting ballot, see logs for details');
      });
  };

  /**
   * There should probably be a separate component for each of the
   * conditional branches that follow
   */

  if (!election) {
    return <div>loading...</div>;
  }

  if (election.status === ElectionStatus.Setup) {
    return <Redirect to={`/elections/${electionId}/admin`} />;
  }

  if (election.status === ElectionStatus.Open && ballotCast) {
    return (
      <Page header>
        <h1>Thanks for submitting your ballot!</h1>
        <p>
          Please come back to this page later to see the results once the election is
          over.
        </p>
        <p>TODO: prompt for email address to email election results</p>
        <p>Dev only: You can refresh the page to vote again.</p>
        {userState.user && userState.user.id === election.createdBy.id && (
          <a href={`/elections/${election.id}/admin`}>
            I'm the owner of this election, take me to the admin page.
          </a>
        )}
      </Page>
    );
  }

  if (election.status === ElectionStatus.Closed) {
    return (
      <Page header>
        <h1>This election is closed</h1>
        <p>
          The winner of {election.name} was {election.results.winner.name}
        </p>
      </Page>
    );
  }

  return (
    <div>
      <Ballot election={election} castBallot={castBallot}></Ballot>
    </div>
  );
};
