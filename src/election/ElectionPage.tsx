import React from "react";
import mockResponse from "./mockElection";
import { RouteComponentProps } from "react-router";
import { Page } from "../components/Page";
import { Flex } from "@rebass/grid/emotion";
import { Typography, Button, Grid } from "@material-ui/core";
import styled from "@emotion/styled";
import { theme, tan, lightBlue, red, blue } from "../theme";

// Depending on election status, will be ballot, awaiting results or results
export const ElectionPage: React.FC<RouteComponentProps<{
  electionId: string;
}>> = props => {
  const election = mockResponse;

  return (
    <Page header>
      <Flex flexDirection="column" flex="1 0 auto">
        <Flex flexDirection="column" marginBottom={`${theme.spacing(3)}px`}>
          <Typography variant="h4">{election.name}</Typography>
          <Typography variant="body2">{election.description}</Typography>
        </Flex>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DndColumn>
              <DndHeader variant="body1" align="center">
                Candidates
              </DndHeader>
              {election.candidates.map(candidate => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                ></CandidateCard>
              ))}
            </DndColumn>
          </Grid>
          <Grid item xs={6}>
            <DndColumn>
              <DndHeader variant="body1" align="center">
                Your Ballot
              </DndHeader>
              {election.candidates.slice(0, 3).map((candidate, i) => (
                <CandidateCard
                  key={candidate.id}
                  rank={i + 1}
                  candidate={candidate}
                ></CandidateCard>
              ))}
            </DndColumn>
          </Grid>
        </Grid>
        <Flex
          flex="1 0 auto"
          alignItems="flex-end"
          justifyContent="flex-end"
          style={{ position: "sticky", bottom: theme.spacing(2) }}
          marginTop={`${theme.spacing(2)}px`}
          paddingRight={`${theme.spacing(1)}px`}
        >
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Flex>
      </Flex>
    </Page>
  );
};

const CandidateCard: React.FC<{
  rank?: number;
  candidate: typeof mockResponse.candidates[0];
}> = ({ candidate, rank }) => {
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

const Divider = styled.div`
  border: 0.5px solid ${blue};
  margin: ${theme.spacing(2)}px 0;
`;

const DndHeader = styled(Typography)`
  padding-bottom: ${theme.spacing(1)}px;
  margin-bottom: ${theme.spacing(1)}px;
  font-weight: 200 !important;
`;

const Card = styled(Flex)`
  margin: ${theme.spacing(2)}px 0;
`;

const DndColumn = styled.div`
  /* flex-direction: column; */
  /* flex: 1 1 0%; */
  padding: ${theme.spacing(1)}px;
  border: 0.5px solid ${theme.palette.divider};
  border-radius: 2px;
  height: 100%;
  box-sizing: border-box;
  /* margin: ${theme.spacing(1)}px; */
`;
