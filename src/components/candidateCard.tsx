import styled from "@emotion/styled";
import React, { useCallback, ChangeEvent } from "react";
import { AnimatedFlex, Input } from "./controls";
import { card, makeShadow } from "./styles";
import { Bold, Text } from "./typography";
import { Candidate, PropTypes } from "./types";
import { Flex } from "@rebass/grid/emotion";

const Card = styled(AnimatedFlex)<{ elevation?: number }>`
  max-width: 320px;
  min-height: 60px;
  border-radius: 4px;
  border-left: 4px solid #6e6e6e;
  background: ${card.css()};
  padding: 8px 16px;
  margin: 8px 0;
  ${p => makeShadow(p.elevation == null ? 2 : p.elevation)}
`;

interface CandidateCardProps {
  candidate?: Candidate;
  borderColor?: string;
}

export const CandidateCard: React.FC<
  CandidateCardProps & PropTypes<typeof Card>
> = ({ children, candidate, borderColor, elevation, ...otherProps }) => {
  return (
    <Card
      {...otherProps}
      style={{ borderColor: borderColor || "#555", ...otherProps.style }}
      elevation={elevation || 2}
    >
      {candidate == null || children ? (
        children
      ) : (
        <Flex flex="1" flexDirection="column" justifyContent="space-around">
          <Flex flex="1 0 auto" pb="0.5em">
            <Bold>{candidate.name}</Bold>
          </Flex>
          <Flex flex="1 0 auto">
            <Text>{candidate.description}</Text>
          </Flex>
        </Flex>
      )}
    </Card>
  );
};

interface EditableCandidateCardProps {
  name?: string;
  candidate: Candidate;
  onCandidateChange: (value: Candidate) => void;
}

export const EditableCandidateCard: React.FC<
  EditableCandidateCardProps & PropTypes<typeof CandidateCard>
> = ({
  name,
  candidate: value,
  onCandidateChange: onChange,
  ...otherProps
}) => {
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
