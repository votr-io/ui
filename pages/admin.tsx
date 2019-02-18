import { Flex } from "@rebass/grid/emotion";
import React from "react";
import {
  AnimatedFlex,
  Form,
  FormHeader,
  FormRow,
  Input,
  Label
} from "../src/components/controls";
import { Page } from "../src/components/page";
import { usePageTransition } from "../src/components/pageTransition";
import { PageProps } from "../src/components/types";
import { Headline } from "../src/components/typography";
import { useGetElection } from "../src/generated/apolloHooks";

const AdminElection: React.FC<PageProps> = props => {
  const id = props.path.split("/")[2];
  const hasId = id === null;

  console.log(id);

  const { loading, error, data } = useGetElection({ id: id });

  const formElements = [
    <FormHeader>
      <Headline>{hasId ? "Manage Election" : "Create Election"}</Headline>
    </FormHeader>,
    <FormRow>
      <Label htmlFor="name">Election Name</Label>
      <Input name="name" autoFocus />
    </FormRow>,
    <FormRow>
      <Label htmlFor="description">Description</Label>
      <Input name="description" />
    </FormRow>,
    <FormRow>
      <Label htmlFor="description">Candidates</Label>
      <Input name="description" />
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
