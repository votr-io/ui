import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
import Router from "next/router";
import { useEffect, useState } from "react";
import { animated, config, useTrail } from "react-spring";
import { Button, Link } from "../src/controls";
import { Page } from "../src/page";
import { elevations, gradient_dark, gradient_light, pink } from "../src/styles";
import { Headline, Subtitle } from "../src/typography";

const AnimatedFlex = animated(Flex);

const Panel = styled(animated.div)`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #fcfcfc;
`;

const Purple = styled(Flex)`
  flex: 1;
  background-image: linear-gradient(
    ${gradient_dark.css()},
    ${gradient_light.css()}
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
