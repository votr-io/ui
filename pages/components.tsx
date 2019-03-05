import { Flex } from "@rebass/grid/emotion";
import React, { useState } from "react";
import { CandidateCard } from "../src/components/candidateCard";
import { MultilineTextInput } from "../src/components/multilineTextInput";
import { foreground, pink, white, background } from "../src/components/styles";
import { Touchable } from "../src/components/touchable";
4;
import { Candidate } from "../src/components/types";
import { Content } from "../src/components/page";

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
  const [text, setText] = useState("");

  return (
    <Flex
      flex="1"
      flexDirection="column"
      alignItems="center"
      style={{ overflow: "auto" }}
    >
      <Content
        flex="1 0 auto"
        style={{ width: 800, padding: 16 }}
        flexDirection="column"
      >
        <MultilineTextInput
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={50}
        />
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
      </Content>
    </Flex>
  );
};
