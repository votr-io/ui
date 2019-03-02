import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
import React, { useCallback, useLayoutEffect } from "react";
import { AnimatedFlex } from "./controls";
import { card, divider, makeShadow, pink } from "./styles";
import { Candidate, PropTypes } from "./types";
import { Bold, Text } from "./typography";

const Card = styled(AnimatedFlex)<{ elevation?: number }>`
  max-width: 320px;
  min-height: 60px;
  border-radius: 4px;
  border-left: 4px solid #6e6e6e;
  background: ${card.css()};
  padding: 4px 16px;
  margin: 8px 0;
  ${p => makeShadow(p.elevation == null ? 2 : p.elevation)}
`;

const TEXTAREA_PADDING = 4;
const Editable = styled.textarea<{ disabled?: boolean }>`
  position: relative;
  flex: 1 0 auto;
  padding: ${TEXTAREA_PADDING}px 0;
  border: 0px;
  border-bottom: 1px solid ${p => (p.disabled ? "transparent" : divider.css())};
  margin-bottom: 0.5em;
  outline: none;
  transition: border-color 0.2s ease-out;
  resize: none;

  &:focus {
    border-color: ${pink.css()};
  }
`;

const BoldEditable = Bold.withComponent(Editable);
const TextEditable = Text.withComponent(Editable);

interface Props {
  candidate: Candidate;
  editable?: boolean;
  onCandidateChange?: (c: Candidate) => void;
  onEnter?: () => void;
  borderColor?: string;
}

const resize = ($el: HTMLElement | null) => {
  if ($el == null) {
    return;
  }
  $el.style.height = "0px";
  $el.style.height = `${$el.scrollHeight - TEXTAREA_PADDING * 2}px`;
};

const removeNewlines = (str: string) => str.replace(/(\r\n|\n|\r)/gm, "");

export const CandidateCard: React.FC<
  Props & PropTypes<typeof Card>
> = React.memo(
  ({
    children,
    editable,
    onCandidateChange,
    candidate,
    borderColor,
    elevation,
    onEnter,
    ...otherProps
  }) => {
    const $name = React.createRef<HTMLTextAreaElement>();
    const $description = React.createRef<HTMLTextAreaElement>();

    const onNameChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (candidate == null || onCandidateChange == null) {
          return;
        }
        onCandidateChange({
          ...candidate,
          name: removeNewlines(e.target.value)
        });
      },
      [candidate, onCandidateChange]
    );

    const onDescriptionChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (candidate == null || onCandidateChange == null) {
          return;
        }
        onCandidateChange({
          ...candidate,
          description: removeNewlines(e.target.value)
        });
      },
      [candidate, onCandidateChange]
    );

    const onKeyPress = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (onEnter != null && e.which === 13) {
          onEnter();
        }
      },
      [onEnter]
    );

    useLayoutEffect(() => {
      resize($name.current);
      resize($description.current);
    });

    return (
      <Card
        {...otherProps}
        style={{ borderColor: borderColor || "#555", ...otherProps.style }}
        elevation={elevation || 2}
      >
        {candidate == null || children ? (
          children
        ) : (
          <Flex flex="1" flexDirection="column" justifyContent="space-around">
            <BoldEditable
              id={otherProps.id == null ? undefined : `${otherProps.id}-name`}
              ref={$name}
              placeholder="name (required)"
              rows={1}
              value={candidate.name}
              onChange={onNameChange}
              onKeyPress={onKeyPress}
              maxLength={50}
              disabled={!editable}
              required
            />
            <TextEditable
              ref={$description}
              placeholder="description"
              rows={1}
              value={candidate.description}
              onChange={onDescriptionChange}
              onKeyPress={onKeyPress}
              maxLength={80}
              disabled={!editable}
            />
          </Flex>
        )}
      </Card>
    );
  }
);
