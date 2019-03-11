import { css, Global } from "@emotion/core";
import Client from "apollo-boost";
import { NextComponentType } from "next";
import App, {
  AppProps,
  Container,
  DefaultAppIProps,
  NextAppContext
} from "next/app";
import Head from "next/head";
import React, { useMemo } from "react";
import { ApolloProvider } from "react-apollo-hooks";
import NoSSR from "react-no-ssr";
import { background } from "../src/components/styles";
import { PageProps, TransitionState } from "../src/components/types";
import { BaseTextStyles } from "../src/components/typography";

const globalStyles = css`
  html,
  body,
  #__next {
    height: 100%;
    width: 100%;
    display: flex;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  body {
    background: ${background.css()};
    ${BaseTextStyles}
  }

  p {
    margin: 2px 0;
  }
`;

interface State {
  Component: NextComponentType<PageProps>;
  path: string;
  transitionState: TransitionState;
}

type Props = DefaultAppIProps & AppProps;

const ClientProvider: React.FC = ({ children }) => {
  const client = useMemo(
    () =>
      new Client({
        uri: "https://votr-graphql.herokuapp.com/graphql"
      }),
    []
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default class MyApp extends App<{}, State> {
  private nextComponent: NextComponentType<PageProps>;
  private nextPath: string;

  static async getInitialProps(context: NextAppContext) {
    const { Component, router, ctx } = context;
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  constructor(props: any) {
    super(props);

    const { Component, router } = this.props;
    const path = router.asPath || "";

    this.state = {
      Component,
      path: path,
      transitionState: "none"
    };
    this.nextComponent = Component;
    this.nextPath = path;
  }

  shouldComponentUpdate(props: Props) {
    const { Component, router } = props;

    const nextPath = router.asPath || "";

    if (nextPath !== this.nextPath) {
      this.nextComponent = Component;
      this.nextPath = router.asPath || "";
      this.setState({
        transitionState: "exit"
      });

      return false;
    }

    return true;
  }

  private onTransitionComplete = () => {
    this.setState(s => {
      const transitionState = s.transitionState === "exit" ? "enter" : "none";
      const Component =
        transitionState === "enter" ? this.nextComponent : s.Component;
      const path = transitionState === "enter" ? this.nextPath : s.path;

      if (
        transitionState == s.transitionState &&
        Component === s.Component &&
        path === s.path
      ) {
        return null;
      }

      return {
        transitionState,
        Component,
        path
      };
    });
  };

  render() {
    const { pageProps } = this.props;
    const { Component, transitionState, path } = this.state;

    return (
      <>
        <Head key="fonts">
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"
            rel="stylesheet"
          />
        </Head>
        <Container>
          <Global styles={globalStyles} />
          <NoSSR>
            <ClientProvider>
              <Component
                {...pageProps}
                path={path}
                transitionState={transitionState}
                onTransitionComplete={this.onTransitionComplete}
              />
            </ClientProvider>
          </NoSSR>
        </Container>
      </>
    );
  }
}
