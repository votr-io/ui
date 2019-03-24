import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
  useLayoutEffect
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
import chroma from "chroma-js";
import { useGesture } from "react-with-gesture";
import {
  useSpring,
  animated,
  config,
  interpolate,
  useTransition
} from "react-spring";
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
  style,
  ...props
}) => {
  const [{ xy }, set] = useSpring(() => ({ xy: position }));
  const [{ elevation }, setElevation] = useSpring<{ elevation: number }>(
    () => ({
      elevation: 0,
      config: config.stiff
    })
  );
  const lastValue = useRef(position);
  const isDragging = useRef(false);
  const onChange = useRef(onChangePosition);
  useEffect(() => {
    onChange.current = onChangePosition;
  }, [onChangePosition]);
  const bind = useGesture(({ down, delta }) => {
    const value = delta.map((v, i) => v + lastValue.current[i]) as Coordinates;
    if (!isDragging.current && down) {
      isDragging.current = true;
      setElevation({ elevation: 1 });
    }
    onChange.current(value);
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
    <div>
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

interface Position {
  top: number;
  bottom: number;
}

export const Ballot: React.FC<BallotProps> = ({ candidates }) => {
  const candidatesById = useMemo(() => {
    return candidates.reduce(
      (idMap, candidate) => {
        idMap[candidate.id] = candidate;
        return idMap;
      },
      {} as Record<string, Candidate>
    );
  }, [candidates]);
  const [bank, setBank] = useState(Object.keys(candidatesById));
  const [bankPositions, setBankPositions] = useState<Position[]>([]);

  const bankRefs = useMemo(() => {
    return bank.reduce(
      (refs, id) => {
        refs[id] = React.createRef<HTMLDivElement>();
        return refs;
      },
      {} as Record<string, React.RefObject<HTMLDivElement>>
    );
  }, [bank]);
  const positionChangeListeners = useMemo(() => {
    console.log("compute listeners", bankPositions);
    return bank.reduce(
      (listeners, id, i) => {
        const position = bankPositions[i];
        const listener = ([x, y]: Coordinates) => {
          const { top, bottom } = position;
          const centerY = (top + bottom) / 2;
          const currentY = centerY + y;
          const nextI = bankPositions.findIndex(
            ({ top, bottom }) => currentY > top && currentY < bottom
          );
          if (nextI >= 0 && nextI !== i) {
            console.log(i, nextI);
            const removed = [...bank.slice(0, i), ...bank.slice(i + 1)];
            const nextBank = [
              ...removed.slice(0, nextI),
              id,
              ...removed.slice(nextI)
            ];
            setBank(nextBank);
          }
        };
        return [...listeners, listener];
      },
      [] as Array<(p: Coordinates) => void>
    );
  }, [bank, bankPositions]);
  console.log(positionChangeListeners);

  useLayoutEffect(() => {
    console.log("set bank positions");
    setBankPositions(
      bank.reduce(
        (positions, id, i) => {
          const el = bankRefs[id].current;
          let top = 0;
          let height = CARD_MARGIN * 2;
          if (i > 0) {
            top = positions[i - 1].bottom;
          }
          if (el) {
            console.log("el can be measured");
            height += el.clientHeight;
          }
          const bottom = top + height;
          return positions.concat({
            top,
            bottom
          });
        },
        [] as Position[]
      )
    );
  }, [bank, bankRefs]);
  console.log(bankPositions);
  const height = useMemo(
    () =>
      bankPositions.length > 0
        ? bankPositions[bankPositions.length - 1].bottom
        : 0,
    [bankPositions]
  );

  const bankTransitionGroup = useTransition(
    bank.map((id, i) => {
      return {
        id,
        ...(bankPositions[i] || { top: 0, bottom: 0 })
      };
    }),
    ({ id }) => id,
    {
      unique: true,
      opacity: 1,
      transform: `translateY(0px) scale(1)`,
      // initial: ({ top }) => ({
      //   opacity: 1,
      //   transform: `translateY(${top}px)  scale(1)`
      // }),
      from: ({ top }) => ({
        opacity: 0,
        transform: `translateY(${top}px)  scale(0)`
      }),
      enter: ({ top }) => ({
        opacity: 1,
        transform: `translateY(${top}px) scale(1)`
      }),
      leave: ({ top }) => ({
        opacity: 0,
        transform: `translateY(${top}px) scale(0)`
      }),
      update: ({ top }) => ({
        opacity: 1,
        transform: `translateY(${top}px) scale(1)`
      })
    }
  );

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
        <VoteContainer style={{ height }}>
          {bankTransitionGroup.map(({ item, props, key }, i) => {
            const candidate = candidatesById[item.id];
            return (
              <animated.div
                style={{ position: "absolute", width: "100%", ...props }}
                key={key}
                ref={bankRefs[item.id]}
              >
                <DraggableCard
                  onChangePosition={positionChangeListeners[i]}
                  position={[0, 0]}
                  candidate={candidate}
                  style={props}
                />
              </animated.div>
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
            {/* {onBallot.map((candidate, i) => (
              <CandidateCard
                key={i}
                candidate={candidate}
                // borderColor={desaturated_gradient(
                //   i / (election.candidates.length - 1)
                // ).css()}
              />
            ))} */}
          </CandidateContainer>
        </Flex>
      </Flex>
    </Flex>
  );
};

const VoteContainer = styled(Flex)`
  position: relative;
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
