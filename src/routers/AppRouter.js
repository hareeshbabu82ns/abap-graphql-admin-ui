import React from "react";
import { Container } from "semantic-ui-react";
import { SemanticToastContainer } from 'react-semantic-toasts';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";

import ErrorPage from "../containers/ErrorPage";
import DashboardPage from "../containers/DashboardPage";
import SchemaPage from "../containers/SchemaPage";
import NavBar from "../components/NavBar";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <SemanticToastContainer />
      <NavBar />

      <div style={{ marginTop: "5em" }}>
        <Switch>
          <Route path="/" component={DashboardPage} exact />
          <Route path="/schema" component={SchemaPage} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default AppRouter;