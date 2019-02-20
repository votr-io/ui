import styled from "@emotion/styled";
import React from "react";
import { AnimatedFlex } from "./controls";
import { card, makeShadow } from "./styles";
import { Bold, Text } from "./typography";

const Card = styled(AnimatedFlex)`
  border-radius: 4px;
  border-left: 4px solid #6e6e6e;
  background: ${card.css()};
  flex-direction: column;
  padding: 8px 16px;
  margin: 8px 0;
  ${makeShadow(2)}
`;

interface Props {
  candidate: {
    name: string;
    description: string;
  };
  borderColor?: string;
}

export const CandidateCard: React.FC<Props> = props => {
  return (
    <Card style={{ borderColor: props.borderColor || "#555" }}>
      <Bold>{props.candidate.name}</Bold>
      <Text>{props.candidate.description}</Text>
    </Card>
  );
};
