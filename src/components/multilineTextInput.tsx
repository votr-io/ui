import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
import React, { useLayoutEffect, useRef } from "react";
import { isString } from "util";
import { divider, pink, purple, text_light, white, disabled } from "./styles";
import { Caption, Text } from "./typography";

const CharacterCounter = styled(Caption)`
  transition: color 0.2s ease-out, opacity 0.2s ease-out;
  color: ${text_light.css()};
  opacity: 0;
`;

const ValidationError = styled(Caption)`
  transition: opacity 0.2s ease-out;
  color: ${pink.css()};
  opacity: 0;
`;

const VERTICAL_PADDING = 8;
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

  &:hover {
    border-color: ${disabled.css()};
  }

  &:focus {
    border-color: ${text_light.css()};
  }

  &::placeholder {
    font-style: italic;
    color: ${text_light.css()};
    font-weight: normal;
  }
`);

const InputWrapper = styled(Flex)`
  flex-direction: column;
  margin-bottom: 4px;

  &:focus-within ${CharacterCounter} {
    opacity: 1;
  }

  &.touched ${TextArea}:invalid {
    border-color: ${pink.css()};
  }

  &.touched ${TextArea}:invalid ~ ${ValidationError} {
    opacity: 1;
  }
`;

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

const TextInput: React.FC<MultilineTextInputProps> = React.memo(
  ({ style, className, validationMessage, children, maxLength, value }) => {
    maxLength = maxLength || 0;
    const length = isString(value) && value.length;

    return (
      <InputWrapper {...{ className, style }}>
        {children}
        {/* <Flex
          pl="8px"
          flexDirection="row"
          justifyContent="space-between"
          style={{ height: 20 }}
        > */}
        <ValidationError>{validationMessage}</ValidationError>
        {maxLength > 0 ? (
          <CharacterCounter>
            {length}/{maxLength}
          </CharacterCounter>
        ) : null}
        {/* </Flex> */}
      </InputWrapper>
    );
  }
);

export const MultilineTextInput: React.FC<MultilineTextInputProps> = React.memo(
  ({ style, className, validationMessage, ...otherProps }) => {
    const el = useRef<HTMLTextAreaElement>(null);

    useLayoutEffect(() => {
      resize(el.current);
    });

    const { value, maxLength } = otherProps;

    return (
      <TextInput {...{ style, className, validationMessage, value, maxLength }}>
        <TextArea rows={1} ref={el} {...otherProps} />
      </TextInput>
    );
  }
);

const Input = TextArea.withComponent(styled.input<{ invalid: boolean }>``);

type SingleLineTextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  validationMessage?: string;
};
export const SingleLineTextInput: React.FC<
  SingleLineTextInputProps
> = React.memo(({ style, className, validationMessage, ...otherProps }) => {
  const el = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    resize(el.current);
  });

  const { value, maxLength } = otherProps;

  return (
    <TextInput {...{ style, className, validationMessage, value, maxLength }}>
      <Input
        {...otherProps}
        invalid={validationMessage != null && validationMessage.length > 0}
      />
    </TextInput>
  );
});
