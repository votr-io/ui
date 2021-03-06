import { useQuery } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography
} from "@material-ui/core";
import { Flex } from "@rebass/grid/emotion";
import { loader } from "graphql.macro";
import React, { useCallback, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided
} from "react-beautiful-dnd";
import { RouteComponentProps } from "react-router";
import { theme } from "../theme";
import {
  GetElection,
  GetElectionVariables,
  GetElection_getElections_elections,
  GetElection_getElections_elections_candidates
} from "./generated/GetElection";
import { useSpring, animated } from "react-spring";

const getElection = loader("./getElection.gql");

// Depending on election status, will be ballot, awaiting results or results
export const ElectionPage: React.FC<RouteComponentProps<{
  electionId: string;
}>> = props => {
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
  const [isDragging, setDragging] = useState(false);
  const [isConfirming, setConfirming] = useState(false);

  const onDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      const { source, destination, draggableId } = result;
      setDragging(false);
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

  const springProps = useSpring({ candidatesHidden: isConfirming ? 1 : 0 });

  const submitBallot = () => {
    setConfirming(!isConfirming);
  };

  return (
    <Page header>
      <Flex flexDirection="column" flex="1 0 auto">
        <Flex flexDirection="column" marginBottom={`${theme.spacing(3)}px`}>
          <Typography variant="h4">{election.name}</Typography>
          <Typography variant="body2">{election.description}</Typography>
        </Flex>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DndColumn>
                <DndHeader variant="body1" align="center">
                  Candidates
                </DndHeader>
                {election.candidates.slice(3).map(candidate => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                  ></CandidateCard>
                ))}
              </DndColumn>
            </Grid>
            <Grid item xs={6}>
              <DndColumn>
                <DndHeader variant="body1" align="center">
                  Your Ballot
                </DndHeader>
                {election.candidates.slice(0, 3).map((candidate, i) => (
                  <CandidateCard
                    key={candidate.id}
                    rank={i + 1}
                    candidate={candidate}
                  ></CandidateCard>
                ))}
              </DndColumn>
            </Grid>
          </Grid>
        </DragDropContext>
        <Flex
          flex="1 0 auto"
          alignItems="flex-end"
          justifyContent="flex-end"
          style={{ position: "sticky", bottom: theme.spacing(2) }}
          marginTop={`${theme.spacing(2)}px`}
          paddingRight={`${theme.spacing(1)}px`}
        >
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Flex>
      </Flex>
    </Page>
  );

  return (
    <DragDropContext
      onDragStart={() => setDragging(true)}
      onDragEnd={onDragEnd}
    >
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
        <Scrollable>
          <Flex
            flex={`0 1 ${theme.breakpoints.values.lg}px`}
            mx="auto"
            p={theme.spacing(2)}
          >
            <AnimatedFlex
              flex="1 1 0%"
              flexDirection="column"
              marginRight={`${theme.spacing(2)}px`}
              style={{
                opacity: springProps.candidatesHidden.interpolate(i => 1 - i),
                transform: springProps.candidatesHidden.interpolate(i =>
                  i === 0 ? undefined : `translateX(-${(i * 100) / 6}vw)`
                )
              }}
            >
              <Scrollable flexDirection="column" flex="1 1 0%">
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
                            isAnyDragging={isDragging}
                            disabled={isConfirming}
                          ></CandidateCard>
                        );
                      })}
                      {provided.placeholder}
                    </CandidateList>
                  )}
                </Droppable>
              </Scrollable>
            </AnimatedFlex>
            <AnimatedFlex
              flex="2 2 0%"
              flexDirection="column"
              marginLeft={`${theme.spacing(2)}px`}
              style={{
                transform: springProps.candidatesHidden.interpolate(i =>
                  i === 0 ? undefined : `translateX(-${(i * 100) / 6}vw)`
                )
              }}
            >
              <Typography variant="h6" align="center">
                Your Ballot
              </Typography>
              <Droppable droppableId={DropTargets.ballot}>
                {provided => (
                  <BallotCardWrapper>
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
                            isAnyDragging={isDragging}
                            disabled={isConfirming}
                          ></CandidateCard>
                        );
                      })}
                      {provided.placeholder}
                    </BallotCard>
                    <FloatingButton>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={ballotState.ballot.length === 0}
                        onClick={submitBallot}
                      >
                        {isConfirming ? "Confirm" : "Submit"}
                      </Button>
                    </FloatingButton>
                  </BallotCardWrapper>
                )}
              </Droppable>
            </AnimatedFlex>
          </Flex>
        </Scrollable>
      </Flex>
    </DragDropContext>
  );
};

const Scrollable = styled(Flex)`
  overflow: auto;
`;

const AnimatedFlex = animated(Flex);

const FloatingButton = styled.div`
  position: absolute;
  bottom: ${theme.spacing(2)}px;
  right: ${theme.spacing(2)}px;
`;

const CandidateList = styled(Flex)`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-top: ${theme.spacing(1)}px;
  padding: ${theme.spacing(2)}px;
  overflow: auto;
`;

const BallotCardWrapper = styled(Flex)`
  flex-direction: column;
  flex: 1 1 0%;
  position: relative;
  height: 100%;
`;

const BallotCard = styled(Card)`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  margin-top: ${theme.spacing(1)}px;
  overflow: auto;
  position: relative;
  padding: ${theme.spacing(2)}px calc(25% + ${theme.spacing(2)}px);
`;

const CandidateCard: React.FC<{
  candidate: GetElection_getElections_elections_candidates;
  index: number;
  currentList: DropTargets;
  isAnyDragging: boolean;
  disabled: boolean;
}> = ({ candidate, index, currentList, isAnyDragging, disabled }) => {
  return (
    <div>
      <Draggable
        draggableId={candidate.id}
        index={index}
        isDragDisabled={disabled}
      >
        {(provided, snapshot) => {
          const isActivelyDragging =
            snapshot.isDragging && !snapshot.isDropAnimating;
          const destination = snapshot.draggingOver || currentList;
          const destinationElevation =
            destination === DropTargets.ballot ? 0 : 2;
          const elevation = isActivelyDragging ? 4 : destinationElevation;

          const isNumberVisible =
            currentList === DropTargets.ballot && !isAnyDragging;

          // Put placement numbers on the ballot associated with their position, rather than attached to the cards

          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                marginBottom: 16,
                position: "relative",
                ...provided.draggableProps.style
              }}
            >
              <Flex
                alignItems="center"
                style={{
                  position: "absolute",
                  height: "100%",
                  right: "100%",
                  transition: "opacity cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s",
                  opacity: isNumberVisible ? 1 : 0,
                  userSelect: "none"
                }}
              >
                <Typography variant="h2">{index + 1}</Typography>
              </Flex>
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
