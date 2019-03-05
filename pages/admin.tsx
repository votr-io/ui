import { Flex } from "@rebass/grid/emotion";
import React, { useState } from "react";
import { CandidateListInput } from "../src/components/candidateList";
import {
  AnimatedFlex,
  FormHeader,
  FormRow,
  Input,
  Button
} from "../src/components/controls";
import { Page, Content } from "../src/components/page";
import { usePageTransition } from "../src/components/pageTransition";
import { Candidate, PageProps } from "../src/components/types";
import { Bold, Caption, Headline } from "../src/components/typography";
import { FaPlusCircle } from "react-icons/fa";
import { foreground } from "../src/components/styles";

/**
 * TODO:
 * Take email address
 *
 * Candidate List:
 * - Plus button
 * - Minus buttons
 * - Scroll to card when it recevies focus
 *
 * Form validation:
 * - Input trimming
 * - Character count on candidate cards
 *
 * Card Validation:
 * - Name required
 * - No empty names
 * - No duplicated names
 *
 * Save Button
 * - Login flow
 * - Animate editing to side, show start election button
 */

const AdminElection: React.FC<PageProps> = props => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const formElements = [
    <FormHeader>
      <Headline>Create An Election</Headline>
    </FormHeader>,
    <FormRow>
      <label htmlFor="name">
        <Bold>Election Name</Bold>
        <p>
          <Caption>A brief title describing what this election is for.</Caption>
        </p>
      </label>
      <Input id="name" autoFocus />
    </FormRow>,
    <FormRow>
      <label htmlFor="description">
        <span>
          <Bold>Description </Bold>
          <Caption> (optional)</Caption>
        </span>
        <p>
          <Caption>Additional information about the election.</Caption>
        </p>
      </label>
      <Input id="description" />
    </FormRow>,
    <FormRow>
      <label htmlFor="description">
        <Bold>Email Address</Bold>
        <p>
          <Caption>
            So we can send you a link to find and manage this election. We will
            never share your contact info with anyone.
          </Caption>
        </p>
      </label>
      <Input id="description" />
    </FormRow>,
    <FormRow>
      <Flex flexDirection="row" alignItems="center">
        <Flex flex="1">
          <label htmlFor="description">
            <Bold>Candidates</Bold>
            <p>
              <Caption>
                List the candidates competing in this election. Order does not
                matter.
              </Caption>
            </p>
          </label>
        </Flex>
        <Flex>
          <FaPlusCircle />
        </Flex>
      </Flex>

      <CandidateListInput value={candidates} onChange={setCandidates} />
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
      transform: t.x.interpolate(x => `translateX(${(1 - x) * 10}px)`)
    };
  };

  return (
    <Page>
      <Flex flex="1" flexDirection="column" alignItems="center">
        <Content flex="1 0 auto" flexDirection="column" p="8px">
          {formElements.map((El, i) => {
            return (
              <AnimatedFlex key={i} style={animate(i)}>
                {El}
              </AnimatedFlex>
            );
          })}
        </Content>
      </Flex>
    </Page>
  );
};

export default AdminElection;
