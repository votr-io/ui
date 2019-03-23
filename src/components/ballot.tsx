import React, { useMemo, useRef, useEffect } from "react";
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
import chroma from "chroma-js";
import { useGesture } from "react-with-gesture";
import { useSpring, animated, config, interpolate } from "react-spring";
// @ts-ignore no typings =(
import { add, scale } from "vec-la";

const gradient = chroma.scale([gradient_dark, gradient_light]);

export interface BallotProps {
  candidates: Candidate[];
  votes: string[];
  onChange: (votes: string[]) => void;
}

type Coordinates = [number, number];

type DraggableCardProps = CandidateCardProps & {
  position: Coordinates;
  // onDragStart: (coords: Coordinates) => void;
  onChangePosition: (coords: Coordinates) => void;
  // onRelease: (coords: Coordinates) => void;
};

const DraggableCard: React.FC<DraggableCardProps> = ({
  position,
  // onDragStart,
  onChangePosition,
  // onRelease,
  ...props
}) => {
  console.log("render");
  const [{ xy }, set] = useSpring(() => ({ xy: position }));
  const [{ elevation }, setElevation] = useSpring<{ elevation: number }>(
    () => ({
      elevation: 0,
      config: config.stiff
    })
  );
  const lastValue = useRef(position);
  const isDragging = useRef(false);
  const bind = useGesture(({ down, delta }) => {
    console.log(down, delta);
    const value = delta.map((v, i) => v + lastValue.current[i]) as Coordinates;
    console.log(value);
    if (!isDragging.current && down) {
      isDragging.current = true;
      setElevation({ elevation: 1 });
    }
    // onChangePosition(value);
    set({
      xy: value,
      // @ts-ignore these types kind of suck
      immediate: down
    });
    if (!down) {
      isDragging.current = false;
      lastValue.current = value;
      setElevation({ elevation: 0 });
    }
    return value;
  });

  const transform = interpolate(
    [
      // @ts-ignore lib types are wrong here =(
      xy.interpolate((x: number, y: number) => {
        return `translate(${x}px, ${y}px)`;
      }),
      elevation.interpolate(v => `scale(${1 + v * 0.1})`)
    ],
    (translate, scale) => `${translate} ${scale}`
  );

  return (
    <div style={{ position: "relative", margin: CARD_MARGIN }}>
      <Placeholder style={{ opacity: elevation }} />
      <animated.div
        {...bind()}
        style={{
          userSelect: "none",
          cursor: "grab",
          zIndex: elevation.interpolate(v => 1 + v * 10),
          opacity: elevation.interpolate(v => 1 - 0.2 * v),
          transform
        }}
      >
        <CandidateCard {...props} />
      </animated.div>
    </div>
  );
};

export const Ballot: React.FC<BallotProps> = ({
  candidates,
  votes,
  onChange
}) => {
  const idMap = useMemo(() => {
    return candidates.reduce(
      (idMap, candidate) => {
        idMap[candidate.id] = candidate;
        return idMap;
      },
      {} as Record<string, Candidate>
    );
  }, [candidates]);
  const candidateIds = Object.keys(idMap);
  const offBallot = candidateIds
    .filter(id => !votes.includes(id))
    .map(id => idMap[id]);
  const onBallot = votes.map<Candidate>(id => idMap[id]);

  return (
    <Flex flexDirection="row" flex="1 0 auto">
      <Flex flexDirection="column" flex="1" p="8px 16px">
        <Flex
          pb="16px"
          justifyContent="center"
          flex="0 0 auto"
          style={{ borderBottom: `1px solid ${divider.css()}` }}
        >
          <Subtitle>Candidates</Subtitle>
        </Flex>
        <VoteContainer>
          {offBallot.map((candidate, i) => {
            return (
              <DraggableCard
                position={[0, 0]}
                key={i}
                candidate={candidate}
                // borderColor={desaturated_gradient(
                //   i / (election.candidates.length - 1)
                // ).css()}
              />
            );
          })}
        </VoteContainer>
      </Flex>
      <Flex flexDirection="column" flex="2" p="8px 16px">
        <Flex pb="16px" justifyContent="center" flex="0 0 auto">
          <Subtitle>Ballot</Subtitle>
        </Flex>
        <Flex flexDirection="column" flex="1">
          <CandidateContainer>
            {onBallot.map((candidate, i) => (
              <CandidateCard
                key={i}
                candidate={candidate}
                // borderColor={desaturated_gradient(
                //   i / (election.candidates.length - 1)
                // ).css()}
              />
            ))}
          </CandidateContainer>
        </Flex>
      </Flex>
    </Flex>
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

const Placeholder = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 2px dashed black;
  border-radius: 4px;
`;
