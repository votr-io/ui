import React, { useState, useContext, useEffect } from 'react';
import mockResponse from './mockElection';
import { RouteComponentProps } from 'react-router';
import { Ballot } from './ballot/Ballot';
import { Election } from '../election/service';
import * as ElectionService from '../election/service';
import { UserContext } from '../user/context';

// Depending on election status, will be ballot, awaiting results or results
export const ElectionPage: React.FC<RouteComponentProps<{
  electionId: string;
}>> = props => {
  const { electionId } = props.match.params;
  const [election, setElection] = useState<Election | null>(null);
  const [userState] = useContext(UserContext);

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

  if (!election) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {userState.user && userState.user.id === election.createdBy.id && (
        <a href={`/elections/${election.id}/admin`}>
          I'm the owner of this election, take me to the admin page.
        </a>
      )}
      <Ballot election={election}></Ballot>
    </div>
  );
};
