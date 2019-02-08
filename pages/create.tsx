import React from "react";
import { Page } from "../src/page";
import styled from "styled-components";
import { useTrail, config, animated } from "react-spring";
import { text_dark, text_light } from "../src/styles";
import { Flex } from "@rebass/grid";

const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const formElements = [
  { label: "name" },
  { label: "age" },
  { label: "virthday" }
];

const Input = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  border: 1px solid ${text_light.css()};
  border-radius: 2px;
  padding: 4px 8px;
  background: none;
`;

const Label = styled.label`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: ${text_dark.css()};
  margin-bottom: 4px;
`;

const AnimatedFlex = animated(Flex);

const CreateElection: React.SFC = () => {
  const trail = useTrail(formElements.length, {
    config: config.default,
    x: 1,
    from: { x: 0 }
  });

  return (
    <Page>
      <Form>
        {trail.map((t, i) => {
          const el = formElements[i];

          return (
            <AnimatedFlex
              flexDirection="column"
              alignItems="flex-start"
              flex="0 0 auto"
              key={el.label}
              style={{
                opacity: t.x,
                transform: t.x.interpolate(x => `translateX(${x * 10}px)`),
                marginBottom: "16px"
              }}
            >
              <Label htmlFor={el.label}>{el.label}</Label>
              <Input name={el.label} type="text" />
            </AnimatedFlex>
          );
        })}
      </Form>
    </Page>
  );
};

export default CreateElection;
