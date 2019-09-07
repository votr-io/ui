import styled from "@emotion/styled";
import { css, Global } from "@emotion/core";
import { Grid, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./theme";

import { client } from "./apolloClient";
import { ApolloProvider } from "@apollo/react-hooks";
import { LandingPage } from "./public/LandingPage";
import { NotFoundPage } from "./public/NotFoundPage";
import { CreatePage } from "./admin/CreatePage";
import { AdminPage } from "./admin/AdminPage";
import { ElectionPage } from "./election/ElectionPage";
import { RegistrationPage } from "./registration/RegistrationPage";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <Global styles={globalStyles}></Global>
        <Grid container justify="center">
          <PageContent item container>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={LandingPage}></Route>
                <Route
                  path="/elections/create"
                  exact
                  component={CreatePage}
                ></Route>
                <Route
                  path="/elections/:electionId"
                  exact
                  component={ElectionPage}
                ></Route>
                <Route
                  path="/elections/:electionId/admin"
                  exact
                  component={AdminPage}
                ></Route>
                <Route
                  path="/elections/:electionId/register"
                  exact
                  component={RegistrationPage}
                ></Route>
                <Route component={NotFoundPage}></Route>
              </Switch>
            </BrowserRouter>
          </PageContent>
        </Grid>
      </MuiThemeProvider>
    </ApolloProvider>
  );
};

const globalStyles = css`
  html,
  body {
    background: ${theme.palette.background.default};
  }
`;

const PageContent = styled(Grid)`
  max-width: ${theme.breakpoints.values.lg}px;
`;

export default App;
