import React, { Component } from "react";
import clickSound from "../../assets/Key-click.ogg";
import soundDataSuccess from "../../assets/Data_sent.ogg";

export default class SeagrassSection extends Component {
  state = {
    percentBarMenu: false,
    dataSelection: ""
  };

  setDataSelection = selection => {
    const { dataSelection } = this.state;
    const audio = new Audio(clickSound);
    audio.play();
    if (dataSelection === selection) {
      this.setState({
        dataSelection: "",
        percentBarMenu: false
      });
    } else {
      this.setState({
        dataSelection: selection,
        percentBarMenu: true
      });
    }
  };

  sendPercentageData = item => {
    const audio = new Audio(soundDataSuccess);
    audio.play();
    this.setState({ percentBarMenu: false, dataSelection: "" });
  };
  render() {
    const percentBar = [
      "<0%",
      "<2%",
      "<10%",
      "<20%",
      "<30%",
      "<40%",
      "<50%",
      "<60%",
      "<70%",
      "<80%",
      "<90%",
      "<100%"
    ];
    const { percentBarMenu, dataSelection } = this.state;
    return (
      <React.Fragment>
        <div class="bottom-sec">
          <div class="data-wrapper">
            <div class="data-inner-wrap">
              <div
                class={`data-item border-brown bg-brown ${
                  dataSelection === "ho" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("ho")}
              >
                <img class="data-img" src="images/Picture10.png" />
                <span class="data-label">Ho</span>
                <span class="play-icon-wrap">
                  <img class="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>
              <div
                class={`data-item border-violet bg-violet ${
                  dataSelection === "hs" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("hs")}
              >
                <img
                  class="data-img"
                  style={{ width: "auto" }}
                  src="images/Picture11.png"
                />
                <span class="data-label">Hs</span>
                <span class="play-icon-wrap">
                  <img class="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>
            </div>
            <div class="data-inner-wrap">
              <div
                class={`data-item border-blue-d bg-blue-d ${
                  dataSelection === "cs" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("cs")}
              >
                <img class="data-img" src="images/Picture12.png" />
                <span class="data-label">Cs</span>
                <span class="play-icon-wrap">
                  <img class="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>
              <div
                class={`data-item border-blue-l bg-blue-l ${
                  dataSelection === "si" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("si")}
              >
                <img class="data-img" src="images/Picture13.png" />
                <span class="data-label">Si</span>
                <span class="play-icon-wrap">
                  <img class="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>
            </div>
            <div class="data-inner-wrap">
              <div
                class={`data-item border-yellow-l bg-yellow-l ${
                  dataSelection === "zm" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("zm")}
              >
                <img
                  class="data-img"
                  style={{ width: "auto" }}
                  src="images/Picture14.png"
                />
                <span class="data-label">Zm</span>
                <span class="play-icon-wrap">
                  <img class="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>
              <div
                class={`data-item border-yellow-d bg-yellow-d ${
                  dataSelection === "hd" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("hd")}
              >
                <img class="data-img" src="images/Picture15.png" />
                <span class="data-label">Hd</span>
                <span class="play-icon-wrap">
                  <img class="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>
            </div>
            <div class="data-inner-wrap data-inner-wrap_lg">
              <div
                class={`data-item border-orange bg-orange ${
                  dataSelection === "hu" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("hu")}
              >
                <img class="data-img" src="images/Picture16.png" />
                <span class="data-label">Hu</span>
                <span class="play-icon-wrap">
                  <img class="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>

              <div class="dr-pagination-wrapper">
                <ul class="dr-pagination">
                  <li class="first-item dr-pagination-item">
                    <a>Starfish</a>
                  </li>
                  <li class="second-item dr-pagination-item">
                    <a onClick={() => this.props.setStarFishCounter(1)}>1</a>
                  </li>
                  <li class="third-item dr-pagination-item">
                    <a onClick={() => this.props.setStarFishCounter(2)}>2</a>
                  </li>
                  <li class="fourth-item dr-pagination-item">
                    <a onClick={() => this.props.setStarFishCounter(5)}>5</a>
                  </li>
                  <li class="fifth-item dr-pagination-item">
                    <a onClick={() => this.props.setStarFishCounter(10)}>10</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {percentBarMenu && (
          <div class="popup-layer">
            <div class="percentage-bar-wrapper">
              {percentBar.map((item, index) => (
                <span
                  key={`percentage-bar-item c-${index}`}
                  class={`percentage-bar-item c-${index}`}
                  onClick={() => this.sendPercentageData(item)}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
