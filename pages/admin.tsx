import { Flex } from "@rebass/grid/emotion";
import React from "react";
import {
  AnimatedFlex,
  Form,
  FormHeader,
  FormRow,
  Input,
  Label
} from "../components/controls";
import { Page } from "../components/page";
import { usePageTransition } from "../components/pageTransition";
import { PageProps } from "../components/types";
import { Headline } from "../components/typography";

const AdminElection: React.FC<PageProps> = props => {
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

  const trail = usePageTransition(
    formElements.length,
    props.transitionState,
    props.onTransitionComplete
  );

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
