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
import GliderStats from "./GliderStats";
import SeaBedInfo from "./SeaBedInfo";
import SeagrassSection from "./SeagrassSection";
import sampleVidClip from "../../assets/sample-vid-2.mp4";

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
    videoUrl: ""
  };

  componentDidMount() {
    // const video = document.getElementById("video-1");
    fetch(sampleVidClip)
      .then(response => response.blob())
      .then(blob =>
        this.setState({ videoUrl: window.URL.createObjectURL(blob) })
      );
  }
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

  setStarFishCounter = count => {
    const { starFishCounter } = this.state;
    this.setState({ starFishCounter: starFishCounter + 1 });
  };

  static propTypes = {};

  render() {
    const {
      notification,
      expandMap,
      expandSonar,
      activeMode,
      starFishCounter,
      flashValue,
      videoUrl
    } = this.state;

    const { trainingSet } = this.props;
    const { showTrainingSet } = trainingSet;

    let frameOrder = [
      <VideoPlayer
        key={"videoPlayer"}
        showNotification={this.showNotification}
        playerWidth={1076}
        playerHeight={900}
        videoUrl={videoUrl}
      />,
      <MapComponent mapHeight={450} expandMap={expandMap} />,
      <Sonar expandSonar={expandSonar} activeMode={activeMode} />
    ];

    if (expandMap) {
      frameOrder = [
        <MapComponent mapHeight={900} expandMap={expandMap} />,
        <VideoPlayer
          key={"videoPlayer"}
          showNotification={this.showNotification}
          playerWidth={538}
          playerHeight={450}
          disableAnnotations
          videoUrl={videoUrl}
        />,
        <Sonar expandSonar={expandSonar} activeMode={activeMode} />
      ];
    }

    if (expandSonar) {
      frameOrder = [
        <Sonar expandSonar={expandSonar} activeMode={activeMode} />,
        <MapComponent mapHeight={450} expandMap={expandMap} />,
        <VideoPlayer
          key={"videoPlayer"}
          showNotification={this.showNotification}
          playerWidth={538}
          playerHeight={450}
          disableAnnotations
          videoUrl={videoUrl}
        />
      ];
    }

    return (
      <div className="main-container">
        {/* <div className="dev-mode-version">v0.0.4</div> */}
        <div className="top-sec">
          <div className="left-sidebar">
            <div className="nav-wrapper">
              <div
                className={`dr-btn btn-half btn-l ${
                  activeMode === "surFace" ? "nav-btn-bg-1" : "bg-olive-dark"
                }`}
                onClick={() => this.setState({ activeMode: "surFace" })}
              >
                Surface
              </div>
              <div
                className={`dr-btn btn-half btn-r ${
                  activeMode === "seaBed" ? "nav-btn-bg-1" : "bg-olive-dark"
                }`}
                onClick={() => this.setState({ activeMode: "seaBed" })}
              >
                Seabed
              </div>
              <div
                className={`dr-btn btn-full ${
                  activeMode === "manual" ? "nav-btn-bg-1" : "nav-btn-bg-2"
                }`}
                onClick={() => this.setState({ activeMode: "manual" })}
              >
                manual
                <span>
                  <img src="images/remote.png" className="remote-icon" />
                </span>
              </div>
            </div>

            <div className="state-wrapper bg-olive-light">
              <GliderStats />
            </div>

            <div className="info-wrapper bg-olive-dark">
              <SeaBedInfo
                starFishCounter={starFishCounter}
                flashValue={flashValue}
              />
            </div>
          </div>

          <div className="main-video-wrapper">
            <div className="main-wrapper">{frameOrder[0]}</div>
            {!expandMap && !expandSonar && (
              <div className="video-controller-wrapper">
                <SessionControls showNotification={this.showNotification} />

                <Popup
                  trigger={
                    <span
                      href="#"
                      className="video-icon-wrapper setting-icon-wrapper"
                    >
                      <img
                        src="images/setting-icon.svg"
                        className="video-icon setting-icon"
                      />
                    </span>
                  }
                  position="bottom center"
                  closeOnDocumentClick={false}
                >
                  {close => (
                    <div className="settings-popup">
                      <span className="dr-close-btn" onClick={close}>
                        <img
                          src="images/close-icon.svg"
                          className="close-icon"
                        />
                      </span>
                      <p>
                        Version: <strong>0.0.14</strong>
                      </p>
                    </div>
                  )}
                </Popup>
              </div>
            )}
          </div>

          <div className="right-sidebar">
            <div className="map-wrapper">
              {frameOrder[1]}

              <div className="map-controller-wrapper">
                <ExpandButton
                  classNames={"map-icon sizing-icon"}
                  active={expandMap}
                  handler={() => this.expandingFrames("map")}
                  frame={"map"}
                />
              </div>
            </div>

            <div className="sonar-wrapper">
              {frameOrder[2]}
              <div className="sonar-controller-wrapper">
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

        <SeagrassSection setStarFishCounter={this.setStarFishCounter} />

        {showTrainingSet && <TraningSetModal />}

        <NotificationBar
          {...notification}
          closeNotification={this.closeNotification}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    trainingSet: state.trainingSet
  };
};
export default connect(mapStateToProps, {})(DashboardContainer);
