import React, { PureComponent } from "react";
//Sonar componenet
export default class SmallHandle extends PureComponent {
  render() {
    const { coordinates, onMouseDown } = this.props;
    return (
      <ellipse
        cx={coordinates.x}
        cy={coordinates.y}
        rx={3}
        ry={3}
        fill="rgb(255, 255, 255, 0.60)"
        stroke="rgb(244, 0, 137, 0.60)"
        strokeWidth={2}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        style={{ cursor: "-webkit-grab" }}
      />
    );
  }
}
