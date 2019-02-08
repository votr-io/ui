import { Flex } from "@rebass/grid";
import styled from "styled-components";

import {
  elevations,
  pink,
  purple_dark,
  purple_light,
  text_dark
} from "../src/styles";

const Page = styled(Flex)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  flex: 1;
  flex-direction: row;
`;

const Panel = styled(Flex)`
  flex: 1;
  padding: 16px;
`;

const Purple = styled(Flex)`
  flex: 1;
  background-image: radial-gradient(
    ${purple_light.css()},
    ${purple_dark.css()}
  );
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 48px;
  ${elevations[2].inset}
  font-family: Arial Black, Arial, Helvetica, sans-serif;
  font-weight: 800;
  text-shadow: 2px 2px ${pink.css()};
`;

const Headline = styled(Flex)`
  font-family: Arial Black;
  font-size: 24px;
  line-height: 36px;
  color: ${text_dark.css()};
  text-align: center;
`;

const Subtitle = styled(Flex)`
  font-family: Arial;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: ${text_dark.css()};
`;

const Button = styled.button`
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
    background: ${pink.alpha(0.04).css()};
  }
`;

const Link = styled.a`
  font-family: Arial;
  text-decoration: none;
  color: ${pink.css()};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: ${pink.darken(0.5).css()};
  }
`;

const HomePage: React.SFC = () => (
  <Page>
    <Panel flexDirection="column">
      <Flex flex="1" />
      <Flex
        flex="1"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Headline>simple ranked-choice voting</Headline>
        <Subtitle>unleash the power of democracy</Subtitle>
        <div style={{ height: "48px" }} />
        <Button>HOLD AN ELECTION ></Button>
      </Flex>
      <Flex flex="1" flexDirection="column" justifyContent="flex-end">
        <Flex flexDirection="row" justifyContent="space-around">
          <Link>log in</Link>
          <Link>about us</Link>
        </Flex>
      </Flex>
    </Panel>
    <Panel>
      <Purple>votr</Purple>
    </Panel>
  </Page>
);

export default HomePage;
