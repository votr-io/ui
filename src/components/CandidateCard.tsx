import React from "react";
import { Flex } from "@rebass/grid/emotion";
import { Typography } from "@material-ui/core";
import { theme } from "../theme";
import styled from "@emotion/styled";

export interface CandidateCardProps {
  rank?: number;
  candidate: { id: string; name: string; description: string };
}

// TODO: animate changes in rank

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  rank
}) => {
  return (
    <Card>
      <Flex>
        <Flex width="40px" alignItems="center" justifyContent="center">
          <Typography variant="h5">{rank}</Typography>
        </Flex>
        <Flex flexDirection="column">
          <Typography variant="body1" style={{ fontWeight: 600 }}>
            {candidate.name}
          </Typography>
          <Typography variant="body2" style={{ fontWeight: 300 }}>
            {candidate.description}
          </Typography>
        </Flex>
      </Flex>
    </Card>
  );
};

const Card = styled(Flex)`
  padding: ${theme.spacing(1)}px 0;
`;
