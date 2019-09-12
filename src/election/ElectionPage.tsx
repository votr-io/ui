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
  ResponderProvided,
  NotDraggingStyle,
  DraggableStateSnapshot,
  DraggingStyle
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

enum DropTargets {
  candidates = "candidates",
  ballot = "ballot"
}

type BallotState = Record<DropTargets, string[]>;

const Ballot: React.FC<{
  election: GetElection_getElections_elections;
}> = ({ election }) => {
  const [ballotState, setBallotState] = useState<BallotState>({
    candidates: election.candidates.map(c => c.id),
    ballot: []
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

      const src = source.droppableId as DropTargets;
      const dst = destination.droppableId as DropTargets;
      const nextState = {
        candidates: [...ballotState.candidates],
        ballot: [...ballotState.ballot]
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
              marginRight={`${theme.spacing(2)}px`}
            >
              <Flex flexDirection="column" flex="1 1 0%">
                <Typography variant="h6" align="center">
                  Candidates
                </Typography>
                <Droppable droppableId={DropTargets.candidates}>
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
                            currentList={DropTargets.candidates}
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
              marginLeft={`${theme.spacing(2)}px`}
            >
              <Typography variant="h6" align="center">
                Your Ballot
              </Typography>
              <Droppable droppableId={DropTargets.ballot}>
                {provided => (
                  <BallotCard
                    square
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {ballotState.ballot.map((id, i) => {
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
                          currentList={DropTargets.ballot}
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
  currentList: DropTargets;
}> = ({ candidate, index, currentList }) => {
  return (
    <div>
      <Draggable draggableId={candidate.id} index={index}>
        {(provided, snapshot) => {
          const isActivelyDragging =
            snapshot.isDragging && !snapshot.isDropAnimating;
          const destination = snapshot.draggingOver || currentList;
          const destinationElevation =
            destination === DropTargets.ballot ? 0 : 2;
          const elevation = isActivelyDragging ? 4 : destinationElevation;

          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                marginBottom: 16,
                ...provided.draggableProps.style
              }}
            >
              <Card
                elevation={elevation}
                style={{
                  transition:
                    "all cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s",
                  opacity: isActivelyDragging ? 0.7 : 1,
                  transform: isActivelyDragging ? "scale(1.1)" : undefined
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
            </div>
          );
        }}
      </Draggable>
    </div>
  );
};
