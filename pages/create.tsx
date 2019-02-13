import { Flex } from "@rebass/grid/emotion";
import React from "react";
import { config, useTrail } from "react-spring";
import {
  Form,
  FormHeader,
  FormRow,
  Input,
  Label,
  Button
} from "../src/controls";
import { Page } from "../src/page";
import { Headline } from "../src/typography";

const CreateElection: React.SFC = () => {
  const trail = useTrail(3, {
    config: config.default,
    x: 1,
    from: { x: 0 }
  });

  const animate = (t: typeof trail[0]) => ({
    opacity: t.x,
    transform: t.x.interpolate(x => `translateX(${x * 10}px)`)
  });

  return (
    <Page>
      <Flex flex="1" flexDirection="column" alignItems="center">
        <Form>
          <FormHeader style={animate(trail[0])}>
            <Headline>Create an election</Headline>
          </FormHeader>
          <FormRow style={animate(trail[1])}>
            <Label htmlFor="name">Election Name</Label>
            <Input name="name" autoFocus />
          </FormRow>
          <FormRow style={animate(trail[2])}>
            <Label htmlFor="age">Election Name</Label>
            <Input name="age" />
          </FormRow>
          <Flex flex="1" alignItems="flex-end" justifyContent="flex-end">
            <Button>Save</Button>
          </Flex>
        </Form>
      </Flex>
    </Page>
  );
};

export default CreateElection;
