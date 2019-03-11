import styled from "@emotion/styled";
import { text_dark, text_light } from "./styles";
import css from "@emotion/css";

export const BaseTextStyles = css`
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: ${text_dark.css()};
  word-break: break-word;
`;

export const Text = styled.span`
  ${BaseTextStyles}
`;

export const Bold = styled(Text)`
  font-weight: bold;
`;

export const Caption = styled(Text)`
  color: ${text_light.css()};
`;

export const Headline = styled(Text)`
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
`;

export const Subheader = styled(Text)`
  font-size: 18px;
  line-height: 24px;
`;

export const Subtitle = styled(Text)`
  font-size: 18px;
  line-height: 24px;
`;
