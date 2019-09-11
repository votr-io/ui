import { useQuery } from "@apollo/react-hooks";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography
} from "@material-ui/core";
import { loader } from "graphql.macro";
import React, { useState, useCallback } from "react";
import { RouteComponentProps } from "react-router";
import {
  GetElection,
  GetElectionVariables,
  GetElection_getElections_elections,
  GetElection_getElections_elections_candidates
} from "./generated/GetElection";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided
} from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
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
      <Grid item container>
        <CircularProgress></CircularProgress>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid item container>
        <Typography variant="h6">Error</Typography>
        <Typography variant="body1">{error.message}</Typography>
      </Grid>
    );
  }

  if (data == null) {
    return (
      <Grid item container>
        <Typography variant="h6">Error</Typography>
        <Typography variant="body1">Why is data null?</Typography>
      </Grid>
    );
  }

  const [election] = data.getElections.elections;

  return <Ballot election={election}></Ballot>;
};

interface BallotState {
  candidates: string[];
  votes: string[];
}

const Ballot: React.FC<{
  election: GetElection_getElections_elections;
}> = ({ election }) => {
  const [ballotState, setBallotState] = useState<BallotState>({
    candidates: election.candidates.map(c => c.id),
    votes: []
  });

  const onDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      const { source, destination, draggableId } = result;
      if (destination == null) {
        return;
      }
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const src = source.droppableId as keyof BallotState;
      const dst = destination.droppableId as keyof BallotState;
      const nextState = {
        candidates: [...ballotState.candidates],
        votes: [...ballotState.votes]
      };
      nextState[src].splice(source.index, 1);
      nextState[dst].splice(destination.index, 0, draggableId);
      setBallotState(nextState);
    },
    [ballotState, setBallotState]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex flex="1 0 auto" flexDirection="column">
        <Flex
          backgroundColor={theme.palette.background.paper}
          p={theme.spacing(2)}
        >
          <Flex
            flex={`0 1 ${theme.breakpoints.values.lg}px`}
            mx="auto"
            flexDirection="column"
          >
            <Typography variant="h4">{election.name}</Typography>
            <Typography variant="subtitle1">{election.description}</Typography>
          </Flex>
        </Flex>
        <Flex flex="1 1 0%" style={{ overflow: "auto" }}>
          <Flex
            flex={`0 1 ${theme.breakpoints.values.lg}px`}
            mx="auto"
            p={theme.spacing(2)}
          >
            <Flex
              flex="1 1 0%"
              flexDirection="column"
              marginRight={`${theme.spacing(1)}px`}
            >
              <Flex flexDirection="column" flex="1 1 0%">
                <Typography variant="h6" align="center">
                  Candidates
                </Typography>
                <Droppable droppableId="candidates">
                  {provided => (
                    <CandidateList
                      flexDirection="column"
                      flex="1 1 0%"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {ballotState.candidates.map((id, i) => {
                        const candidate = election.candidates.find(
                          c => c.id === id
                        );
                        if (candidate == null) {
                          return null;
                        }
                        return (
                          <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                            index={i}
                          ></CandidateCard>
                        );
                      })}
                      {provided.placeholder}
                    </CandidateList>
                  )}
                </Droppable>
              </Flex>
            </Flex>
            <Flex
              flex="2 2 0%"
              flexDirection="column"
              marginLeft={`${theme.spacing(1)}px`}
            >
              <Typography variant="h6" align="center">
                Your Ballot
              </Typography>
              <Droppable droppableId="votes">
                {provided => (
                  <BallotCard
                    square
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {ballotState.votes.map((id, i) => {
                      const candidate = election.candidates.find(
                        c => c.id === id
                      );
                      if (candidate == null) {
                        return null;
                      }
                      return (
                        <CandidateCard
                          key={candidate.id}
                          candidate={candidate}
                          index={i}
                          flat
                        ></CandidateCard>
                      );
                    })}
                    {provided.placeholder}
                  </BallotCard>
                )}
              </Droppable>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </DragDropContext>
  );
};

const CandidateList = styled(Flex)`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-top: ${theme.spacing(1)}px;
  padding: ${theme.spacing(2)}px;
  overflow: auto;
`;

const BallotCard = styled(Card)`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  margin-top: ${theme.spacing(1)}px;
  overflow: auto;
  padding: ${theme.spacing(2)}px calc(25% + ${theme.spacing(2)}px);
`;

const CandidateCard: React.FC<{
  candidate: GetElection_getElections_elections_candidates;
  index: number;
  flat?: boolean;
}> = ({ candidate, index, flat }) => {
  return (
    <div>
      <Draggable draggableId={candidate.id} index={index}>
        {provided => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            elevation={flat ? 0 : 2}
            style={{
              marginBottom: 16,
              ...provided.draggableProps.style
            }}
            square
          >
            <CardContent>
              <Typography variant="h6">{candidate.name}</Typography>
              <Typography variant="body1" color="textSecondary">
                {candidate.description}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Draggable>
    </div>
  );
};
