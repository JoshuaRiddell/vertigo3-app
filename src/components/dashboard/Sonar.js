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
    return (
      <div className="sonar-container">
        <SonarChart
          className="bezierCurves"
          viewBoxWidth={250}
          viewBoxHeight={180}
          activeMode={this.props.activeMode}
        />
        {/* <VerticalRangeSlider expandSonar={this.props.expandSonar} />
        <HorizontalSlider expandSonar={this.props.expandSonar} /> */}
      </div>
    );
  }
}
