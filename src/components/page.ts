import { background, foreground, makeShadow } from "./styles";
import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";

export const Page = styled(Flex)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  flex: 1;
  flex-direction: row;
  background: ${background.css()};
  overflow: auto;
`;

export const Content = styled(Flex)`
  width: 100%;
  max-width: 1024px;
  background: ${foreground.css()};
  ${makeShadow(4)}
`;
