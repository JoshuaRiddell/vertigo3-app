import React, { Component } from "react";

import openSocket from "socket.io-client";

const basePath = process.env.REACT_APP_API_BASE_PATH;
const socket = openSocket(`${basePath}/status/updates`);

export default class GliderStats extends Component {
  state = {
    status: []
  };
  //componentDidUpdate() {
  // socket.connect();

  // socket.on("json", this.updateState);
  //}

  // componentWillUnmount() {
  //   socket.off("json");
  //   socket.disconnect();
  // }

  updateState = status => {
    this.setState({ status });
  };

  render() {
    const [depthM, depthKM] = this.state.status;
    return (
      <React.Fragment>
        <div className="state-labels">
          <span className="state-title">Depth</span>
          <span className="state-value">
            {depthM ? `${depthM.value.toFixed(1)} m` : "24.1 m"}
          </span>
        </div>
        <div className="state-labels">
          <span className="state-title">Speed</span>
          <span className="state-value">1.96 kts</span>
        </div>
        <div className="state-labels">
          <span className="state-title">G.Depth</span>
          <span className="state-value">24.1 m</span>
        </div>
        <div className="state-labels">
          <span className="state-title">G.Attitude</span>
          <span className="state-value">25.2 m</span>
        </div>
        <div className="state-labels">
          <span className="state-title">G.Speed</span>
          <span className="state-value">1.96 kts</span>
        </div>
        <div className="state-labels">
          <span className="state-title">Img qty</span>
          <span
            className="red-text"
            style={{
              display: "block",
              fontSize: 24,
              fontWeight: 600,
              color: "#ff0018"
            }}
          >
            Focus
          </span>
          <span
            className="green-text"
            style={{ fontSize: 23, fontWeight: 600, color: "#00ff3a" }}
          >
            Exposure
          </span>
        </div>
        <div className="state-labels">
          <span className="state-title">Time</span>
          <span className="state-value">4:07:03</span>
        </div>
        <div className="state-labels">
          <span className="state-title">Distance</span>
          <span className="state-value">18.3 km</span>
        </div>
      </React.Fragment>
    );
  }
}
