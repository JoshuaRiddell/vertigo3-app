import React, { PureComponent } from "react";

export default class ConnectingLine extends PureComponent {
  //Sonar component
  render() {
    const { from, to } = this.props;
    return (
      <line
        x1={from.x}
        y1={from.y + 20}
        x2={to.x}
        y2={to.y + 20}
        stroke="rgb(255, 0, 0)"
        // strokeDasharray="5,5"
        strokeWidth={5}
      />
    );
  }
}
