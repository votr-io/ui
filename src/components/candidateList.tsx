import React, {
  useCallback,
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
  useRef
} from "react";
import { Flex } from "@rebass/grid/emotion";
import { Form, FormRow, Input, Button, Label } from "./controls";
import { CandidateCard } from "./candidateCard";
import { Candidate } from "./types";
import { useTransition } from "react-spring";

interface Props {
  value: Candidate[];
  onChange: (value: Candidate[]) => void;
}

let id = 0;
const nextId = () => `${++id}`;

export const CandidateListInput: React.FC<Props> = props => {
  const { value, onChange } = props;
  console.log("in list", value);

  const [editModel, setEditModel] = useState<Candidate>({
    id: `${id}`,
    name: "",
    description: ""
  });

  const [positions, setPositions] = useState<{ y: number; height: number }[]>(
    []
  );

  const cards = useMemo(() => [editModel, ...value], [editModel, value]);

  let focusFirstInput = useRef(false);
  const onSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e != null) {
        e.preventDefault();
      }
      focusFirstInput.current = true;
      if (editModel.name === "") {
        return;
      }
      onChange([editModel, ...value]);
      setEditModel({
        id: nextId(),
        name: "",
        description: ""
      });
    },
    [onChange, editModel]
  );

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

  useEffect(() => {
    let sum = 28;
    setPositions(
      cards.map((card, i) => {
        const el = document.getElementById(`card-${card.id}`);
        if (el == null) {
          return { y: 0, height: 0 };
        }
        if (i === 0 && focusFirstInput.current) {
          const input = el.querySelector("textarea");
          if (input) input.focus();
          focusFirstInput.current = false;
        }
        const y = sum;
        const height = el.clientHeight;
        sum += height + 16;

        return {
          y,
          height
        };
      })
    );
  }, [cards]);

  const transitions = useTransition(
    cards.map((candidate, i) => {
      const position = positions[i] || { y: 0, height: 0 };
      return {
        id: candidate.id,
        ...position
      };
    }),
    v => v.id,
    {
      unique: true,
      // trail: 15,
      from: ({ y, height }) => ({
        transform: `translateY(${y - height / 2}px) scale(0)`,
        opacity: 0
      }),
      enter: ({ y }) => ({
        transform: `translateY(${y}px) scale(1)`,
        opacity: 1
      }),
      leave: ({ y, height }) => ({
        transform: `translateY(${y - height}px) scale(0)`,
        opacity: 1
      }),
      update: ({ y }) => ({
        transform: `translateY(${y}px) scale(1)`,
        opacity: 1
      })
    }
  );

  return (
    <Flex flex="1">
      <FormRow>
        {transitions.map(({ item, key, props }, i) => {
          if (i === 0) {
            return (
              <Form onSubmit={onSubmit} key={key}>
                <Label htmlFor={`card-${item.id}-name`}>Candidates</Label>
                <Flex flex="1" flexDirection="row" alignItems="center">
                  <CandidateCard
                    id={`card-${item.id}`}
                    candidate={editModel}
                    onCandidateChange={setEditModel}
                    onEnter={onSubmit}
                    editable
                    style={{ position: "absolute", top: 0, ...props }}
                  />
                  <Flex flex="1" />
                  <Button onClick={onSubmit}>Add</Button>
                </Flex>
              </Form>
            );
          }

          const candidate = cards[i];
          return (
            <CandidateCard
              key={key}
              id={`card-${item.id}`}
              candidate={candidate}
              onCandidateChange={updateCandidate}
              editable
              style={{ position: "absolute", top: 0, ...props }}
            />
          );
        })}
      </FormRow>
    </Flex>
  );
};
