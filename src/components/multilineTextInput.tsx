import styled from "@emotion/styled";
import { divider, pink, text_light, purple, white } from "./styles";
import { Text, Caption } from "./typography";
import React, { useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { Flex } from "@rebass/grid/emotion";
import { isString } from "util";

interface CharacterCounterProps {
  isMax: boolean;
}
const CharacterCounter = styled(Caption)<CharacterCounterProps>`
  transition: color 0.2s ease-out, opacity 0.2s ease-out;
  color: ${p => (p.isMax ? pink.css() : text_light.css())};
`;

const VERTICAL_PADDING = 4;
const TextArea = Text.withComponent(styled.textarea<CharacterCounterProps>`
  position: relative;
  padding: ${VERTICAL_PADDING}px 8px;
  border: 0px;
  border-bottom: 1px solid ${divider.css()};
  outline: none;
  transition: border-color 0.2s ease-out;
  resize: none;
  background: ${white.css()};
  border-radius: 4px 4px 0 0;

  &:focus {
    border-color: ${purple.css()}};
  }

  &::placeholder {
    font-style: italic;
    color: ${text_light.css()};
    font-weight: normal;
  }

  &:focus ${CharacterCounter} {
    opacity: 1;
  }
`);

const resize = (el: HTMLTextAreaElement | null) => {
  if (el == null) {
    return;
  }
  el.style.height = "0px";
  el.style.height = `${el.scrollHeight - VERTICAL_PADDING * 2}px`;
};

export const MultilineTextInput: React.FC<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = React.memo(props => {
  const { value, maxLength } = props;
  const el = useRef<HTMLTextAreaElement>(null);

  const hasMaxLength = useMemo(() => maxLength != null && maxLength > 0, [
    maxLength
  ]);
  const hasValue = useMemo(() => isString(value), [value]);
  const isMax = useMemo(
    () => hasMaxLength && hasValue && value.length >= maxLength,
    [value, maxLength]
  );

  useLayoutEffect(() => {
    resize(el.current);
  });

  return (
    <Flex flexDirection="column" mb="4px">
      <TextArea rows={1} {...props} ref={el} isMax={isMax} />
      <Flex flexDirection="row" justifyContent="flex-end" mt="0px">
        {hasMaxLength ? (
          <CharacterCounter isMax={isMax}>
            {value.length}/{maxLength}
          </CharacterCounter>
        ) : null}
      </Flex>
    </Flex>
  );
});
