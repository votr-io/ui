import { Flex } from "@rebass/grid/emotion";
import React, { useCallback, useState } from "react";
import { useFormState } from "react-use-form-state";
import { cardInputId } from "../src/components/candidateCard";
import { CandidateListInput } from "../src/components/candidateList";
import {
  AnimatedFlex,
  Button,
  FormHeader,
  FormRow
} from "../src/components/controls";
import { Content, Page } from "../src/components/page";
import { usePageTransition } from "../src/components/pageTransition";
import { TextInput } from "../src/components/textInput";
import { Candidate, PageProps } from "../src/components/types";
import { Bold, Caption, Headline } from "../src/components/typography";

/**
 * Candidate List:
 * - [X] Plus button
 * - [X] Minus buttons
 * - [X] Scroll to card when it recevies focus
 *
 * Form validation:
 * - [X] Input trimming
 * - [X] Prevent newlines
 *
 * Card Validation:
 * - Useformstate
 * - Update state on blur
 * - No empty names
 * - No duplicated names
 * - Character limit
 * - Dont animate initial render
 *
 * Save Button
 * - Login flow
 * - Form validation, focus first invalid input
 * - Figure out next state (election created, sharable link, start / stop)
 */

interface AdminForm {
  name: string;
  description: string;
  email: string;
}

const AdminElection: React.FC<PageProps> = props => {
  const [formState, { text, email }] = useFormState<AdminForm>();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [editModelId, setEditModelId] = useState("");

  const onChange = useCallback(
    (candidates: Candidate[], editModelId: string) => {
      setCandidates(candidates);
      setEditModelId(editModelId);
    },
    []
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (candidates.length < 2) {
        const editModel = document.getElementById(cardInputId(editModelId));
        if (editModel == null) {
          return;
        }
        editModel.focus();
        return;
      }
    },
    [candidates, editModelId]
  );

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
      <TextInput
        autoFocus
        id="name"
        required
        maxLength={100}
        {...text("name")}
        type="multi"
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
      <TextInput
        id="description"
        maxLength={100}
        {...text("description")}
        type="multi"
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
      <TextInput id="email" required {...email("email")} />
    </FormRow>,
    <Flex flexDirection="column" flex="1">
      <Flex p="2px 16px">
        <label htmlFor={cardInputId(editModelId)}>
          <Bold>Candidates</Bold>
          <p>
            <Caption>
              List the candidates competing in this election. At least 2
              required, order does not matter.
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
      transform: t.x.interpolate(x => `translateX(${(x - 1) * 10}px)`),
      zIndex: formElements.length - i
    };
  };

  return (
    <Page>
      <Flex flex="1" flexDirection="column" alignItems="center">
        <Content flex="1 0 auto" flexDirection="column">
          <form
            onSubmit={onSubmit}
            style={{ display: "flex", flex: "1", flexDirection: "column" }}
          >
            {formElements.map((row, i) => {
              return (
                <AnimatedFlex
                  key={i}
                  style={animate(i)}
                  flex={i === 4 ? "1 0 auto" : "0 0 auto"}
                >
                  {row}
                </AnimatedFlex>
              );
            })}
          </form>
        </Content>
      </Flex>
    </Page>
  );
};

export default AdminElection;
