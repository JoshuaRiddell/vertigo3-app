import React from "react";
import { connect } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import MapComponent from "./MapComponent";
import Sonar from "./Sonar";
import FullScreenFab from "./FullScreenFab";
import NotificationBar from "./NotificationBar";
import Popup from "reactjs-popup";
import "../../styles/dashboardStyles.css";
import SessionControls from "./SessionControls";
import ExpandButton from "../../helpers/ExpandButton";
import TraningSetModal from "./TraningSetModal";
import clickSound from "../../assets/click-sound.mp3";

class DashboardContainer extends React.Component {
  state = {
    expandFrame: false,
    expandSonar: false,
    expandMap: false,
    activeMode: "surFace",
    hidePopup: false,
    percentBarMenu: false,
    dataSelection: "",
    notification: {},
    starFishCounter: 0,
    flashValue: ""
  };

  showNotification = (msg, duration, mode) => {
    this.closeNotification();

    let notificationObj = {
      showBar: true,
      msg,
      duration,
      mode
    };

    if (mode !== "PAUSE_SESSION" && mode !== "STOP_SESSION") {
      notificationObj.timeoutId = setTimeout(
        () => this.closeNotification(),
        duration ? duration : 2000
      );
    }

    this.setState({ notification: notificationObj });
  };

  closeNotification = () => {
    const { notification } = this.state;
    if (notification.timeoutId) clearTimeout(notification.timeoutId);

    this.setState({ notification: {} });
  };

