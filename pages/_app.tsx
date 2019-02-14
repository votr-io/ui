import React from "react";
import App, { Container, NextAppContext } from "next/app";

export default class MyApp extends App {
  static async getInitialProps(context: NextAppContext) {
    const { Component, router, ctx } = context;
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;

    console.log(router.pathname);

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
