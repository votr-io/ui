import { Candidate, PropTypes } from "./types";
import { CandidateCard } from "./candidateCard";
import { useCallback, ChangeEvent } from "react";
import { Flex } from "@rebass/grid/emotion";
import { Input } from "./controls";
import styled from "@emotion/styled";

const InlineInput = styled.input`

`;

interface Props {
  name?: string;
  candidate: Candidate;
  onChange: (value: Candidate) => void;
}

export const EditableCandidateCard: React.FC<
  Props & PropTypes<typeof CandidateCard>
> = ({ name, candidate: value, onCandidateChange: onChange, ...otherProps }) => {
  const onNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...value,
        name: e.target.value
      });
    },
    [value]
  );

  const onDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...value,
        description: e.target.value
      });
    },
    [value]
  );

  return (
    <CandidateCard {...otherProps}>
      <Flex flexDirection="column" justifyContent="space-around">
        <Flex flex="1" flexDirection="column">
          <Input
            id={name}
            placeholder="name"
            value={value.name}
            onChange={onNameChange}
            required
            maxLength={50}
          />
        </Flex>
        <Flex flex="1" flexDirection="column">
          <Input
            placeholder="description (optional)"
            value={value.description}
            onChange={onDescriptionChange}
            maxLength={80}
          />
        </Flex>
      </Flex>
    </CandidateCard>
  );
};
