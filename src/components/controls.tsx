import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
import { animated } from "react-spring";
import {
  divider,
  opacity,
  pink,
  text_dark,
  text_light,
  white,
  disabled
} from "./styles";
import { Bold } from "./typography";

export const Button = styled.button`
  color: ${pink.css()};
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  min-width: 64px;
  border: 2px solid ${pink.css()};
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
      background: ${pink.alpha(opacity(pink, "hover")).css()};
    }

    &:focus {
      background: ${pink.alpha(opacity(pink, "focus")).css()};
    }

    &:active {
      background: ${pink.alpha(opacity(pink, "pressed")).css()};
    }
  }
`;

export const IconButton = animated(styled.button`
  outline: none;
  border: none;
  height: 48px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${divider.css()};
  background: none;
  font-size: 24px;
  transition: color 0.3s ease-out;

  &[disabled] {
    opacity: 0.38;
    cursor: default;
  }

  &:not([disabled]) {
    &:hover {
      color: ${text_light.css()};
    }

    &:focus {
      color: ${text_light.css()};
      transform: scale(1.05);
    }
  }
`);

export const Link = styled.a`
  font-family: Arial;
  text-decoration: none;
  color: ${pink.css()};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: ${pink.alpha(1 - opacity(pink, "hover")).css()};
  }

  &:focus {
    color: ${pink.alpha(1 - opacity(pink, "focus")).css()};
  }

  &:active {
    color: ${pink.alpha(1 - opacity(pink, "pressed")).css()};
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
  margin-bottom: 8px;
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
    border-color: ${pink.css()};
  }

  &::placeholder {
    font-style: italic;
    color: ${text_light.css()};
  }
`;

export const Label = Bold.withComponent(styled.label());
