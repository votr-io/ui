import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
import React, { useCallback, useLayoutEffect, useRef } from "react";
import { divider, pink, purple, text_light, white } from "./styles";
import { Caption, Text } from "./typography";
import { isString } from "util";
import { css } from "@emotion/core";

const CharacterCounter = styled(Caption)`
  position: absolute;
  right: 8px;
  bottom: 0;
  transition: color 0.2s ease-out, opacity 0.2s ease-out;
  color: ${text_light.css()};
  opacity: 0;
`;

const ValidationError = styled(Caption)`
  color: ${pink.css()};
`;

const VERTICAL_PADDING = 8;

const textInputStyles = css``;

const TextArea = Text.withComponent(styled.textarea`
  position: relative;
  padding: ${VERTICAL_PADDING}px 8px ${VERTICAL_PADDING - 1}px;
  border: 0px;
  border: 1px solid ${divider.css()};
  outline: none;
  transition: border-color 0.2s ease-out;
  resize: none;
  background: ${white.css()};
  border-radius: 4px;

  &:focus {
    border-color: ${purple.css()};
  }

  &::placeholder {
    font-style: italic;
    color: ${text_light.css()};
    font-weight: normal;
  }

  &:focus + ${CharacterCounter} {
    opacity: 1;
  }

  &:not(:valid) {
    border-color: ${pink.css()};
  }
`);

const resize = (el: HTMLTextAreaElement | null) => {
  if (el == null) {
    return;
  }
  el.style.height = "0px";
  el.style.height = `${el.scrollHeight - VERTICAL_PADDING * 2}px`;
};

type MultilineTextInputProps = React.TextareaHTMLAttributes<
  HTMLTextAreaElement
> & {
  validationMessage?: string;
};

export const MultilineTextInput: React.FC<MultilineTextInputProps> = React.memo(
  ({ style, className, validationMessage, ...otherProps }) => {
    const el = useRef<HTMLTextAreaElement>(null);

    useLayoutEffect(() => {
      resize(el.current);
    });

    const maxLength = otherProps.maxLength || 0;
    const length = isString(otherProps.value) && otherProps.value.length;

    return (
      <Flex
        flexDirection="column"
        mb="4px"
        className={className}
        style={{ position: "relative", ...style }}
      >
        <TextArea rows={1} ref={el} {...otherProps} />
        {maxLength > 0 ? (
          <CharacterCounter>
            {length}/{maxLength}
          </CharacterCounter>
        ) : null}
        <Flex pl="8px" pr="60px" style={{ height: 20 }}>
          <ValidationError>{validationMessage}</ValidationError>
        </Flex>
      </Flex>
    );
  }
);

const TextInput = TextArea.withComponent(styled.input());

type SingleLineTextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  validationMessage?: string;
};
export const SingleLineTextInput: React.FC<
  SingleLineTextInputProps
> = React.memo(({ style, className, validationMessage, ...otherProps }) => {
  const maxLength = otherProps.maxLength || 0;
  const length = isString(otherProps.value) && otherProps.value.length;

  return (
    <Flex
      flexDirection="column"
      mb="4px"
      className={className}
      style={{ position: "relative", ...style }}
    >
      <TextInput {...otherProps} />
      {maxLength > 0 ? (
        <CharacterCounter>
          {length}/{maxLength}
        </CharacterCounter>
      ) : null}
      <Flex pl="8px" pr="60px" style={{ height: 20 }}>
        <ValidationError>{validationMessage}</ValidationError>
      </Flex>
    </Flex>
  );
});
