import React from "react";
import { Flex } from "@rebass/grid/emotion";
import { Typography } from "@material-ui/core";
import { theme } from "../theme";
import styled from "@emotion/styled";

import mockResponse from "../election/mockElection";

export interface CandidateCardProps {
  rank?: number;
  candidate: typeof mockResponse.candidates[0];
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
