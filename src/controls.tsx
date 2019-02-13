import styled from "@emotion/styled";
import { pink, text_dark, divider, text_light, opacity } from "./styles";
import { animated } from "react-spring";
import { Flex } from "@rebass/grid";

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

  &:hover {
    background: ${pink.alpha(opacity(pink, "hover")).css()};
  }

  &:focus {
    background: ${pink.alpha(opacity(pink, "focus")).css()};
  }

  &:active {
    background: ${pink.alpha(opacity(pink, "pressed")).css()};
  }
`;

export const Link = styled.a`
  font-family: Arial;
  text-decoration: none;
  color: ${text_light.css()};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: ${text_light.darken(0.5).css()};
  }
`;

export const Form = styled.form`
  flex: 1 0 auto;
  display: flex;
  width: 480px;
  flex-direction: column;
`;
export const AnimatedFlex = animated(Flex);

export const FormHeader = styled(AnimatedFlex)`
  margin: 16px 0;
  padding: 8px 16px;
  border-bottom: 1px solid ${text_dark.css()};
`;

export const FormRow = styled(AnimatedFlex)`
  flex-direction: column;
  padding: 8px 16px;
  margin-bottom: 16px;
`;

export const Input = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  border: 1px solid ${divider.css()};
  border-radius: 2px;
  padding: 4px 8px;
  margin: 0 -8px;
  background: none;
  box-sizing: border-box;

  outline: none;
  transition: border-color 0.15s ease-out;

  &:hover {
    border-color: ${text_light.css()};
  }

  &:focus {
    border-color: ${pink.css()};
  }
`;

export const Label = styled.label`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: ${text_light.css()};
  margin-bottom: 8px;
`;
