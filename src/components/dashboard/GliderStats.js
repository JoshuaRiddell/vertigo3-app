import React, { Component } from "react";

export default class GliderStats extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="state-labels">
          <span className="state-title">Depth</span>
          <span className="state-value">24.1 m</span>
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
