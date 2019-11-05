import React, { Component } from "react";

export default class GliderStats extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="state-labels">
          <span class="state-title">Depth</span>
          <span class="state-value">24.1 m</span>
        </div>
        <div class="state-labels">
          <span class="state-title">Speed</span>
          <span class="state-value">1.96 kts</span>
        </div>
        <div class="state-labels">
          <span class="state-title">G.Depth</span>
          <span class="state-value">24.1 m</span>
        </div>
        <div class="state-labels">
          <span class="state-title">G.Attitude</span>
          <span class="state-value">25.2 m</span>
        </div>
        <div class="state-labels">
          <span class="state-title">G.Speed</span>
          <span class="state-value">1.96 kts</span>
        </div>
        <div class="state-labels">
          <span class="state-title">Img qty</span>
          <span
            class="red-text"
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
            class="green-text"
            style={{ fontSize: 23, fontWeight: 600, color: "#00ff3a" }}
          >
            Exposure
          </span>
        </div>
        <div class="state-labels">
          <span class="state-title">Time</span>
          <span class="state-value">4:07:03</span>
        </div>
        <div class="state-labels">
          <span class="state-title">Distance</span>
          <span class="state-value">18.3 km</span>
        </div>
      </React.Fragment>
    );
  }
}
