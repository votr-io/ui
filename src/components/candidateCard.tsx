import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
import React, { useCallback, useLayoutEffect, useRef } from "react";
import { AnimatedFlex } from "./controls";
import { card, divider, makeShadow, text_light, pink } from "./styles";
import { Candidate, PropTypes } from "./types";
import { Bold, Text } from "./typography";
import { TextInput } from "./textInput";

export const CARD_MARGIN = 8;
const Card = styled(AnimatedFlex)<{ elevation?: number }>`
  max-width: 320px;
  min-height: 60px;
  border-radius: 4px;
  border-left: 4px solid #6e6e6e;
  background: ${card.css()};
  padding: 4px 16px;
  transition: all 0.2s ease-out;
  ${p => makeShadow(p.elevation == null ? 2 : p.elevation)}
`;

const BoldEditable = Bold.withComponent(TextInput);
const TextEditable = Text.withComponent(TextInput);

interface Props {
  candidate: Candidate;
  editable?: boolean;
  onCandidateChange?: (c: Candidate) => void;
  onEnter?: (c: Candidate) => void;
  borderColor?: string;
  required?: boolean;
}

export const cardInputId = (id: string) => `card-${id}-name`;
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
        required,
        ...otherProps
      },
      ref
    ) => {
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
            name: e.target.value
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
            description: e.target.value
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

      const content = editable ? (
        <>
          <BoldEditable
            id={cardInputId(candidate.id)}
            type="multi"
            placeholder="name"
            value={candidate.name}
            onChange={onNameChange}
            onKeyPress={onKeyPress}
            maxLength={50}
            disabled={!editable}
            required={required}
            inline
          />
          <TextEditable
            placeholder="description (optional)"
            type="multi"
            value={candidate.description}
            onChange={onDescriptionChange}
            onKeyPress={onKeyPress}
            maxLength={80}
            disabled={!editable}
            inline
          />
        </>
      ) : (
        <>
          <Bold style={{ padding: "4px 0" }}>{candidate.name}</Bold>
          <Text style={{ padding: "4px 0" }}>
            {candidate.description}&nbsp;
          </Text>
        </>
      );

      return (
        <Card
          {...otherProps}
          style={{ borderColor: borderColor || "#555", ...otherProps.style }}
          elevation={elevation || 2}
          onFocus={onCardFocus}
          onBlur={onCardBlur}
          ref={ref}
        >
          <Flex flex="1" flexDirection="column" justifyContent="space-around">
            {content}
          </Flex>
        </Card>
      );
    }
  )
);
