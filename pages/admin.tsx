import { Flex } from "@rebass/grid/emotion";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useFormState, BaseInputProps } from "react-use-form-state";
import { CandidateListInput } from "../src/components/candidateList";
import {
  AnimatedFlex,
  FormHeader,
  FormRow,
  Button,
  IconButton
} from "../src/components/controls";
import {
  MultilineTextInput,
  SingleLineTextInput
} from "../src/components/multilineTextInput";
import { Content, Page } from "../src/components/page";
import { usePageTransition } from "../src/components/pageTransition";
import { Candidate, PageProps } from "../src/components/types";
import { Bold, Caption, Headline } from "../src/components/typography";
import { cardInputId } from "../src/components/candidateCard";

/**
 * TODO:
 * Take email address
 *
 * Candidate List:
 * - [X] Plus button
 * - [X] Minus buttons
 * - [X] Scroll to card when it recevies focus
 *
 * Form validation:
 * - [X] Input trimming
 * - [X] Prevent newlines
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

interface AdminForm {
  name: string;
  description: string;
  email: string;
}

const trimWhitespace = (str: string) => {
  return str.replace(/[\r\n]/g, "").trimLeft();
};

const withTrimWhiteSpace = (b: BaseInputProps) => {
  return {
    ...b,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.target.value = trimWhitespace(e.target.value);
      b.onChange(e);
    }
  };
};

const AdminElection: React.FC<PageProps> = props => {
  const [formState, { text, email }] = useFormState<AdminForm>();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [editModelId, setEditModelId] = useState("0");

  const onChange = (candidates: Candidate[], editModelId: string) => {
    setCandidates(candidates);
    setEditModelId(editModelId);
  };

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
      <MultilineTextInput
        autoFocus
        id="name"
        required
        maxLength={100}
        {...withTrimWhiteSpace(text("name"))}
        className={formState.touched.name ? "touched" : ""}
        validationMessage={"election name is required"}
      />
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
      <MultilineTextInput
        id="description"
        maxLength={100}
        {...withTrimWhiteSpace(text("description"))}
      />
    </FormRow>,
    <FormRow>
      <label htmlFor="email">
        <Bold>Email Address</Bold>
        <p>
          <Caption>
            So we can send you a link to find and manage this election. We will
            never share your contact info with anyone.
          </Caption>
        </p>
      </label>
      <SingleLineTextInput
        id="email"
        required
        {...email("email")}
        className={formState.touched.email ? "touched" : ""}
        validationMessage={"valid email address required"}
      />
    </FormRow>,
    <Flex flexDirection="column" flex="1">
      <Flex p="2px 16px">
        <label htmlFor={cardInputId(editModelId)}>
          <Bold>Candidates</Bold>
          <p>
            <Caption>
              List the candidates competing in this election. Order does not
              matter.
            </Caption>
          </p>
        </label>
      </Flex>
      <CandidateListInput value={candidates} onChange={onChange} />
    </Flex>,
    <Flex flex="1" flexDirection="row" justifyContent="flex-end" p="16px">
      <Button>Save</Button>
    </Flex>
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
      transform: t.x.interpolate(x => `translateX(${(x - 1) * 10}px)`)
    };
  };

  return (
    <Page>
      <Flex flex="1" flexDirection="column" alignItems="center">
        <Content flex="1 0 auto" flexDirection="column">
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
