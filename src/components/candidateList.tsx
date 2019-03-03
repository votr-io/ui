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
import { useTransition } from "react-spring";

interface Props {
  value: Candidate[];
  onChange: (value: Candidate[]) => void;
}

/**
 * How it works:
 * 1) Render full list of candidates
 * 2) render 1 additional half opacity card for the edit model
 * 4) Once we have typed anything in the editmodel, it is pushed into the collection, new editmodel appears
 * 5) If we delete all text from an entry, it is removed from the collection on blur
 */

let id = 0;
const nextId = () => `${++id}`;

interface CardPosition {
  y: number;
  height: number;
}

function getNextY(positions: CardPosition[]): number {
  if (positions.length === 0) {
    return CARD_MARGIN;
  }

  const prevPosition = positions[positions.length - 1];
  return prevPosition.y + prevPosition.height + CARD_MARGIN * 2;
}

export const CandidateListInput: React.FC<Props> = props => {
  const { value, onChange } = props;

  const [editModel, setEditModel] = useState<Candidate>({
    id: `${id}`,
    name: "",
    description: ""
  });

  const [positions, setPositions] = useState<CardPosition[]>([]);

  const cards = useMemo(() => value.concat(editModel), [editModel, value]);
  const cardRefs = useMemo(
    () => cards.map(() => React.createRef<HTMLDivElement>()),
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

  const transitions = useTransition(
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
      from: ({ y }) => ({
        transform: `translateY(${y}px) scale(0)`,
        opacity: 0
      }),
      enter: ({ y, candidate }) => ({
        transform: `translateY(${y}px) scale(1)`,
        opacity: candidate.id === editModel.id ? 0.5 : 1
      }),
      leave: ({ y }) => ({
        transform: `translateY(${y}px) scale(0)`,
        opacity: 0
      }),
      update: ({ y, candidate }) => ({
        transform: `translateY(${y}px) scale(1)`,
        opacity: candidate.id === editModel.id ? 0.5 : 1
      })
    }
  );

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

  const onBlur = useCallback(() => {
    const nextValue = value.filter(
      candidate => candidate.name !== "" || candidate.description != ""
    );
    if (nextValue.length != value.length) {
      onChange(nextValue);
    }
  }, [value, onChange]);

  const updateCandidate = useCallback(
    (candidate: Candidate) => {
      const i = value.findIndex(c => c.id === candidate.id);
      if (i < 0) {
        return;
      }
      onChange([...value.slice(0, i), candidate, ...value.slice(i + 1)]);
    },
    [onChange, value]
  );

  const appendEditModel = useCallback(
    (candidate: Candidate) => {
      onChange(value.concat(candidate));
      setEditModel({
        id: nextId(),
        name: "",
        description: ""
      });
    },
    [onChange, value]
  );

  return (
    <Flex flex="1" flexDirection="column" style={{ position: "relative" }}>
      {transitions.map(({ item, props }, i) => {
        const { candidate } = item;
        const isEditModel = candidate.id === editModel.id;
        return (
          <CandidateCard
            key={candidate.id}
            ref={cardRefs[i]}
            candidate={candidate}
            onCandidateChange={isEditModel ? appendEditModel : updateCandidate}
            editable
            style={{
              position: "absolute",
              transformOrigin: "50% 0%",
              zIndex: transitions.length - i,
              ...props
            }}
            onBlur={isEditModel ? undefined : onBlur}
            onEnter={onEnter}
          />
        );
      })}
    </Flex>
  );
};
