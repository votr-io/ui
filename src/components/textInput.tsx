import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { isString } from "util";
import { disabled, divider, pink, text_light, white } from "./styles";
import { Caption, Text } from "./typography";

const CharacterCounter = styled(Caption)`
  display: flex;
  line-height: inherit;
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 7px;
  right: 8px;
  transition: color 0.2s ease-out, opacity 0.2s ease-out;
  color: ${text_light.css()};
  opacity: 0;
`;

// TODO: move the border to the input wrapper, use flex to layout text & character counter instead
// of magic numbers
const TextArea = Text.withComponent(styled.textarea`
  position: relative;
  padding: 7px;
  border: 1px solid ${divider.css()};
  outline: none;
  transition: border-color 0.2s ease-out;
  resize: none;
  background: ${white.css()};
  border-radius: 4px;
  box-sizing: border-box;

  &:disabled {
    opacity: 0.38;
  }
  &:enabled {
    &:hover {
      border-color: ${disabled.css()};
    }

    &:focus {
      border-color: ${text_light.css()};
    }
  }

  &::placeholder {
    font-style: italic;
    color: ${disabled.css()};
    font-weight: normal;
  }

  .inline & {
    border-width: 0 0 1px 0;
    border-radius: 0;
    padding: 4px 0;
  }

  .touched &:invalid {
    border-color: ${pink.css()};
  }
  .touched &:invalid ~ ${CharacterCounter} {
    color: ${pink.css()};
  }
`);
const Input = TextArea.withComponent(styled.input());

const InputWrapper = styled(Flex)`
  position: relative;
  flex-direction: column;
  margin-bottom: 4px;

  &:focus-within ${CharacterCounter} {
    opacity: 1;
  }
`;

const resize = (el: HTMLTextAreaElement | HTMLInputElement | null) => {
  if (el == null) {
    return;
  }
  el.style.height = "0px";
  el.style.height = `${el.scrollHeight + 2}px`;
};

export type InputType = HTMLInputElement | HTMLTextAreaElement;

type TextInputProps = React.TextareaHTMLAttributes<InputType> & {
  type: HTMLInputElement["type"];
  inline?: boolean;
};

const trimWhitespace = (str: string) => {
  return str.replace(/[\r\n]/g, "").trimLeft();
};

export const TextInput: React.FC<TextInputProps> = React.memo(props => {
  const [touched, setTouched] = useState(false);
  let { style, className, maxLength, value, type, inline, disabled } = props;
  maxLength = maxLength || 0;
  const length = isString(value) && value.length;
  const el = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    resize(el.current);
  });

  const isMulti = type === "multi";
  const Content = isMulti ? TextArea : Input;

  const onBlur = useCallback(
    (e: React.FocusEvent<InputType>) => {
      if (props.onBlur) {
        props.onBlur(e);
      }
      setTouched(true);
    },
    [props.onBlur]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<InputType>) => {
      e.target.value = trimWhitespace(e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    },
    [props.onChange]
  );

  const onInvalid = useCallback(
    (e: React.FormEvent<InputType>) => {
      if (props.onInvalid) {
        props.onInvalid(e);
      }
      setTouched(true);
    },
    [props.onInvalid]
  );

  const showCharacterCounter = maxLength > 0 && !disabled;

  return (
    <InputWrapper
      className={[
        className,
        touched ? "touched" : "",
        inline ? "inline" : ""
      ].join(" ")}
      style={style}
    >
      {
        <Content
          {...props}
          rows={1}
          //@ts-ignore only ref textarea
          ref={isMulti ? el : null}
          onBlur={onBlur}
          onChange={onChange}
          onInvalid={onInvalid}
          style={{ paddingRight: showCharacterCounter ? 60 : 0 }}
        />
      }
      {showCharacterCounter ? (
        <CharacterCounter>
          {length}/{maxLength}
        </CharacterCounter>
      ) : null}
    </InputWrapper>
  );
});
