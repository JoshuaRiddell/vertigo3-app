import React, { PureComponent } from "react";
//Sonar component
export default class Path extends PureComponent {
  render() {
    const { instructions } = this.props;
    return (
      <path
        d={instructions}
        fill="none"
        stroke="rgb(255, 0, 0)"
        strokeWidth={5}
      />
    );
  }
}
