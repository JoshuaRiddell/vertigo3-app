import React, { Component } from "react";
import { BrowserRouter as Router, Switch, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AppRoutes from "./AppRoutes";
import NoSleep from "nosleep.js";

import "./leaflet.css";
import "./styles/bootstrap.min.css";
class App extends Component {
  componentWillMount() {
    // Enable wake lock.
    // (must be wrapped in a user input event handler e.g. a mouse or touch handler)
    document.addEventListener("touchstart", this.enableNoSleep, false);
  }

  enableNoSleep = e => {
    try {
      setTimeout(() => {
        const noSleep = new NoSleep();
        noSleep.enable();
        document.removeEventListener("touchstart", this.enableNoSleep, false);
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <AppRoutes path="/" />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
