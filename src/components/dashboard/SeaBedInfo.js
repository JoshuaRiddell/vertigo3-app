import React, { Component } from "react";
import soundDataSuccess from "../../assets/Data_sent.ogg";

export default class SeaBedInfo extends Component {
  state = {
    flashValue: ""
  };
  componentDidUpdate(prevProps, prevState) {
    const { starFishCounter } = this.props;

    if (starFishCounter !== prevProps.starFishCounter) {
      const audio = new Audio(soundDataSuccess);
      audio.play();
      this.setState({
        flashValue: "flashValue",
        flashValueTimeout: setTimeout(
          () => this.setState({ flashValue: "" }),
          500
        )
      });
    }
  }

  render() {
    const { flashValue } = this.state;
    const { starFishCounter } = this.props;
    return (
      <React.Fragment>
        <span class="info-text">
          <div class="info-inner-wrapper">
            <span class="info-label">Coral cover</span>
            <span class="info-value">23%</span>
          </div>
          <div class="info-inner-wrapper">
            <span class="info-label">Starfish</span>
            <span className={`info-value ${flashValue}`}>
              {starFishCounter}
            </span>
          </div>
          <div class="info-inner-wrapper">
            <span class="info-label">Seagrass</span>
            <span class="info-value">3%</span>
          </div>
          <div class="info-inner-wrapper">
            <span class="info-label">Sand</span>
            <span class="info-value">36%</span>
          </div>
        </span>
      </React.Fragment>
    );
  }
}
