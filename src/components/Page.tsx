import styled from '@emotion/styled';
import { Link, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { background, blue, red, tan, theme, white } from '../theme';
import { UserContext } from '../user/context';
import { AccountMenu } from './AccountMenu';
import { LoginButton } from './LoginButton';

export interface PageProps {
  header?: boolean;
}

const MAX_WIDTH = 1080;
const CARD_MARGIN = theme.spacing(3);
const CARD_PADDING = theme.spacing(2);

export const Page: React.FC<PageProps> = props => {
  const [userState] = useContext(UserContext);

  return (
    <Background>
      {props.header && (
        <Header>
          <HeaderContainer>
            <Typography variant="h6">
              <Link component={RouterLink} to="/" underline="none">
                VOTR
              </Link>
            </Typography>
            {userState.phase !== 'loggedIn' && <LoginButton />}
            {userState.phase === 'loggedIn' && <AccountMenu />}
          </HeaderContainer>
        </Header>
      )}
      <Content>{props.children}</Content>
    </Background>
  );
};

const Content: React.FC = ({ children }) => (
  <ScrollWrapper>
    <Container>
      <Card>{children}</Card>
    </Container>
  </ScrollWrapper>
);

const Container = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  box-sizing: border-box;
  margin: auto;
  padding: ${CARD_MARGIN}px;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  box-sizing: border-box;
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  box-sizing: border-box;
  padding: 0 ${CARD_MARGIN + CARD_PADDING}px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const Card = styled.div`
  box-shadow: ${theme.shadows[2]};
  padding: ${CARD_PADDING}px;
  background: ${white};
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  box-sizing: border-box;
`;

const Background: React.FC = ({ children }) => (
  <BackgroundWrapper>
    <BlueTriangle></BlueTriangle>
    <RedTriangle></RedTriangle>
    <Circle radius={40}></Circle>
    <Circle radius={60}></Circle>
    <Circle radius={90}></Circle>
    <Circle radius={120}></Circle>
    <Line angle={30} color={blue}></Line>
    <Line angle={5} color={blue}></Line>
    <Line angle={170} color={red}></Line>
    <Line angle={105} color={background}></Line>
    <Line angle={85} color={background}></Line>
    <Vingette></Vingette>
    <ContentWrapper>{children}</ContentWrapper>
  </BackgroundWrapper>
);

const Header = styled.div`
  box-shadow: ${theme.shadows[2]};
  background: ${white};
  padding: ${theme.spacing(2)}px 0;
  flex: 0 0 auto;
  z-index: 1;
`;

const Vingette = styled.div`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: radial-gradient(circle, transparent 50%, ${blue} 180%);
  mix-blend-mode: difference;
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
  /* background: ${background}; */
  background: radial-gradient(${tan} 2px, transparent 2px),
    radial-gradient(${tan} 2px, transparent 2px), ${background};
  background-position: 0 0, 8px 8px;
  background-size: 16px 16px;
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
  background: radial-gradient(${tan} 2px, transparent 2px),
    radial-gradient(${tan} 2px, transparent 2px), transparent;
  background-position: 0 0, 8px 8px;
  background-size: 16px 16px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const PolkaDotsBG = styled.div`
  background: radial-gradient(${tan} 2px, transparent 2px),
    radial-gradient(${tan} 2px, transparent 2px), transparent;
  background-position: 0 0, 8px 8px;
  background-size: 16px 16px;
  position: absolute;
`;
