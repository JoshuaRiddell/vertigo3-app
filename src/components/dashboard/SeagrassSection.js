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
        <div className="bottom-sec">
          <div className="data-wrapper">
            <div className="data-inner-wrap">
              <div
                className={`data-item border-brown bg-brown ${
                  dataSelection === "ho" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("ho")}
              >
                <img className="data-img" src="images/Picture10.png" />
                <span className="data-label">Ho</span>
                <span className="play-icon-wrap">
                  <img className="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>
              <div
                className={`data-item border-violet bg-violet ${
                  dataSelection === "hs" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("hs")}
              >
                <img
                  className="data-img"
                  style={{ width: "auto" }}
                  src="images/Picture11.png"
                />
                <span className="data-label">Hs</span>
                <span className="play-icon-wrap">
                  <img className="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>
            </div>
            <div className="data-inner-wrap">
              <div
                className={`data-item border-blue-d bg-blue-d ${
                  dataSelection === "cs" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("cs")}
              >
                <img className="data-img" src="images/Picture12.png" />
                <span className="data-label">Cs</span>
                <span className="play-icon-wrap">
                  <img className="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>
              <div
                className={`data-item border-blue-l bg-blue-l ${
                  dataSelection === "si" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("si")}
              >
                <img className="data-img" src="images/Picture13.png" />
                <span className="data-label">Si</span>
                <span className="play-icon-wrap">
                  <img className="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>
            </div>
            <div className="data-inner-wrap">
              <div
                className={`data-item border-yellow-l bg-yellow-l ${
                  dataSelection === "zm" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("zm")}
              >
                <img
                  className="data-img"
                  style={{ width: "auto" }}
                  src="images/Picture14.png"
                />
                <span className="data-label">Zm</span>
                <span className="play-icon-wrap">
                  <img className="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>
              <div
                className={`data-item border-yellow-d bg-yellow-d ${
                  dataSelection === "hd" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("hd")}
              >
                <img className="data-img" src="images/Picture15.png" />
                <span className="data-label">Hd</span>
                <span className="play-icon-wrap">
                  <img className="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>
            </div>
            <div className="data-inner-wrap data-inner-wrap_lg">
              <div
                className={`data-item border-orange bg-orange ${
                  dataSelection === "hu" ? "active" : ""
                }`}
                onClick={() => this.setDataSelection("hu")}
              >
                <img className="data-img" src="images/Picture16.png" />
                <span className="data-label">Hu</span>
                <span className="play-icon-wrap">
                  <img className="play-icon" src="images/play-small-icon.svg" />
                </span>
              </div>

              <div className="dr-pagination-wrapper">
                <ul className="dr-pagination">
                  <li className="first-item dr-pagination-item">
                    <a>Starfish</a>
                  </li>
                  <li className="second-item dr-pagination-item">
                    <a onClick={() => this.props.setStarFishCounter(1)}>1</a>
                  </li>
                  <li className="third-item dr-pagination-item">
                    <a onClick={() => this.props.setStarFishCounter(2)}>2</a>
                  </li>
                  <li className="fourth-item dr-pagination-item">
                    <a onClick={() => this.props.setStarFishCounter(5)}>5</a>
                  </li>
                  <li className="fifth-item dr-pagination-item">
                    <a onClick={() => this.props.setStarFishCounter(10)}>10</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {percentBarMenu && (
          <div className="popup-layer">
            <div className="percentage-bar-wrapper">
              {percentBar.map((item, index) => (
                <span
                  key={`percentage-bar-item c-${index}`}
                  className={`percentage-bar-item c-${index}`}
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
