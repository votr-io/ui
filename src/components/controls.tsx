import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
import { animated } from "react-spring";
import {
  divider,
  opacity,
  purple,
  text_dark,
  text_light,
  white
} from "./styles";
import { Bold } from "./typography";

export const Button = styled.button`
  color: ${purple.css()};
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  min-width: 64px;
  border: 2px solid ${purple.css()};
  border-radius: 2px;
  background: none;
  outline: none;
  cursor: pointer;

  &[disabled] {
    opacity: 0.38;
    cursor: default;
  }

  &:not([disabled]) {
    &:hover {
      background: ${purple.alpha(opacity(purple, "hover")).css()};
    }

    &:focus {
      background: ${purple.alpha(opacity(purple, "focus")).css()};
    }

    &:active {
      background: ${purple.alpha(opacity(purple, "pressed")).css()};
    }
  }
`;

export const IconButton = styled.button`
  outline: none;
  border: none;
  height: 48px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${text_light.css()};
  background: none;
  font-size: 24px;
  transition: color 0.3s ease-out;

  &[disabled] {
    opacity: 0.38;
    cursor: default;
  }

  &:not([disabled]) {
    &:hover {
      color: ${text_dark.css()};
    }

    &:focus {
      color: ${purple.css()};
    }

    &:active {
      color: ${purple.css()};
    }
  }
`;

export const Link = styled.a`
  font-family: Arial;
  text-decoration: none;
  color: ${purple.css()};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: ${purple.alpha(1 - opacity(purple, "hover")).css()};
  }

  &:focus {
    color: ${purple.alpha(1 - opacity(purple, "focus")).css()};
  }

  &:active {
    color: ${purple.alpha(1 - opacity(purple, "pressed")).css()};
  }
`;

export const Form = styled.form`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;
export const AnimatedFlex = animated(Flex);

export const FormHeader = styled(Flex)`
  flex: 1;
  padding: 8px 16px;
`;

export const FormRow = styled(Flex)`
  position: relative;
  flex: 1;
  flex-direction: column;
  padding: 2px 16px;
`;

export const Input = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  padding: 7px;
  border: 1px solid ${divider.css()};
  border-radius: 2px;
  background: ${white.css()};
  box-sizing: border-box;
  margin: 0 -8px;

  outline: none;
  transition: border-color 0.15s ease-out;

  &:hover {
    border-color: ${text_light.css()};
  }

  &:focus {
    border-color: ${purple.css()};
  }

  &::placeholder {
    font-style: italic;
    color: ${text_light.css()};
  }
`;

export const Label = Bold.withComponent(styled.label());
