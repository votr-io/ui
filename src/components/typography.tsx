import styled from "@emotion/styled";
import { text_dark } from "./styles";

export const Text = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: ${text_dark.css()};
`;

export const Bold = styled(Text)`
  font-weight: bold;
`;

export const Headline = styled(Text)`
  font-family: Arial Black;
  font-size: 24px;
  line-height: 36px;
`;

export const Subheader = styled(Text)`
  font-family: Arial;
  font-size: 18px;
  line-height: 24px;
`;

export const Subtitle = styled(Text)`
  font-size: 18px;
  line-height: 24px;
`;
