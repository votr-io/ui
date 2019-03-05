import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
import React, { useCallback, useLayoutEffect, useRef } from "react";
import { AnimatedFlex } from "./controls";
import { card, divider, makeShadow, pink, text_light } from "./styles";
import { Candidate, PropTypes } from "./types";
import { Bold, Text } from "./typography";

export const CARD_MARGIN = 8;
const Card = styled(AnimatedFlex)<{ elevation?: number }>`
  max-width: 320px;
  min-height: 60px;
  border-radius: 4px;
  border-left: 4px solid #6e6e6e;
  background: ${card.css()};
  padding: 4px 16px;
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

  &::placeholder {
    font-style: italic;
    color: ${text_light.css()};
    font-weight: normal;
  }
`;

const BoldEditable = Bold.withComponent(Editable);
const TextEditable = Text.withComponent(Editable);

interface Props {
  candidate: Candidate;
  editable?: boolean;
  onCandidateChange?: (c: Candidate) => void;
  onEnter?: (c: Candidate) => void;
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
  React.forwardRef(
    (
      {
        children,
        editable,
        onCandidateChange,
        candidate,
        borderColor,
        elevation,
        onEnter,
        onFocus,
        onBlur,
        ...otherProps
      },
      ref
    ) => {
      const $name = React.createRef<HTMLTextAreaElement>();
      const $description = React.createRef<HTMLTextAreaElement>();

      const isFocused = useRef(false);
      const blurTimeout = useRef(0);
      const onCardFocus = useCallback(
        (e: React.FocusEvent<HTMLDivElement>) => {
          isFocused.current = true;
          if (onFocus == null) {
            return;
          }
          onFocus(e);
        },
        [onFocus]
      );

      const onCardBlur = useCallback(
        (e: React.FocusEvent<HTMLDivElement>) => {
          isFocused.current = false;
          if (onBlur == null || isFocused.current) {
            return;
          }
          window.clearTimeout(blurTimeout.current);
          blurTimeout.current = window.setTimeout(() => {
            if (isFocused.current) {
              return;
            }
            onBlur(e);
          }, 0);
        },
        [onBlur]
      );

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
          if (e.which === 13) {
            e.preventDefault();
            if (onEnter != null) {
              onEnter(candidate);
            }
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
          onFocus={onCardFocus}
          onBlur={onCardBlur}
          ref={ref}
        >
          {candidate == null || children ? (
            children
          ) : (
            <Flex flex="1" flexDirection="column" justifyContent="space-around">
              <BoldEditable
                id={otherProps.id == null ? undefined : `${otherProps.id}-name`}
                ref={$name}
                placeholder="name"
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
                placeholder="description (optional)"
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
  )
);
