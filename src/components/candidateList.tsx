import React, {
  useCallback,
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
  useRef
} from "react";
import { Flex } from "@rebass/grid/emotion";
import { CandidateCard, CARD_MARGIN } from "./candidateCard";
import { Candidate } from "./types";
import { useTransition, animated, useSpring } from "react-spring";
import styled from "@emotion/styled";
import { FaMinusCircle } from "react-icons/fa";
import { v4 } from "uuid";
import { IconButton, AnimatedFlex } from "./controls";

interface Props {
  value: Candidate[];
  onChange: (value: Candidate[], editModelId: string) => void;
}

/**
 * How it works:
 * 1) Render full list of candidates
 * 2) render 1 additional half opacity card for the edit model
 * 4) Once we have typed anything in the editmodel, it is pushed into the collection, new editmodel appears
 * 5) If we delete all text from an entry, it is removed from the collection on blur
 */

interface CardPosition {
  y: number;
  height: number;
}

function getNextY(positions: CardPosition[]): number {
  if (positions.length === 0) {
    return 0;
  }

  const prevPosition = positions[positions.length - 1];
  return prevPosition.y + prevPosition.height;
}

const CardRow = styled(animated.label)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${CARD_MARGIN}px 16px;
  box-sizing: border-box;
  transition: background-color 0.2s ease-out;
  transform-origin: 50% 0;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const CandidateListInput: React.FC<Props> = props => {
  const { value, onChange } = props;

  const [editModel, setEditModel] = useState<Candidate>({
    id: `${v4()}`,
    name: "",
    description: ""
  });

  useEffect(() => {
    onChange(value, editModel.id);
  }, []);

  const [positions, setPositions] = useState<CardPosition[]>([]);
  const [editModelHasFocus, setEditModelHasFocus] = useState(false);

  const cards = useMemo(() => value.concat(editModel), [editModel, value]);
  const cardRefs = useMemo(
    () => cards.map(() => React.createRef<HTMLLabelElement>()),
    [cards.length]
  );

  useEffect(() => {
    setPositions(
      cardRefs.reduce<CardPosition[]>((positions, ref, i) => {
        const nextPosition = {
          y: getNextY(positions),
          height: ref.current == null ? 0 : ref.current.clientHeight
        };

        return positions.concat(nextPosition);
      }, [])
    );
  }, [cards]);

  const transitions = useTransition<
    CardPosition & { candidate: Candidate },
    { y: number; visibility: number; rowTransform: string }
  >(
    cards.map((candidate, i) => {
      let position = positions[i];
      if (i >= positions.length) {
        position = { y: getNextY(positions), height: 0 };
      }
      return {
        candidate,
        ...position
      };
    }),
    item => item.candidate.id,
    {
      unique: true,
      trail: 15,
      y: 0,
      visibility: 0,
      rowTransform: "",
      from: ({ y }) => ({
        y,
        visibility: 0,
        rowTransform: `translateY(${y}px) scaleY(0)`
      }),
      enter: ({ y }) => ({
        y,
        visibility: 1,
        rowTransform: `translateY(${y}px) scaleY(1)`
      }),
      leave: ({ y }) => ({
        y,
        visibility: 0,
        rowTransform: `translateY(${y}px) scaleY(0)`
      }),
      update: ({ y }) => ({
        y,
        visibility: 1,
        rowTransform: `translateY(${y}px) scaleY(1)`
      })
    }
  );

  let contentHeight = 0;
  if (positions.length > 0) {
    const lastPosition = positions[positions.length - 1];
    contentHeight = lastPosition.height + lastPosition.y;
  }
  const heightSpring = useSpring({
    from: { height: 0 },
    height: contentHeight
  });

  const onEnter = (candidate: Candidate) => {
    const i = cards.findIndex(card => card.id === candidate.id);
    const nextCard = cardRefs[i + 1];
    if (nextCard == null || nextCard.current == null) {
      return;
    }
    const nameInput = nextCard.current.querySelector("textarea");
    if (nameInput == null) {
      return;
    }
    nameInput.focus();
  };

  const onCardBlur = useCallback(() => {
    const nextValue = value.filter(
      candidate => candidate.name !== "" || candidate.description != ""
    );
    if (nextValue.length != value.length) {
      onChange(nextValue, editModel.id);
    }
  }, [value, onChange]);

  const updateCandidate = useCallback(
    (candidate: Candidate) => {
      const i = value.findIndex(c => c.id === candidate.id);
      if (i < 0) {
        return;
      }
      onChange(
        [...value.slice(0, i), candidate, ...value.slice(i + 1)],
        editModel.id
      );
    },
    [onChange, value]
  );

  const removeCandidate = useCallback(
    (candidate: Candidate) => {
      const i = value.findIndex(c => c.id === candidate.id);
      if (i < 0) {
        return;
      }
      onChange([...value.slice(0, i), ...value.slice(i + 1)], editModel.id);
    },
    [onChange, value]
  );

  const appendEditModel = useCallback(
    (candidate: Candidate) => {
      const id = v4();
      setEditModel({
        id,
        name: "",
        description: ""
      });
      setEditModelHasFocus(false);
      onChange(value.concat(candidate), id);
    },
    [onChange, value]
  );

  const onEditModelFocus = useCallback(() => {
    setEditModelHasFocus(true);
  }, []);

  const onEditModelBlur = useCallback(() => {
    setEditModelHasFocus(false);
  }, []);

  return (
    <AnimatedFlex
      flex="1"
      flexDirection="column"
      style={{ position: "relative", ...heightSpring }}
    >
      {transitions.map(({ item, props }, i) => {
        const { candidate } = item;
        const isEditModel = candidate.id === editModel.id;
        return (
          <CardRow
            key={candidate.id}
            ref={cardRefs[i]}
            htmlFor={`card-${candidate.id}-name`}
            style={{
              position: "absolute",
              zIndex: transitions.length - i,
              opacity: props.visibility.interpolate(v =>
                isEditModel && !editModelHasFocus ? v * 0.5 : v
              ),
              transform: props.rowTransform
            }}
          >
            <CandidateCard
              candidate={candidate}
              onCandidateChange={
                isEditModel ? appendEditModel : updateCandidate
              }
              editable
              onFocus={isEditModel ? onEditModelFocus : undefined}
              onBlur={isEditModel ? onEditModelBlur : onCardBlur}
              onEnter={onEnter}
              style={
                {
                  // transformOrigin: "50% 0",
                  // transform: props.visibility.interpolate(v => `scale(${v})`)
                }
              }
            />
            {isEditModel ? null : (
              <IconButton
                onClick={() => removeCandidate(candidate)}
                style={{
                  transformOrigin: "50% 0",
                  transform: props.visibility.interpolate(v => `scale(${v})`)
                }}
              >
                <FaMinusCircle />
              </IconButton>
            )}
          </CardRow>
        );
      })}
    </AnimatedFlex>
  );
};
