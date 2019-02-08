import { Flex } from "@rebass/grid";
import styled from "styled-components";
import { useSpring, animated, useTrail, config } from "react-spring";

import {
  elevations,
  pink,
  purple_dark,
  purple_light,
  text_dark
} from "../src/styles";
import { useState, useEffect } from "react";
import Router from "next/router";
import { Page } from "../src/page";

const AnimatedFlex = animated(Flex);

const Panel = styled(animated.div)`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #fcfcfc;
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

const HomePage: React.SFC = () => {
  const [toggle, set] = useState(true);

  useEffect(() => {
    Router.prefetch("/create");
  }, []);

  const onRest = () => {
    if (!toggle) {
      Router.push("/create");
    }
  };

  const trail = useTrail(2, {
    config: config.default,
    x: toggle ? 0 : 1,
    from: { x: 0 },
    onRest
  });

  return (
    <Page>
      <Panel
        style={{
          transform: trail[0].x.interpolate(x => `translateX(${x * 100}%)`)
        }}
      >
        <AnimatedFlex
          flex="1"
          flexDirection="column"
          style={{
            opacity: trail[1].x.interpolate(x => 1 - x)
          }}
        >
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
            <Button onClick={() => set(s => !s)}>HOLD AN ELECTION ></Button>
          </Flex>
          <Flex flex="1" flexDirection="column" justifyContent="flex-end">
            <Flex flexDirection="row" justifyContent="space-around">
              <Link>log in</Link>
              <Link>about us</Link>
            </Flex>
          </Flex>
        </AnimatedFlex>
      </Panel>
      <Panel>
        <Purple>votr</Purple>
      </Panel>
    </Page>
  );
};

export default HomePage;
