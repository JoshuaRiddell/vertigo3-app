import React from "react";
import SonarChart from "./SonarChart";

export default class Sonar extends React.Component {
  render() {
    const { expandSonar } = this.props;
    return (
      // Todo: Zoom functionality
      <div
        className="sonar-container"
        style={expandSonar ? { backgroundPositionY: `116px` } : {}}
      >
        <div
          className="sonar-controller-wrapper"
          style={expandSonar ? { top: 115 } : {}}
        >
          <span className="sonar-icon-wrap empty-icon-wrapper">
            <img
              src="images/zoming-icon.svg"
              className="sonar-icon empty-icon"
              style={expandSonar ? { width: 80, height: 80 } : {}}
            />
          </span>
          <span
            className="sonar-icon-wrap loop-icon-wrapper"
            style={expandSonar ? { marginRight: 50 } : { marginRight: 95 }}
          >
            <img
              src="images/loop-icon.svg"
              className="sonar-icon loop-icon"
              style={expandSonar ? { width: 80, height: 80 } : {}}
            />
          </span>
        </div>
        <SonarChart
          className="bezierCurves"
          viewBoxWidth={538}
          viewBoxHeight={450}
        />
      </div>
    );
  }
}
