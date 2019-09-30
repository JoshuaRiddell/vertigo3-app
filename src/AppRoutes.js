import React, { Component } from "react";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import DasboardContainer from "./components/dashboard/DashboardContainer";
class AppRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to={"/dashboard"} />} />
        <Route
          path="/dashboard"
          render={() => <DasboardContainer {...this.props} />}
        />
      </Switch>
    );
  }
}

export default withRouter(AppRoutes);
