import React, { PureComponent } from "react";
//Sonar componenet
export default class CircleHandle extends PureComponent {
  render() {
    const { coordinates } = this.props;
    return (
      <ellipse
        transform="translate(0 25.25)"
        cx={coordinates.x}
        cy={coordinates.y}
        rx={10}
        ry={10}
        fill="rgb(244, 0, 0)"
      />
    );
  }
}
