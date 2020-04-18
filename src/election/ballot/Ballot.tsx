import React, { useState, useCallback, useMemo } from "react";
import {
  GetElection_election,
  GetElection_election_candidates
} from "../generated/GetElection";
import {
  DropResult,
  ResponderProvided,
  DragDropContext,
  Droppable,
  Draggable
} from "react-beautiful-dnd";
import { useSpring } from "react-spring";
import { Page } from "../../components/Page";
import { Flex } from "@rebass/grid/emotion";
import { Typography, Grid, Button } from "@material-ui/core";
import { theme } from "../../theme";
import {
  CandidateCard,
  CandidateCardProps
} from "../../components/CandidateCard";
import styled from "@emotion/styled";

enum DropTargets {
  candidates = "candidates",
  ballot = "ballot"
}

type BallotState = Record<DropTargets, string[]>;

export interface BallotProps {
  election: GetElection_election;
}

export const Ballot: React.FC<BallotProps> = ({ election }) => {
  const candidatesById = useMemo(
    () =>
      election.candidates.reduce((candidatesById, candidate) => {
        candidatesById[candidate.id] = candidate;
        return candidatesById;
      }, {} as Record<string, GetElection_election_candidates>),
    [election]
  );
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
    <DragDropContext
      onDragStart={() => setDragging(true)}
      onDragEnd={onDragEnd}
    >
      <Page header>
        <Flex flexDirection="column" flex="1 0 auto">
          <Flex flexDirection="column" marginBottom={`${theme.spacing(3)}px`}>
            <Typography variant="h4">{election.name}</Typography>
            <Typography variant="body2">{election.description}</Typography>
          </Flex>
          <DragDropContext onDragEnd={onDragEnd}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Droppable droppableId={DropTargets.candidates}>
                  {provided => (
                    <DndColumn
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <DndHeader variant="body1" align="center">
                        Candidates
                      </DndHeader>
                      {ballotState.candidates.map((candidateId, i) => (
                        <DraggableCard
                          key={candidateId}
                          index={i}
                          currentList={DropTargets.candidates}
                          candidate={candidatesById[candidateId]}
                        ></DraggableCard>
                      ))}
                      {provided.placeholder}
                    </DndColumn>
                  )}
                </Droppable>
              </Grid>
              <Grid item xs={6}>
                <Droppable droppableId={DropTargets.ballot}>
                  {provided => (
                    <DndColumn
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <DndHeader variant="body1" align="center">
                        Your Ballot
                      </DndHeader>
                      {ballotState.ballot.map((candidateId, i) => (
                        <DraggableCard
                          key={candidateId}
                          index={i}
                          currentList={DropTargets.ballot}
                          candidate={candidatesById[candidateId]}
                        ></DraggableCard>
                      ))}
                      {provided.placeholder}
                    </DndColumn>
                  )}
                </Droppable>
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
    </DragDropContext>
  );

  // return (
  //   <DragDropContext
  //     onDragStart={() => setDragging(true)}
  //     onDragEnd={onDragEnd}
  //   >
  //     <Flex flex="1 0 auto" flexDirection="column">
  //       <Flex
  //         backgroundColor={theme.palette.background.paper}
  //         p={theme.spacing(2)}
  //       >
  //         <Flex
  //           flex={`0 1 ${theme.breakpoints.values.lg}px`}
  //           mx="auto"
  //           flexDirection="column"
  //         >
  //           <Typography variant="h4">{election.name}</Typography>
  //           <Typography variant="subtitle1">{election.description}</Typography>
  //         </Flex>
  //       </Flex>
  //       <Scrollable>
  //         <Flex
  //           flex={`0 1 ${theme.breakpoints.values.lg}px`}
  //           mx="auto"
  //           p={theme.spacing(2)}
  //         >
  //           <AnimatedFlex
  //             flex="1 1 0%"
  //             flexDirection="column"
  //             marginRight={`${theme.spacing(2)}px`}
  //             style={{
  //               opacity: springProps.candidatesHidden.interpolate(i => 1 - i),
  //               transform: springProps.candidatesHidden.interpolate(i =>
  //                 i === 0 ? undefined : `translateX(-${(i * 100) / 6}vw)`
  //               )
  //             }}
  //           >
  //             <Scrollable flexDirection="column" flex="1 1 0%">
  //               <Typography variant="h6" align="center">
  //                 Candidates
  //               </Typography>
  //               <Droppable droppableId={DropTargets.candidates}>
  //                 {provided => (
  //                   <CandidateList
  //                     flexDirection="column"
  //                     flex="1 1 0%"
  //                     ref={provided.innerRef}
  //                     {...provided.droppableProps}
  //                   >
  //                     {ballotState.candidates.map((id, i) => {
  //                       const candidate = election.candidates.find(
  //                         c => c.id === id
  //                       );
  //                       if (candidate == null) {
  //                         return null;
  //                       }
  //                       return (
  //                         <CandidateCard
  //                           key={candidate.id}
  //                           candidate={candidate}
  //                           index={i}
  //                           currentList={DropTargets.candidates}
  //                           isAnyDragging={isDragging}
  //                           disabled={isConfirming}
  //                         ></CandidateCard>
  //                       );
  //                     })}
  //                     {provided.placeholder}
  //                   </CandidateList>
  //                 )}
  //               </Droppable>
  //             </Scrollable>
  //           </AnimatedFlex>
  //           <AnimatedFlex
  //             flex="2 2 0%"
  //             flexDirection="column"
  //             marginLeft={`${theme.spacing(2)}px`}
  //             style={{
  //               transform: springProps.candidatesHidden.interpolate(i =>
  //                 i === 0 ? undefined : `translateX(-${(i * 100) / 6}vw)`
  //               )
  //             }}
  //           >
  //             <Typography variant="h6" align="center">
  //               Your Ballot
  //             </Typography>
  //             <Droppable droppableId={DropTargets.ballot}>
  //               {provided => (
  //                 <BallotCardWrapper>
  //                   <BallotCard
  //                     square
  //                     ref={provided.innerRef}
  //                     {...provided.droppableProps}
  //                   >
  //                     {ballotState.ballot.map((id, i) => {
  //                       const candidate = election.candidates.find(
  //                         c => c.id === id
  //                       );
  //                       if (candidate == null) {
  //                         return null;
  //                       }
  //                       return (
  //                         <CandidateCard
  //                           key={candidate.id}
  //                           candidate={candidate}
  //                           index={i}
  //                           currentList={DropTargets.ballot}
  //                           isAnyDragging={isDragging}
  //                           disabled={isConfirming}
  //                         ></CandidateCard>
  //                       );
  //                     })}
  //                     {provided.placeholder}
  //                   </BallotCard>
  //                   <FloatingButton>
  //                     <Button
  //                       variant="contained"
  //                       color="primary"
  //                       disabled={ballotState.ballot.length === 0}
  //                       onClick={submitBallot}
  //                     >
  //                       {isConfirming ? "Confirm" : "Submit"}
  //                     </Button>
  //                   </FloatingButton>
  //                 </BallotCardWrapper>
  //               )}
  //             </Droppable>
  //           </AnimatedFlex>
  //         </Flex>
  //       </Scrollable>
  //     </Flex>
  //   </DragDropContext>
  // );
};

