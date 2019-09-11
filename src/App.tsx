import { ApolloProvider } from "@apollo/react-hooks";
import { css, Global } from "@emotion/core";
import { MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdminPage } from "./admin/AdminPage";
import { CreatePage } from "./admin/CreatePage";
import { client } from "./apolloClient";
import { ElectionPage } from "./election/ElectionPage";
import { LandingPage } from "./public/LandingPage";
import { NotFoundPage } from "./public/NotFoundPage";
import { RegistrationPage } from "./registration/RegistrationPage";
import { theme } from "./theme";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <Global styles={globalStyles}></Global>
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
      </MuiThemeProvider>
    </ApolloProvider>
  );
};

const globalStyles = css`
  html,
  body,
  #root {
    background: ${theme.palette.background.default};
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
`;

export default App;
