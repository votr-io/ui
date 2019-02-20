import { background } from "./styles";
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
  padding: 16px;
  overflow: auto;
`;
