import React from "react";
import App, { Container, NextAppContext } from "next/app";
import { NextComponentType } from "next";
import { TransitionState, PageProps, PropTypes } from "../src/components/types";
import { Global, css } from "@emotion/core";
import { background } from "../src/components/styles";
import { ApolloProvider } from "react-apollo-hooks";
import Client from "apollo-boost";
import "cross-fetch/polyfill";

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
  }
`;

interface State {
  Component: NextComponentType<PageProps>;
  path: string;
  transitionState: TransitionState;
}

type Props = PropTypes<App>;

export default class MyApp extends App<{}, State> {
  private nextComponent: NextComponentType<PageProps>;
  private nextPath: string;
  private client: Client<{}> = new Client({
    uri: "https://votr-graphql.herokuapp.com"
  });

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
      <Container>
        <ApolloProvider client={this.client}>
          <Global styles={globalStyles} />
          <Component
            {...pageProps}
            path={path}
            transitionState={transitionState}
            onTransitionComplete={this.onTransitionComplete}
          />
        </ApolloProvider>
      </Container>
    );
  }
}
