import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AppRoutes from "./AppRoutes";

import "./App.css";
import "./leaflet.css";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <AppRoutes path="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
