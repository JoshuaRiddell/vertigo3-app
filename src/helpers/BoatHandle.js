import React, { PureComponent } from "react";
import boatIcon from "../assets/sonar-boat-2.png";
//Sonar component
export default class BoatHandle extends PureComponent {
  render() {
    const { coordinates, onMouseDown } = this.props;
    return (
      <image
        xlinkHref={boatIcon}
        height="150"
        width="150"
        x={-18}
        y={-54}
        // onMouseDown={onMouseDown}
        // onTouchStart={onMouseDown}
        // style={{ cursor: "-webkit-grab" }}
      />
    );
  }
}
