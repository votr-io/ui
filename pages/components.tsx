import { Flex } from "@rebass/grid/emotion";
import React, { useState } from "react";
import { Content } from "../src/components/page";
import { pink, white } from "../src/components/styles";
import { MultilineTextInput } from "../src/components/textInput";
import { Touchable } from "../src/components/touchable";
import { Candidate } from "../src/components/types";
4;

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
          onChange={setText}
          maxLength={500}
          validationMessage={text}
        />
        <Touchable ink={pink} surface={white}>
          w Hello world
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
