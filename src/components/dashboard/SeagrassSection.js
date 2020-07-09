import React, { Component } from "react";
import clickSound from "../../assets/Key-click.ogg";
import soundDataSuccess from "../../assets/Data_sent.ogg";
import { connect } from "react-redux";
import { sendSeaGrassData } from "../../actions/trainingSetActions";

//Disabled for now.
class SeagrassSection extends Component {
  state = {
    percentBarMenu: false,
    dataSelection: "",
    sedimentPopup: false,
    sedimentPopupData: [
      { name: "Shale" },
      { name: "Gravel" },
      { name: "Sand" },
      { name: "Silt" },
      { name: "Clay" }
    ],
    sedimentPopupActiveItem: ""
  };

  setDataSelection = (selection) => {
    const {
      session: { recordingMode }
    } = this.props;
    if (recordingMode) {
      const { dataSelection } = this.state;
      this.feedBackSounds("click");
      if (selection === "sediment") {
        return this.setState({ sedimentPopup: !this.state.sedimentPopup });
      }
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
    }
  };

  setSedimentItem = (item) => {
    this.feedBackSounds("click");
    this.setState({ sedimentPopupActiveItem: item.name });
  };

  sendPercentageData = (percentage) => {
    const { dataSelection, sedimentPopupActiveItem } = this.state;
    const {
      trainingSet: { dataSet },
      mapState: { pathIndex, path }
    } = this.props;

    const latitude = path[pathIndex] ? path[pathIndex][0] : 0;
    const longitude = path[pathIndex] ? path[pathIndex][1] : 0;
    let className = "";

    if (dataSelection) {
      const item = dataSet.filter(
        (ds_Item) => ds_Item.shortName === dataSelection
      )[0];
      className = item.title;
    }
    if (sedimentPopupActiveItem) {
      className = sedimentPopupActiveItem;
    }

    this.props.sendSeaGrassData({
      annotation: {
        timestamp: Date.now(),
        latitude,
        longitude,
        class: className,
        percentage
      }
    });

    this.feedBackSounds("success");
    this.setState({
      percentBarMenu: false,
      dataSelection: "",
      sedimentPopupActiveItem: "",
      sedimentPopup: false
    });
  };

  feedBackSounds = (type) => {
    if (type === "click") {
      const audio = new Audio(clickSound);
      audio.play();
    }
    if (type === "success") {
      const audio = new Audio(soundDataSuccess);
      audio.play();
    }
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
    const {
      percentBarMenu,
      dataSelection,
      sedimentPopup,
      sedimentPopupData,
      sedimentPopupActiveItem
    } = this.state;

    const {
      session: { recordingMode }
    } = this.props;
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
            <div className="data-inner-wrap">
              <div style={{ width: "650px", display: "flex" }}>
                <div
                  style={{ marginRight: "85px" }}
                  className={`data-item border-orange bg-orange ${
                    dataSelection === "hu" ? "active" : ""
                  }`}
                  onClick={() => this.setDataSelection("hu")}
                >
                  <img className="data-img" src="images/Picture16.png" />
                  <span className="data-label">Hu</span>
                  <span className="play-icon-wrap">
                    <img
                      className="play-icon"
                      src="images/play-small-icon.svg"
                    />
                  </span>
                </div>

                <div
                  style={{ height: "141.78px" }}
                  className={`data-item border-olive-light bg-olive-light ${
                    sedimentPopup ? "active" : ""
                  }`}
                  onClick={() => this.setDataSelection("sediment")}
                >
                  <span className="data-label" style={{ fontSize: "36px" }}>
                    Sediment
                  </span>
                  <span className="play-icon-wrap">
                    <img
                      className="play-icon"
                      src="images/play-small-icon.svg"
                    />
                  </span>
                </div>
              </div>

              <div className="dr-pagination-wrapper">
                <ul
                  className="dr-pagination"
                  style={!recordingMode ? { pointerEvents: "none" } : {}}
                >
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

        {sedimentPopup && (
          <div className="popup-layer">
            <div className="sediment-pop-wrapper">
              {sedimentPopupData.map((item, index) => (
                <div
                  key={`sediment-pop-item c-${index}`}
                  className="sediment-popup-menu"
                >
                  <span
                    className={`sediment-pop-item ${
                      sedimentPopupActiveItem === item.name ? "active" : ""
                    }`}
                    onClick={() => this.setSedimentItem(item)}
                  >
                    {item.name}
                    <img
                      className="play-icon"
                      src="images/play-small-icon.svg"
                    />
                  </span>
                  <span
                    key={`sediment-pop-submenu c-${index}`}
                    className={`sediment-pop-submenu ${
                      sedimentPopupActiveItem === item.name ? "active" : ""
                    }`}
                  >
                    <div className="sediment-horizantal-submenu">
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
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trainingSet: state.trainingSet,
    mapState: state.mapState,
    session: state.session
  };
};
export default connect(mapStateToProps, { sendSeaGrassData })(SeagrassSection);
