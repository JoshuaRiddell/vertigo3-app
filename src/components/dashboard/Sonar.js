import React from "react";
import SonarChart from "./SonarChart";
import HorizontalSlider from "./HorizontalRangeSlider";
import VerticalRangeSlider from "./VerticalRangeSlider";

export default class Sonar extends React.Component {
  state = {
    verticalValues: {
      min: 5,
      max: 20
    },
    horizantalValues: {
      min: 5,
      max: 10
    }
  };
  static propTypes = {};

  render() {
    const { expandSonar } = this.props;
    return (
      <div className="sonar-container">
        <div class="sonar-controller-wrapper">
          <span class="sonar-icon-wrap empty-icon-wrapper">
            <img
              src="images/zoming-icon.svg"
              class="sonar-icon empty-icon"
              style={expandSonar ? { width: 80, height: 80 } : {}}
            />
          </span>
          <span
            class="sonar-icon-wrap loop-icon-wrapper"
            style={expandSonar ? { marginRight: 50 } : { marginRight: 95 }}
          >
            <img
              src="images/loop-icon.svg"
              class="sonar-icon loop-icon"
              style={expandSonar ? { width: 80, height: 80 } : {}}
            />
          </span>
        </div>
        <SonarChart
          className="bezierCurves"
          viewBoxWidth={250}
          viewBoxHeight={210}
          activeMode={this.props.activeMode}
        />
      </div>
    );
  }
}
