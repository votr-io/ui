import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
import React, { useCallback, useRef } from "react";
import { AnimatedFlex } from "./controls";
import { card, makeShadow } from "./styles";
import { TextInput } from "./textInput";
import { Candidate, PropTypes } from "./types";
import { Bold, Text } from "./typography";

export const CARD_MARGIN = 8;
const Card = styled(AnimatedFlex)`
  max-width: 320px;
  min-height: 60px;
  border-radius: 4px;
  border-left: 4px solid #6e6e6e;
  background: ${card.css()};
  padding: 4px 16px;
  transition: all 0.2s ease-out;
  ${makeShadow(2)}

  &.dragging {
    opacity: 0.8;
    transform: scale(1.1);
    ${makeShadow(4)}
  }
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

export type CandidateCardProps = Props & PropTypes<typeof Card>;

export const cardInputId = (id: string) => `card-${id}-name`;
export const CandidateCard: React.FC<CandidateCardProps> = React.memo(
  React.forwardRef(
    (
      {
        children,
        editable,
        onCandidateChange,
        candidate,
        borderColor,
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
