import React from "react";
import { Flex } from "@rebass/grid/emotion";
import { CandidateCard } from "../src/components/candidateCard";
import { Candidate } from "../src/components/types";
import { background, foreground } from "../src/components/styles";

// 50 / 80

const MAX_NAME = "Lorem ipsum dolor sit amet, consectetuer adipiscing elitasdf";
const MAX_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula.";
const testCandidates: Candidate[] = [
  { id: "1", name: "John F. Kenedy", description: "Democratic" },
  { id: "2", name: "Richard M. Nixon", description: "Republican" },
  { id: "3", name: "NBA 2K19" },
  {
    id: "4",
    name: MAX_NAME,
    description: MAX_DESCRIPTION
  }
];

export default () => {
  return (
    <Flex flex="1" style={{ overflow: "auto" }} flexDirection="row">
      <Flex flex="1" flexDirection="column" alignItems="center">
        <Flex
          flexDirection="column"
          flex="1 0 auto"
          style={{ background: foreground.css(), padding: 16 }}
        >
          {testCandidates.map(c => (
            <CandidateCard candidate={c} key={c.id} />
          ))}
          <CandidateCard>HERES SOME TEST CONTENT</CandidateCard>
        </Flex>
      </Flex>
      <Flex flex="1" flexDirection="column" alignItems="center">
        <Flex
          flexDirection="column"
          flex="1 0 auto"
          style={{ background: foreground.css(), padding: 16 }}
        >
          {testCandidates.map(c => (
            <CandidateCard candidate={c} key={c.id} />
          ))}
          <CandidateCard>HERES SOME TEST CONTENT</CandidateCard>
        </Flex>
      </Flex>
      <Flex flex="1" flexDirection="column" alignItems="center">
        <Flex
          flexDirection="column"
          flex="1 0 auto"
          style={{ background: foreground.css(), padding: 16 }}
        >
          {testCandidates.map(c => (
            <CandidateCard candidate={c} key={c.id} />
          ))}
          <CandidateCard>HERES SOME TEST CONTENT</CandidateCard>
        </Flex>
      </Flex>
    </Flex>
  );
};
