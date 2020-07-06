import React, { PureComponent } from "react";
import gliderIcon from "../assets/glider-icon.svg";
//Sonar component
export default class GliderHandle extends PureComponent {
  render() {
    const { coordinates, onMouseDown } = this.props;
    return (
      <image
        xlinkHref={gliderIcon}
        height="80"
        width="80"
        x={coordinates.x - 10}
        y={coordinates.y - 50}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        style={{ cursor: "-webkit-grab" }}
      />
    );
  }
}
