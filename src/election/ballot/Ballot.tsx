import React, { useState, useCallback, useMemo } from 'react';

import {
  DropResult,
  ResponderProvided,
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { useSpring } from 'react-spring';
import { Page } from '../../components/Page';
import { Flex } from '@rebass/grid/emotion';
import { Typography, Grid, Button } from '@material-ui/core';
import { theme } from '../../theme';
import { CandidateCard, CandidateCardProps } from '../../components/CandidateCard';
import styled from '@emotion/styled';
import { Election, Candidate } from '../service';

enum DropTargets {
  candidates = 'candidates',
  ballot = 'ballot',
}

const PADDING = theme.spacing(1);

type BallotState = Record<DropTargets, string[]>;

export interface BallotProps {
  election: Election;
  castBallot: (candidateIds: string[]) => void;
}

export const Ballot: React.FC<BallotProps> = ({ election, castBallot }) => {
  const candidatesById = useMemo(
    () =>
      election.candidates.reduce((candidatesById, candidate) => {
        candidatesById[candidate.id] = candidate;
        return candidatesById;
      }, {} as Record<string, Candidate>),
    [election]
  );
  const [ballotState, setBallotState] = useState<BallotState>({
    candidates: election.candidates.map(c => c.id),
    ballot: [],
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
        ballot: [...ballotState.ballot],
      };
      nextState[src].splice(source.index, 1);
      nextState[dst].splice(destination.index, 0, draggableId);
      setBallotState(nextState);
    },
    [ballotState, setBallotState]
  );

  const springProps = useSpring({ candidatesHidden: isConfirming ? 1 : 0 });

  const onSubmit = useCallback(() => {
    castBallot(ballotState.ballot);
  }, [castBallot, ballotState.ballot]);

  return (
    <DragDropContext onDragStart={() => setDragging(true)} onDragEnd={onDragEnd}>
      <Page header>
        <Flex flexDirection="column" flex="1 0 auto">
          <Flex flexDirection="column" marginBottom={`${theme.spacing(3)}px`}>
            <Typography variant="h4">{election.name}</Typography>
            <Typography variant="body2">{election.description}</Typography>
          </Flex>
          <DragDropContext onDragEnd={onDragEnd}>
            <DndWrapper>
              <Droppable droppableId={DropTargets.candidates}>
                {provided => (
                  <DndColumn ref={provided.innerRef} {...provided.droppableProps}>
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
              <Droppable droppableId={DropTargets.ballot}>
                {provided => (
                  <DndColumn ref={provided.innerRef} {...provided.droppableProps}>
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
            </DndWrapper>
          </DragDropContext>
          <Flex
            flex="1 0 auto"
            alignItems="flex-end"
            justifyContent="flex-end"
            style={{ position: 'sticky', bottom: theme.spacing(2) }}
            marginTop={`${theme.spacing(2)}px`}
            paddingRight={`${theme.spacing(1)}px`}
          >
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Submit
            </Button>
          </Flex>
        </Flex>
      </Page>
    </DragDropContext>
  );
};

const DraggableCard: React.FC<CandidateCardProps & {
  index: number;
  currentList: DropTargets;
  disabled?: boolean;
}> = ({ index, candidate, disabled, currentList }) => {
  return (
    <Draggable draggableId={candidate.id} index={index} isDragDisabled={disabled}>
      {(provided, snapshot) => {
        const isActivelyDragging = snapshot.isDragging && !snapshot.isDropAnimating;
        const destination = snapshot.draggingOver || currentList;
        const isNumberVisible = currentList === DropTargets.ballot;

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
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

const DndWrapper = styled(Flex)`
  flex: 1 0 auto;
  margin: -${PADDING}px;
`;

const DndHeader = styled(Typography)`
  padding-bottom: ${theme.spacing(1)}px;
  margin-bottom: ${theme.spacing(1)}px;
  font-weight: 200 !important;
`;

const DndColumn = styled.div`
  /* flex-direction: column; */
  flex: 1 1 0%;
  padding: ${theme.spacing(1)}px;
  margin: 0 ${PADDING}px;
  border: 0.5px solid ${theme.palette.divider};
  border-radius: 2px;
  box-sizing: border-box;
  /* margin: ${theme.spacing(1)}px; */
`;
