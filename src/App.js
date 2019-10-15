import React, { Component } from "react";
import { BrowserRouter as Router, Switch, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AppRoutes from "./AppRoutes";
import NoSleep from "nosleep.js";

import "./App.css";
import "./leaflet.css";
import "./styles/bootstrap.min.css";
class App extends Component {
  componentDidMount() {
    // Enable wake lock.
    // (must be wrapped in a user input event handler e.g. a mouse or touch handler)
    document.addEventListener("touchstart", this.enableNoSleep, false);

    // document.addEventListener(
    //   "touchstart",
    //   e => {
    //     const { targetTouches } = e;

    //     if (targetTouches[0] && targetTouches[0].clientY > 1170) {
    //       console.log(e);
    //       e.preventDefault();
    //       e.stopPropagation();
    //       return false;
    //     }
    //   },
    //   { passive: false }
    // );
  }

  enableNoSleep = e => {
    try {
      const noSleep = new NoSleep();

      noSleep.enable();
      document.removeEventListener("touchstart", this.enableNoSleep, false);
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
