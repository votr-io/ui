import { Flex } from "@rebass/grid/emotion";
import React, { useCallback, useState } from "react";
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
import { PageProps, Candidate } from "../src/components/types";
import { Headline } from "../src/components/typography";
import { CandidateListInput } from "../src/components/candidateList";

const AdminElection: React.FC<PageProps> = props => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const formElements = [
    <FormHeader>
      <Headline>Create Election</Headline>
    </FormHeader>,
    <FormRow>
      <Label htmlFor="name">Election Name</Label>
      <Input id="name" autoFocus />
    </FormRow>,
    <FormRow>
      <Label htmlFor="description">Description</Label>
      <Input id="description" />
    </FormRow>,
    <CandidateListInput value={candidates} onChange={setCandidates} />
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
      <Flex
        flex="1"
        style={{ overflow: "auto" }}
        flexDirection="column"
        alignItems="center"
      >
        <Flex flex="0 0 auto" flexDirection="column" alignItems="center">
          <Flex flexDirection="column" width="480px">
            {formElements.map((El, i) => {
              return (
                <AnimatedFlex key={i} style={animate(i)}>
                  {El}
                </AnimatedFlex>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Page>
  );
};

export default AdminElection;
