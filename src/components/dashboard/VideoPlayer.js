import React from "react";
import { Player, ControlBar } from "video-react";
import "video-react/dist/video-react.css";
import HLSSource from "./HlsSource";
// import TouchRipples from "./TouchRipples";
import TapSelection from "./TapSelection";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faCog } from "@fortawesome/free-solid-svg-icons";
import testVidClip from "../../assets/underwater-test-vid.mp4";
import { connect } from "react-redux";
import { toggleTrainigSetModal } from "../../actions/trainingSetActions";

class VideoPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: "",
      showPressSelection: false,
      seletionValues: {}
    };

    this.togglePlay = this.togglePlay.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    this.player.play();
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  togglePlay() {
    const { player } = this.state;

    if (!player.paused) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  showVideoControls = () => {
    const { timeOutId } = this.state;

    if (timeOutId) clearTimeout(timeOutId);

    this.setState({
      showControls: true,
      timeOutId: setTimeout(() => this.setState({ showControls: false }), 5000)
    });
  };

  getSelectionValue = (type, values) => {
    if (
      (type === "panend" || type === "pressup") &&
      Object.keys(values).length
    ) {
      //this.setState({ seletionValues: values, showPressSelection: true });
      this.props.toggleTrainigSetModal(true);
      console.log(type, values);
    }
  };

  fullScreen() {
    this.player.toggleFullscreen();
  }

  componentDidUpdate(prevProps, prevState) {
    const { player } = this.state;

    // if (
    //   prevState.player &&
    //   prevState.player.isFullscreen !== player.isFullscreen &&
    //   player.isFullscreen
    // ) {
    //   this.setState({
    //     player: {
    //       ...this.state.player,
    //       isFullscreen: false
    //     }
    //   });
    //   const fullScreen = document.querySelectorAll(
    //     ".video-react-fullscreen"
    //   )[0];

    //   if (fullScreen && fullScreen.classList) {
    //     document
    //       .querySelectorAll(".video-react-fullscreen")[0]
    //       .classList.remove("video-react-fullscreen");
    //   }
    // }
    const { trainingSet } = this.props;
    const { showTrainingSet } = trainingSet;

    if (
      prevProps.trainingSet.showTrainingSet !== showTrainingSet &&
      showTrainingSet === false
    ) {
      this.setState({ showPressSelection: false });
      this.player.play();
      this.refs.tapSelectionRef && this.refs.tapSelectionRef.clearCanvas();
    }
  }

  render() {
    const {
      showControls,
      player,
      showPressSelection,
      seletionValues,
      startRecord
    } = this.state;

    return (
      <div className="video-player-container">
        {/* <div
          id="video-controls"
          className="controls"
          style={{ width: this.props.playerWidth }}
        >
          <button
            className={startRecord ? "notRec Rec" : "notRec"}
            onClick={() => {
              this.setState({ startRecord: !startRecord });
              this.props.showNotification(
                !startRecord ? "Recording Stated" : "Recording Stopped"
              );
            }}
          />
          <button href="#" className="round-button" onClick={this.togglePlay}>
            {player && player.paused ? (
              <FontAwesomeIcon icon={faPlay} size="4x" />
            ) : (
              <FontAwesomeIcon icon={faPause} size="4x" />
            )}
          </button>
        </div> */}

        {/* {showPressSelection && (
          <div
            className="popup"
            style={{
              top: seletionValues.startX,
              left: seletionValues.startY
            }}
          >
            <button
              style={{ float: "right" }}
              onClick={() => {
                this.setState({ showPressSelection: false });
                this.player.play();
                this.refs.tapSelectionRef &&
                  this.refs.tapSelectionRef.clearCanvas();
              }}
            >
              X
            </button>
            <h3> Annotations </h3>
            <p>{`Top = ${seletionValues.mouseStartX +
              seletionValues.startX}`}</p>
            <p>
              {`Left = ${seletionValues.mouseStartY - seletionValues.startY}`}
            </p>
            <p>{`Width = ${Math.abs(seletionValues.width)}px`}</p>
            <p>{`Height = ${Math.abs(seletionValues.height)}px`}</p>
          </div>
        )} */}

        <TapSelection
          ref="tapSelectionRef"
          showVideoControls={this.showVideoControls}
          getSelectionValue={this.getSelectionValue}
          handleVideoPlayer={this.player}
        >
          <Player
            fluid={false}
            width={this.props.playerWidth}
            height={this.props.playerHeight}
            loop
            autoplay
            ref={player => {
              this.player = player;
            }}
          >
            <source src={testVidClip} />
            {/* <HLSSource
              isVideoChild
              //src="//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8"
              src="underwater-test-vid.mp4"
             type='application video/mp4' 
            /> */}
            <ControlBar
              disableDefaultControls={
                player && player.isFullscreen ? false : true
              }
            />
          </Player>
        </TapSelection>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    trainingSet: state.trainingSet
  };
};
export default connect(
  mapStateToProps,
  { toggleTrainigSetModal }
)(VideoPlayer);
