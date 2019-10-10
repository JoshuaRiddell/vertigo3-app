import React from "react";
import VideoPlayer from "./VideoPlayer";
import MapComponent from "./MapComponent";
import Sonar from "./Sonar";
import FullScreenFab from "./FullScreenFab";
import NotificationBar from "./NotificationBar";
import "../../styles/dashboardStyles.css";

export default class DashboardContainer extends React.Component {
  state = {
    expandFrame: false,
    expandSonar: false,
    expandMap: false,
    activeMode: "surFace",
    hidePopup: false,
    percentBarMenu: false,
    dataSelection: ""
  };

  showNotification = (msg, duration) => {
    let notification = {
      showBar: true,
      msg,
      duration
    };
    this.setState({ notification });

    setTimeout(
      () => this.setState({ notification: {} }),
      duration ? duration : 2000
    );
  };

  closeNotification = () => {
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

  static propTypes = {};

  render() {
    const {
      notification,
      expandMap,
      expandSonar,
      activeMode,
      hidePopup,
      percentBarMenu,
      dataSelection
    } = this.state;
    // const activeView = (

    // )
    return (
      <div class="main-container">
        <div className="dev-mode-version">v0.0.3</div>
        <div class="top-sec">
          <div class="left-sidebar">
            <div class="nav-wrapper">
              <div class="dr-btn btn-half nav-btn-bg-1 btn-l">Surface</div>
              <div class="dr-btn btn-half bg-olive-dark btn-r">Seabed</div>
              <div class="dr-btn btn-full nav-btn-bg-2">
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
                <span class="state-title" style={{ fontSize: 16 }}>
                  Image qual
                </span>
                <span class="red-text" style={{ display: "block" }}>
                  focus
                </span>
                <span class="green-text">Exposure</span>
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
                  <span class="info-value">1076</span>
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
            <div class="main-wrapper">
              <img class="main-img" src="images/Rectangle 130.png" />
            </div>
            <div class="video-controller-wrapper">
              <span class="video-icon-wrapper record-icon-wrapper">
                <img
                  src="images/record-icon.svg"
                  class="video-icon record-icon"
                />
              </span>
              <span class="video-icon-wrapper pause-icon-wrapper">
                <img
                  src="images/pause-icon.svg"
                  class="video-icon pause-icon"
                />
              </span>
              <span class="video-icon-wrapper setting-icon-wrapper">
                <img
                  src="images/setting-icon.svg"
                  class="video-icon setting-icon"
                />
              </span>
            </div>
          </div>

          <div class="right-sidebar">
            <div class="map-wrapper">
              <img class="map-img" src="images/right-sideImg.png" />
              <div class="map-controller-wrapper">
                <span class="map-icon-wrap sizing-icon-wrapper">
                  <img
                    src="images/sizing-icon.svg"
                    class="map-icon sizing-icon"
                  />
                </span>
                <span class="map-icon-wrap zoom-icon-wrapper">
                  <img src="images/zoom-icon.svg" class="map-icon zoom-icon" />
                </span>
              </div>
            </div>
            <div class="sonar-wrapper">
              <img class="sonar-img" src="images/right-sideImg1.png" />
              <div class="sonar-controller-wrapper">
                <span class="sonar-icon-wrap empty-icon-wrapper">
                  <img
                    src="images/zoming-icon.svg"
                    class="sonar-icon empty-icon"
                  />
                </span>
                <span class="sonar-icon-wrap loop-icon-wrapper">
                  <img
                    src="images/loop-icon.svg"
                    class="sonar-icon loop-icon"
                  />
                </span>
                <span class="sonar-icon-wrap sizing-icon-wrapper">
                  <img
                    src="images/sizing-icon.svg"
                    class="sonar-icon sizing-icon"
                  />
                </span>
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
                <img class="data-img" src="images/Picture11.png" />
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
                <img class="data-img" src="images/Picture14.png" />
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
                    <a href="#">Starfish</a>
                  </li>
                  <li class="second-item dr-pagination-item">
                    <a href="#">1</a>
                  </li>
                  <li class="third-item dr-pagination-item">
                    <a href="#">2</a>
                  </li>
                  <li class="fourth-item dr-pagination-item">
                    <a href="#">5</a>
                  </li>
                  <li class="fifth-item dr-pagination-item">
                    <a href="#">10</a>
                  </li>
                </ul>
              </div>
            </div>
            {percentBarMenu && (
              <div
                class="percentage-bar-wrapper"
                onClick={() =>
                  this.setState({ percentBarMenu: false, dataSelection: "" })
                }
              >
                <span class="percentage-bar-item">0%</span>
                <span class="percentage-bar-item">2%</span>
                <span class="percentage-bar-item">10%</span>
                <span class="percentage-bar-item">20%</span>
                <span class="percentage-bar-item">30%</span>
                <span class="percentage-bar-item">40%</span>
                <span class="percentage-bar-item">50%</span>
                <span class="percentage-bar-item">60%</span>
                <span class="percentage-bar-item">70%</span>
                <span class="percentage-bar-item">80%</span>
                <span class="percentage-bar-item">90%</span>
                <span class="percentage-bar-item">100%</span>
              </div>
            )}
          </div>
        </div>
        {!hidePopup && (
          <div class="popup-layer">
            <div class="dr-popup-wrapper">
              <span
                class="dr-close-btn"
                onClick={() => this.setState({ hidePopup: true })}
              >
                <img src="images/close-icon.svg" class="close-icon" />
              </span>
              <span class="dr-popup-label">Training set:</span>
              <div class="dr-popup-inner-wrap">
                <div class="popup-item">
                  <div class="popup-img-wrapper">
                    <img src="images/Picture3.png" class="popup-img" />
                  </div>
                  <span class="popup-label bg-red-l">
                    <span class="popup-text">Halophila Ovalis</span>
                  </span>
                </div>
                <div class="popup-item">
                  <div class="popup-img-wrapper">
                    <img src="images/Picture4.png" class="popup-img" />
                  </div>
                  <span class="popup-label bg-green">
                    <span class="popup-text">Cymodocea Serrulata</span>
                  </span>
                </div>
                <div class="popup-item">
                  <div class="popup-img-wrapper">
                    <img src="images/Picture5.png" class="popup-img" />
                  </div>
                  <span class="popup-label bg-yellow">
                    <span class="popup-text">Zostera Muelleri</span>
                  </span>
                </div>
                <div class="popup-item">
                  <div class="popup-img-wrapper">
                    <img src="images/Picture6.png" class="popup-img" />
                  </div>
                  <span class="popup-label bg-blue-d">
                    <span class="popup-text">Halodule Uninervis</span>
                  </span>
                </div>
                <div class="popup-item">
                  <div class="popup-img-wrapper">
                    <img src="images/Picture7.png" class="popup-img" />
                  </div>
                  <span class="popup-label bg-orange">
                    <span class="popup-text">Halophila Spinulosa</span>
                  </span>
                </div>
                <div class="popup-item">
                  <div class="popup-img-wrapper">
                    <img src="images/Picture8.png" class="popup-img" />
                  </div>
                  <span class="popup-label bg-violet">
                    <span class="popup-text">Syringodium cordifolia</span>
                  </span>
                </div>
                <div class="popup-item">
                  <div class="popup-img-wrapper">
                    <img src="images/Picture9.png" class="popup-img" />
                  </div>
                  <span class="popup-label bg-blue-l">
                    <span class="popup-text">Halophila Decipiens</span>
                  </span>
                </div>
                <div class="popup-item">
                  <div class="popup-img-wrapper"></div>
                  <span class="popup-label"></span>
                </div>
                <div class="popup-item">
                  <div class="popup-img-wrapper"></div>
                  <span class="popup-label"></span>
                </div>
                <div class="popup-item">
                  <div class="popup-img-wrapper">
                    <img src="images/Picture17.png" class="popup-img" />
                  </div>
                  <span class="popup-label bg-pink">
                    <span class="popup-text">Pentaceraster mammillatus</span>
                  </span>
                </div>
                <div class="popup-item">
                  <div class="popup-img-wrapper"></div>
                  <span class="popup-label"></span>
                </div>
                <div class="popup-item">
                  <div class="popup-img-wrapper">
                    <img src="images/question.png" class="popup-img" />
                  </div>
                  <span class="popup-label bg-red-d">
                    <span class="popup-text">Unkonw</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
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
