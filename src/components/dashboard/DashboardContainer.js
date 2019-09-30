import React from "react";
import VideoPlayer from "./VideoPlayer";
import MapComponent from "./MapComponent";
import Sonar from "./Sonar";
import FullScreenFab from "./FullScreenFab";
import NotificationBar from "./NotificationBar";

export default class DashboardContainer extends React.Component {
  state = {
    expandFrame: false,
    expandSonar: false,
    expandMap: false,
    activeMode: "surFace"
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

  static propTypes = {};

  render() {
    const { notification, expandMap, expandSonar, activeMode } = this.state;
    // const activeView = (

    // )
    return (
      <>
        <FullScreenFab />
        <div className="wrapper">
          <div className="nav-box">
            <div style={{ display: "flex" }}>
              <button
                className="block-btn"
                style={
                  activeMode === "surFace" ? { backgroundColor: "green" } : {}
                }
                onClick={() => this.setState({ activeMode: "surFace" })}
              >
                Surface
              </button>
              <button
                className="block-btn"
                style={
                  activeMode === "seaBed" ? { backgroundColor: "green" } : {}
                }
                onClick={() => this.setState({ activeMode: "seaBed" })}
              >
                Seabed
              </button>
            </div>
            <button
              className="block-btn"
              style={
                activeMode === "manual" ? { backgroundColor: "green" } : {}
              }
              onClick={() => this.setState({ activeMode: "manual" })}
            >
              Manual
            </button>
          </div>
          <div className="status-box">
            <span className="placeholder">Status</span>
          </div>
          <div className="info-box">
            <span className="placeholder">Info</span>
          </div>
          <div className="video-box active-frame">
            {expandMap && (
              <>
                <MapComponent mapHeight={900} />
                <button
                  className="expand-frame-btn"
                  onClick={() => this.setState({ expandMap: !expandMap })}
                >
                  <i className="fa fa-arrows-alt fa-3x" />
                </button>
              </>
            )}
            {expandSonar && (
              <>
                <Sonar expandSonar={expandSonar} activeMode={activeMode} />
                <button
                  className="expand-frame-btn"
                  onClick={() => this.setState({ expandSonar: !expandSonar })}
                >
                  <i className="fa fa-arrows-alt fa-3x" />
                </button>
              </>
            )}
            {!expandSonar && !expandMap ? (
              <VideoPlayer
                showNotification={this.showNotification}
                playerWidth={1076}
                playerHeight={900}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="map-box">
            {expandMap ? (
              <VideoPlayer
                showNotification={this.showNotification}
                playerWidth={538}
                playerHeight={450}
              />
            ) : (
              <>
                <MapComponent mapHeight={450} />
                {!expandSonar && !expandMap && (
                  <button
                    className="expand-frame-btn"
                    onClick={() => this.setState({ expandMap: !expandMap })}
                  >
                    <i className="fa fa-arrows-alt fa-3x" />
                  </button>
                )}
              </>
            )}
          </div>
          <div className="sonar-box">
            {expandSonar ? (
              <VideoPlayer
                showNotification={this.showNotification}
                playerWidth={538}
                playerHeight={450}
              />
            ) : (
              <>
                <Sonar expandSonar={expandSonar} activeMode={activeMode} />
                {!expandSonar && !expandMap && (
                  <button
                    className="expand-frame-btn"
                    onClick={() => this.setState({ expandSonar: !expandSonar })}
                  >
                    <i className="fa fa-arrows-alt fa-3x" />
                  </button>
                )}
              </>
            )}
          </div>
          <div className="btm-box">
            <span className="placeholder">Bottom controls</span>
          </div>
        </div>
        <NotificationBar
          {...notification}
          closeNotification={this.closeNotification}
        />
      </>
    );
  }
}
