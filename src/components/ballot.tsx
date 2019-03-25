import React, {
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useState
} from "react";
import { Candidate } from "./types";
import { Flex } from "@rebass/grid/emotion";
import styled from "@emotion/styled";
import { makeShadow, divider, gradient_dark, gradient_light } from "./styles";
import { Subtitle } from "./typography";
import {
  CandidateCard,
  CandidateCardProps,
  CARD_MARGIN
} from "./candidateCard";
import chroma, { bind } from "chroma-js";
// @ts-ignore no typings =(
import { add, scale } from "vec-la";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided
} from "react-beautiful-dnd";

const gradient = chroma.scale([gradient_dark, gradient_light]);

export interface BallotProps {
  candidates: Candidate[];
  votes: string[];
  onChange: (votes: string[]) => void;
}

type DraggableCandidateCardProps = CandidateCardProps & {
  index: number;
};
const DraggableCandidateCard: React.FC<DraggableCandidateCardProps> = ({
  index,
  ...props
}) => {
  return (
    <Draggable draggableId={props.candidate.id} index={index}>
      {(provided, { isDragging, isDropAnimating }) => {
        return (
          <Flex
            flexDirection="row"
            justifyContent="center"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              margin: `${CARD_MARGIN}px 0`,
              ...provided.draggableProps.style
            }}
          >
            <CandidateCard
              className={isDragging && !isDropAnimating ? "dragging" : ""}
              flex="1 1 0%"
              {...props}
            />
          </Flex>
        );
      }}
    </Draggable>
  );
};

export const Ballot: React.FC<BallotProps> = ({
  candidates,
  votes,
  onChange
}) => {
  const candidatesById = useMemo(() => {
    return candidates.reduce(
      (idMap, candidate) => {
        idMap[candidate.id] = candidate;
        return idMap;
      },
      {} as Record<string, Candidate>
    );
  }, [candidates]);
  const [bank, setBank] = useState(
    candidates.map(c => c.id).filter(id => !votes.includes(id))
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { draggableId, destination, source } = result;
      if (destination == null) {
        return;
      }
      let nextBank = bank;
      let nextVotes = votes;
      if (source.droppableId === "bank") {
        nextBank = [
          ...nextBank.slice(0, source.index),
          ...nextBank.slice(source.index + 1)
        ];
      } else {
        nextVotes = [
          ...nextVotes.slice(0, source.index),
          ...nextVotes.slice(source.index + 1)
        ];
      }
      if (destination.droppableId === "bank") {
        nextBank = [
          ...nextBank.slice(0, destination.index),
          draggableId,
          ...nextBank.slice(destination.index)
        ];
      } else {
        nextVotes = [
          ...nextVotes.slice(0, destination.index),
          draggableId,
          ...nextVotes.slice(destination.index)
        ];
      }
      if (nextVotes !== votes) {
        onChange(nextVotes);
      }
      if (nextBank !== bank) {
        setBank(nextBank);
      }
    },
    [votes, bank, onChange, setBank]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex flexDirection="row" flex="1 1 auto">
        <Flex flexDirection="column" flex="1 1 0%" p="8px 16px">
          <Flex pb="16px" justifyContent="center" flex="0 0 auto">
            <Subtitle>Candidates</Subtitle>
          </Flex>
          <Droppable droppableId="bank">
            {provided => (
              <VoteContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {bank.map((id, i) => {
                  const candidate = candidatesById[id];
                  return (
                    <DraggableCandidateCard
                      key={id}
                      index={i}
                      candidate={candidate}
                    />
                  );
                })}
                {provided.placeholder}
              </VoteContainer>
            )}
          </Droppable>
        </Flex>
        <Flex flexDirection="column" flex="1 1 0%" p="8px 16px">
          <Flex pb="16px" justifyContent="center" flex="0 0 auto">
            <Subtitle>Ballot</Subtitle>
          </Flex>
          <Droppable droppableId="ballot">
            {provided => (
              <CandidateContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {votes.map((id, i) => {
                  const candidate = candidatesById[id];
                  return (
                    <DraggableCandidateCard
                      key={id}
                      index={i}
                      candidate={candidate}
                      borderColor={gradient((i + 1) / votes.length).css()}
                    />
                  );
                })}
                {provided.placeholder}
              </CandidateContainer>
            )}
          </Droppable>
        </Flex>
      </Flex>
    </DragDropContext>
  );
};

const VoteContainer = styled(Flex)`
  flex-direction: column;
  flex: 1 0 auto;
  padding: 16px;
`;

const CandidateContainer = styled(VoteContainer)`
  ${makeShadow(2).inset}
  border-radius: 2px;
`;