  setDataSelection = selection => {
    const { dataSelection } = this.state;
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

  expandingFrames = frame => {
    const { expandSonar, expandMap } = this.state;
    if (frame === "sonar") {
      this.setState({
        expandSonar: !expandSonar,
        expandMap: false
      });
    }
    if (frame === "map") {
      this.setState({
        expandMap: !expandMap,
        expandSonar: false
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const { starFishCounter } = this.state;

    if (starFishCounter !== prevState.starFishCounter) {
      const audio = new Audio(clickSound);
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
  static propTypes = {};

  render() {
    const {
      notification,
      expandMap,
      expandSonar,
      activeMode,
      hidePopup,
      percentBarMenu,
      dataSelection,
      starFishCounter,
      flashValue
    } = this.state;

    const { trainingSet } = this.props;
    const { showTrainingSet } = trainingSet;

    let frameOrder = [
      <VideoPlayer
        showNotification={this.showNotification}
        playerWidth={1076}
        playerHeight={900}
      />,
      <MapComponent mapHeight={450} expandMap={expandMap} />,
      <Sonar expandSonar={expandSonar} activeMode={activeMode} />
    ];

    if (expandMap) {
      frameOrder = [
        <MapComponent mapHeight={900} expandMap={expandMap} />,
        <VideoPlayer
          showNotification={this.showNotification}
          playerWidth={538}
          playerHeight={450}
          disableAnnotations
        />,
        <Sonar expandSonar={expandSonar} activeMode={activeMode} />
      ];
    }

    if (expandSonar) {
      frameOrder = [
        <Sonar expandSonar={expandSonar} activeMode={activeMode} />,
        <MapComponent mapHeight={450} expandMap={expandMap} />,
        <VideoPlayer
          showNotification={this.showNotification}
          playerWidth={538}
          playerHeight={450}
          disableAnnotations
        />
      ];
    }

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
    return (
      <div class="main-container">
        {/* <div className="dev-mode-version">v0.0.4</div> */}
        <div class="top-sec">
          <div class="left-sidebar">
            <div class="nav-wrapper">
              <div
                class={`dr-btn btn-half btn-l ${
                  activeMode === "surFace" ? "nav-btn-bg-1" : "bg-olive-dark"
                }`}
                onClick={() => this.setState({ activeMode: "surFace" })}
              >
                Surface
              </div>
              <div
                class={`dr-btn btn-half btn-r ${
                  activeMode === "seaBed" ? "nav-btn-bg-1" : "bg-olive-dark"
                }`}
                onClick={() => this.setState({ activeMode: "seaBed" })}
              >
                Seabed
              </div>
              <div
                class={`dr-btn btn-full ${
                  activeMode === "manual" ? "nav-btn-bg-1" : "nav-btn-bg-2"
                }`}
                onClick={() => this.setState({ activeMode: "manual" })}
              >
                manual
                <span>
                  <img src="images/remote.png" class="remote-icon" />
                </span>
              </div>
            </div>

            <div class="state-wrapper bg-olive-light">
              <div class="state-labels">
                <span class="state-title">Depth</span>
                <span class="state-value">24.1 m</span>
              </div>
              <div class="state-labels">
                <span class="state-title">Speed</span>
                <span class="state-value">1.96 kts</span>
              </div>
              <div class="state-labels">
                <span class="state-title">G.Depth</span>
                <span class="state-value">24.1 m</span>
              </div>
              <div class="state-labels">
                <span class="state-title">G.Attitude</span>
                <span class="state-value">25.2 m</span>
              </div>
              <div class="state-labels">
                <span class="state-title">G.Speed</span>
                <span class="state-value">1.96 kts</span>
              </div>
              <div class="state-labels">
                <span class="state-title">Img qty</span>
                <span
                  class="red-text"
                  style={{
                    display: "block",
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#ff0018"
                  }}
                >
                  Focus
                </span>
                <span
                  class="green-text"
                  style={{ fontSize: 23, fontWeight: 600, color: "#00ff3a" }}
                >
                  Exposure
                </span>
              </div>
              <div class="state-labels">
                <span class="state-title">Time</span>
                <span class="state-value">4:07:03</span>
              </div>
              <div class="state-labels">
                <span class="state-title">Distance</span>
                <span class="state-value">18.3 km</span>
              </div>
            </div>

            <div class="info-wrapper bg-olive-dark">
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
            </div>
          </div>

          <div class="main-video-wrapper">
            <div class="main-wrapper">{frameOrder[0]}</div>
            {!expandMap && !expandSonar && (
              <div class="video-controller-wrapper">
                <SessionControls showNotification={this.showNotification} />

                <Popup
                  trigger={
                    <span
                      href="#"
                      class="video-icon-wrapper setting-icon-wrapper"
                    >
                      <img
                        src="images/setting-icon.svg"
                        class="video-icon setting-icon"
                      />
                    </span>
                  }
                  position="bottom center"
                  closeOnDocumentClick={false}
                >
                  {close => (
                    <div className="settings-popup">
                      <span class="dr-close-btn" onClick={close}>
                        <img src="images/close-icon.svg" class="close-icon" />
                      </span>
                      <p>
                        Version: <strong>0.0.5</strong>
                      </p>
                    </div>
                  )}
                </Popup>
              </div>
            )}
          </div>

          <div class="right-sidebar">
            <div class="map-wrapper">
              {frameOrder[1]}

              <div class="map-controller-wrapper">
                <ExpandButton
                  classNames={"map-icon sizing-icon"}
                  active={expandMap}
                  handler={() => this.expandingFrames("map")}
                  frame={"map"}
                />
              </div>
            </div>

            <div class="sonar-wrapper">
              {frameOrder[2]}
              <div class="sonar-controller-wrapper">
                <ExpandButton
                  classNames={"sonar-icon sizing-icon"}
                  active={expandSonar}
                  handler={() => this.expandingFrames("sonar")}
                  frame={"sonar"}
                />
              </div>
            </div>
          </div>
        </div>

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
                    <a
                      onClick={() =>
                        this.setState({
                          starFishCounter: starFishCounter + 1
                        })
                      }
                    >
                      1
                    </a>
                  </li>
                  <li class="third-item dr-pagination-item">
                    <a
                      onClick={() =>
                        this.setState({
                          starFishCounter: starFishCounter + 2
                        })
                      }
                    >
                      2
                    </a>
                  </li>
                  <li class="fourth-item dr-pagination-item">
                    <a
                      onClick={() =>
                        this.setState({
                          starFishCounter: starFishCounter + 5
                        })
                      }
                    >
                      5
                    </a>
                  </li>
                  <li class="fifth-item dr-pagination-item">
                    <a
                      onClick={() =>
                        this.setState({
                          starFishCounter: starFishCounter + 10
                        })
                      }
                    >
                      10
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {percentBarMenu && (
          <div class="popup-layer">
            <div
              class="percentage-bar-wrapper"
              onClick={() =>
                this.setState({ percentBarMenu: false, dataSelection: "" })
              }
            >
              {percentBar.map((item, index) => (
                <span class={`percentage-bar-item c-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        )}
        {showTrainingSet && <TraningSetModal />}
        <NotificationBar
          {...notification}
          closeNotification={this.closeNotification}
        />
      </div>
    );
    // return (
    //   <>
    //     <FullScreenFab />
    //     <div className="wrapper">
    //       <div className="nav-box">
    //         <div style={{ display: "flex" }}>
    //           <button
    //             className="block-btn"
    //             style={
    //               activeMode === "surFace" ? { backgroundColor: "green" } : {}
    //             }
    //             onClick={() => this.setState({ activeMode: "surFace" })}
    //           >
    //             Surface
    //           </button>
    //           <button
    //             className="block-btn"
    //             style={
    //               activeMode === "seaBed" ? { backgroundColor: "green" } : {}
    //             }
    //             onClick={() => this.setState({ activeMode: "seaBed" })}
    //           >
    //             Seabed
    //           </button>
    //         </div>
    //         <button
    //           className="block-btn"
    //           style={
    //             activeMode === "manual" ? { backgroundColor: "green" } : {}
    //           }
    //           onClick={() => this.setState({ activeMode: "manual" })}
    //         >
    //           Manual
    //         </button>
    //       </div>
    //       <div className="status-box">
    //         <span className="placeholder">Status</span>
    //       </div>
    //       <div className="info-box">
    //         <span className="placeholder">Info</span>
    //       </div>
    //       <div className="video-box active-frame">
    //         {expandMap && (
    //           <>
    //             <MapComponent mapHeight={900} />
    //             <button
    //               className="expand-frame-btn"
    //               onClick={() => this.setState({ expandMap: !expandMap })}
    //             >
    //               <i className="fa fa-arrows-alt fa-3x" />
    //             </button>
    //           </>
    //         )}
    //         {expandSonar && (
    //           <>
    //             <Sonar expandSonar={expandSonar} activeMode={activeMode} />
    //             <button
    //               className="expand-frame-btn"
    //               onClick={() => this.setState({ expandSonar: !expandSonar })}
    //             >
    //               <i className="fa fa-arrows-alt fa-3x" />
    //             </button>
    //           </>
    //         )}
    //         {!expandSonar && !expandMap ? (
    //           <VideoPlayer
    //             showNotification={this.showNotification}
    //             playerWidth={1076}
    //             playerHeight={900}
    //           />
    //         ) : (
    //           <></>
    //         )}
    //       </div>
    //       <div className="map-box">
    //         {expandMap ? (
    //           <VideoPlayer
    //             showNotification={this.showNotification}
    //             playerWidth={538}
    //             playerHeight={450}
    //           />
    //         ) : (
    //           <>
    //             <MapComponent mapHeight={450} />
    //             {!expandSonar && !expandMap && (
    //               <button
    //                 className="expand-frame-btn"
    //                 onClick={() => this.setState({ expandMap: !expandMap })}
    //               >
    //                 <i className="fa fa-arrows-alt fa-3x" />
    //               </button>
    //             )}
    //           </>
    //         )}
    //       </div>
    //       <div className="sonar-box">
    //         {expandSonar ? (
    //           <VideoPlayer
    //             showNotification={this.showNotification}
    //             playerWidth={538}
    //             playerHeight={450}
    //           />
    //         ) : (
    //           <>
    //             <Sonar expandSonar={expandSonar} activeMode={activeMode} />
    //             {!expandSonar && !expandMap && (
    //               <button
    //                 className="expand-frame-btn"
    //                 onClick={() => this.setState({ expandSonar: !expandSonar })}
    //               >
    //                 <i className="fa fa-arrows-alt fa-3x" />
    //               </button>
    //             )}
    //           </>
    //         )}
    //       </div>
    //       <div className="btm-box">
    //         <span className="placeholder">Bottom controls</span>
    //       </div>
    //     </div>
    //     <NotificationBar
    //       {...notification}
    //       closeNotification={this.closeNotification}
    //     />
    //   </>
    // );
  }
}

const mapStateToProps = state => {
  return {
    trainingSet: state.trainingSet
  };
};
export default connect(
  mapStateToProps,
  {}
)(DashboardContainer);
