import styled from "@emotion/styled";
import { Flex } from "@rebass/grid/emotion";
import NextLink from "next/link";
import { animated, config, useTrail } from "react-spring";
import { Button, Link } from "../components/controls";
import { Page } from "../components/page";
import { ROUTES } from "../components/routes";
import {
  elevations,
  gradient_dark,
  gradient_light,
  pink
} from "../components/styles";
import { PageProps } from "../components/types";
import { Headline, Subtitle } from "../components/typography";

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

const HomePage: React.SFC<PageProps> = props => {
  const isEntering = props.transitionState === "enter";
  const isExiting = props.transitionState === "exit";

  const trail = useTrail(2, {
    config: config.default,
    x: isExiting ? 1 : 0,
    from: { x: isEntering ? 1 : 0 },
    onRest: props.onTransitionComplete
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
            <NextLink href={ROUTES.admin}>
              <Button>HOLD AN ELECTION ></Button>
            </NextLink>
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
