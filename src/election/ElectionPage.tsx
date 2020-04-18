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
import { Ballot } from "./ballot/Ballot";

// Depending on election status, will be ballot, awaiting results or results
export const ElectionPage: React.FC<RouteComponentProps<{
  electionId: string;
}>> = props => {
  const election = mockResponse;

  // TODO: query data
  //@ts-ignore
  return <Ballot election={election}></Ballot>;
};
