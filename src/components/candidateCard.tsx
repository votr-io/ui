import styled from "@emotion/styled";
import React, { useCallback, ChangeEvent } from "react";
import { AnimatedFlex, Input } from "./controls";
import { card, makeShadow, pink, divider } from "./styles";
import { Bold, Text } from "./typography";
import { Candidate, PropTypes } from "./types";
import { Flex } from "@rebass/grid/emotion";

const Card = styled(AnimatedFlex)<{ elevation?: number }>`
  max-width: 320px;
  min-height: 60px;
  border-radius: 4px;
  border-left: 4px solid #6e6e6e;
  background: ${card.css()};
  padding: 4px 16px;
  margin: 8px 0;
  ${p => makeShadow(p.elevation == null ? 2 : p.elevation)}
`;

const Editable = styled(Flex)<{ contentEditable?: boolean }>`
  flex: 1 0 auto;
  padding: 4px 0 3px;
  border-bottom: 1px solid
    ${p => (p.contentEditable ? divider.css() : "transparent")};
  margin-bottom: 0.5 em;
  outline: none;
  transition: border-color 0.2s ease-out;

  &:focus {
    border-color: ${pink.css()};
  }
`;

interface Props {
  editable?: boolean;
  candidate?: Candidate;
  onChange?: (c: Candidate) => void;
  borderColor?: string;
}

export const CandidateCard: React.FC<Props & PropTypes<typeof Card>> = ({
  children,
  editable,
  onChange,
  candidate,
  borderColor,
  elevation,
  ...otherProps
}) => {
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
          <Editable contentEditable={editable}>
            <Bold>{candidate.name}</Bold>
          </Editable>
          <Editable contentEditable={editable}>
            <Text>{candidate.description}</Text>
          </Editable>
        </Flex>
      )}
    </Card>
  );
};
