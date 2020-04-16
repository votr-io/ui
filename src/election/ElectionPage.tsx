import React, { useState } from "react";
import mockResponse from "./mockElection";
import { RouteComponentProps } from "react-router";
import { Page } from "../components/Page";
import { Flex } from "@rebass/grid/emotion";
import { Typography, Button, Grid } from "@material-ui/core";
import styled from "@emotion/styled";
import { theme, tan, lightBlue, red, blue } from "../theme";
import { CandidateCard } from "../components/CandidateCard";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";

// Depending on election status, will be ballot, awaiting results or results
export const ElectionPage: React.FC<RouteComponentProps<{
  electionId: string;
}>> = props => {
  const election = mockResponse;
  const candidatesById = election.candidates.reduce(
    (candidatesById, candidate) => {
      candidatesById[candidate.id] = candidate;
      return candidatesById;
    },
    {} as Record<string, typeof mockResponse.candidates[0]>
  );

  return (
    <Page header>
      <Flex flexDirection="column" flex="1 0 auto">
        <Flex flexDirection="column" marginBottom={`${theme.spacing(3)}px`}>
          <Typography variant="h4">{election.name}</Typography>
          <Typography variant="body2">{election.description}</Typography>
        </Flex>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DndColumn>
                <DndHeader variant="body1" align="center">
                  Candidates
                </DndHeader>
                {election.candidates.slice(3).map(candidate => (
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
        </DragDropContext>
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

const DndHeader = styled(Typography)`
  padding-bottom: ${theme.spacing(1)}px;
  margin-bottom: ${theme.spacing(1)}px;
  font-weight: 200 !important;
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
