import React, { useCallback, useState, ChangeEvent, useMemo } from "react";
import { Flex } from "@rebass/grid/emotion";
import { Form, FormRow, Input, Button, Label } from "./controls";
import {
  CandidateCard,
  EditableCandidateCard,
  CARD_HEIGHT
} from "./candidateCard";
import { Candidate } from "./types";
import { useTransition } from "react-spring";

interface Props {
  value: Candidate[];
  onChange: (value: Candidate[]) => void;
}

let id = 0;
const nextId = () => `${id++}`;

export const CandidateListInput: React.FC<Props> = props => {
  const { value, onChange } = props;

  const [editModel, setEditModel] = useState<Candidate>({
    id: nextId(),
    name: "",
    description: ""
  });

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onChange([editModel, ...value]);
      setEditModel({
        id: nextId(),
        name: "",
        description: ""
      });
    },
    [props.onChange, editModel]
  );

  const updateCandidate = useMemo(
    () => (i: number) => (candidate: Candidate) => {
      onChange([...value.slice(0, i), candidate, ...value.slice(i + 1)]);
    },
    [value]
  );

  const transitions = useTransition(
    value.map((candidate, i) => ({
      ...candidate,
      y: i * CARD_HEIGHT
    })),
    v => v.id,
    {
      from: ({ y }) => ({
        transform: `translateY(${y - CARD_HEIGHT}px) scale(0)`,
        opacity: 0
      }),
      enter: ({ y }) => ({
        transform: `translateY(${y}px) scale(1)`,
        opacity: 1
      }),
      leave: ({ y }) => ({
        transform: `translateY(${y - CARD_HEIGHT}px) scale(0)`,
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
        <Form onSubmit={onSubmit}>
          <Label htmlFor="editCard">Candidates</Label>
          <Flex
            flex="1"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <EditableCandidateCard
              name="editCard"
              candidate={editModel}
              onCandidateChange={setEditModel}
            />
            <Button onClick={onSubmit}>Add</Button>
          </Flex>
        </Form>
        {transitions.map(({ item, key, props }, i) => (
          <EditableCandidateCard
            style={{ position: "absolute", ...props }}
            key={key}
            candidate={item}
            onCandidateChange={updateCandidate(i)}
          />
        ))}
      </FormRow>
    </Flex>
  );
};
