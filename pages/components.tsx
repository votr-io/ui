import { Flex } from "@rebass/grid/emotion";
import React, { useState } from "react";
import { CandidateCard } from "../src/components/candidateCard";
import { foreground, pink, white } from "../src/components/styles";
import { Touchable } from "../src/components/touchable";
4;
import { Candidate } from "../src/components/types";

// 50 / 80

const MAX_NAME = "Lorem ipsum dolor sit amet, consectetuer adipiscin";
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
  },
  {
    id: "5",
    name: MAX_NAME.replace(/./gm, "M"),
    description: MAX_DESCRIPTION.replace(/./gm, "M")
  }
];

export default () => {
  const [candidate, setCandidate] = useState(testCandidates[0]);

  return (
    <Flex
      flex="1"
      style={{ overflow: "auto" }}
      alignItems="center"
      justifyContent="center"
    >
      <Touchable ink={pink} surface={white}>
        Hello world
      </Touchable>
      <Touchable ink={pink} surface={white}>
        <div
          style={{
            border: "1px solid black",
            borderRadius: 4,
            height: 25,
            width: 25
          }}
        />
      </Touchable>
    </Flex>
  );
};