const DraggableCard: React.FC<CandidateCardProps & {
  index: number;
  currentList: DropTargets;
  disabled?: boolean;
}> = ({ index, candidate, disabled, currentList }) => {
  return (
    <Draggable
      draggableId={candidate.id}
      index={index}
      isDragDisabled={disabled}
    >
      {(provided, snapshot) => {
        const isActivelyDragging =
          snapshot.isDragging && !snapshot.isDropAnimating;
        const destination = snapshot.draggingOver || currentList;
        const isNumberVisible = currentList === DropTargets.ballot;

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style
            }}
          >
            <CandidateCard
              candidate={candidate}
              rank={isNumberVisible ? index + 1 : undefined}
            ></CandidateCard>
          </div>
        );
      }}
    </Draggable>
  );
};

const DndHeader = styled(Typography)`
  padding-bottom: ${theme.spacing(1)}px;
  margin-bottom: ${theme.spacing(1)}px;
  font-weight: 200 !important;
`;

const DndColumn = styled.div`
  /* flex-direction: column; */
  /* flex: 1 1 0%; */
  padding: ${theme.spacing(1)}px;
  border: 0.5px solid ${theme.palette.divider};
  border-radius: 2px;
  height: 100%;
  box-sizing: border-box;
  /* margin: ${theme.spacing(1)}px; */
`;
