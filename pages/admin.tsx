import { Flex } from "@rebass/grid/emotion";
import React from "react";
import { config, useTrail } from "react-spring";
import {
  Form,
  FormHeader,
  FormRow,
  Input,
  Label,
  Button,
  AnimatedFlex
} from "../components/controls";
import { Page } from "../components/page";
import { Headline } from "../components/typography";
import { PageProps } from "../components/types";

const AdminElection: React.FC<PageProps> = props => {
  const isEntering = props.transitionState === "enter";
  const isExiting = props.transitionState === "exit";

  const formElements = [
    <FormHeader>
      <Headline>Create an election</Headline>
    </FormHeader>,
    <FormRow>
      <Label htmlFor="name">Election Name</Label>
      <Input name="name" autoFocus />
    </FormRow>,
    <FormRow>
      <Label htmlFor="age">Election Name</Label>
      <Input name="age" />
    </FormRow>
  ];

  const trail = useTrail(formElements.length, {
    config: config.default,
    x: isExiting ? 0 : 1,
    from: { x: isEntering ? 0 : 1 },
    onRest: props.onTransitionComplete
  });

  const animate = (i: number) => {
    const t = trail[i];
    return {
      opacity: t.x,
      transform: t.x.interpolate(x => `translateX(${x * 10}px)`)
    };
  };

  return (
    <Page>
      <Flex flex="1" flexDirection="column" alignItems="center">
        <Form>
          {formElements.map((El, i) => {
            return (
              <AnimatedFlex key={i} style={animate(i)}>
                {El}
              </AnimatedFlex>
            );
          })}
        </Form>
      </Flex>
    </Page>
  );
};

export default AdminElection;
