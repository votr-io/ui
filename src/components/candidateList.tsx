import React, { useCallback, useState, ChangeEvent } from "react";
import { CreateCandidateInput } from "../generated/globalTypes";
import { Flex } from "@rebass/grid/emotion";
import { Form, FormRow, Input, Button } from "./controls";
import { CandidateCard } from "./candidateCard";

interface Props {
  value: CreateCandidateInput[];
  onChange: (value: CreateCandidateInput[]) => void;
}

export const CandidateListInput: React.FC<Props> = props => {
  const { value, onChange } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);
  const onDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value);
    },
    []
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onChange([...value, { name, description }]);
      setName("");
      setDescription("");
    },
    [props.onChange, name, description]
  );

  return (
    <Flex>
      <Form onSubmit={onSubmit}>
        <FormRow>
          <Input type="text" value={name} onChange={onNameChange} required />
        </FormRow>
        <FormRow>
          <Input
            type="text"
            value={description}
            onChange={onDescriptionChange}
          />
        </FormRow>
        <FormRow>
          <Button>Add Candidate</Button>
        </FormRow>
        <FormRow>
          {value.map((candidate, i) => (
            <CandidateCard candidate={candidate} key={i} />
          ))}
        </FormRow>
      </Form>
    </Flex>
  );
};
