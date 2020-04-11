import React from "react";
import { Grid, Typography, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { blue, red, background, white, tan, theme } from "../theme";

export interface PageProps {
  header?: boolean;
}

export const Page: React.FC<PageProps> = props => {
  return (
    <Background>
      {props.header && (
        <Header>
          <Container>
            <Typography variant="h6">VOTR</Typography>
          </Container>
        </Header>
      )}
      <Content>{props.children}</Content>
    </Background>
  );
};

const Content: React.FC = ({ children }) => (
  <ScrollWrapper>
    <PolkaDots>
      <ContentCard>{children}</ContentCard>
    </PolkaDots>
  </ScrollWrapper>
);

const ContentCard = styled.div`
  padding: ${theme.spacing(2)}px;
  box-shadow: ${theme.shadows[4]};
  background: ${white};
  display: flex;
  flex: 1 0 auto;
`;

const Background: React.FC = ({ children }) => (
  <BackgroundWrapper>
    <BlueTriangle></BlueTriangle>
    <RedTriangle></RedTriangle>
    <Circle radius={40}></Circle>
    <Circle radius={60}></Circle>
    <Circle radius={90}></Circle>
    <Circle radius={120}></Circle>
    <Line angle={25} color={blue}></Line>
    <Line angle={170} color={red}></Line>
    <Line angle={105} color={background}></Line>
    <Line angle={85} color={background}></Line>
    <ContentWrapper>{children}</ContentWrapper>
  </BackgroundWrapper>
);

const Header = styled.div`
  background: ${white};
  padding: ${theme.spacing(2)}px;
  flex: 0 0 auto;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;

const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  overflow: auto;
  align-items: center;
`;

const BackgroundWrapper = styled.div`
  background: ${background};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
`;

const BlueTriangle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  border-bottom: 100vh solid ${blue};
  border-right: 50vw solid transparent;
`;

const RedTriangle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  border-bottom: 60vh solid ${red};
  border-left: 50vw solid transparent;
`;

const Circle = styled.div<{ radius: number }>`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  border: 2px solid ${white};
  border-radius: 50%;
  width: ${p => `${p.radius}vmax`};
  height: ${p => `${p.radius}vmax`};
`;

const height = 100;
const Line = styled.div<{ angle: number; color: string }>`
  position: absolute;
  bottom: -${height / 2}px;
  left: 50%;
  width: 100vmax;
  height: ${height}px;
  box-sizing: border-box;
  border-right: 100vmax solid ${p => p.color};
  border-top: ${height / 2}px solid transparent;
  border-bottom: ${height / 2}px solid transparent;
  transform-origin: 0% 50%;
  transform: rotate(${p => p.angle - 180}deg);
`;

const PolkaDots = styled.div`
  padding: ${theme.spacing(2)}px;
  margin: ${theme.spacing(2)}px;
  background: radial-gradient(${tan} 2px, transparent 2px),
    radial-gradient(${tan} 2px, transparent 2px), transparent;
  background-position: 0 0, 8px 8px;
  background-size: 16px 16px;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 100%;
  max-width: 1268px;
`;
