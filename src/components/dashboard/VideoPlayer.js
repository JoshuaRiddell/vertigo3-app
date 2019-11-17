import React from "react";
import { Player, ControlBar } from "video-react";
import "video-react/dist/video-react.css";
import HLSSource from "./HlsSource";
import TapSelection from "./TapSelection";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faCog } from "@fortawesome/free-solid-svg-icons";
import testVidClip from "../../assets/underwater-test-vid.mp4";
import sampleVidClip from "../../assets/sample-vid-2.mp4";
import { connect } from "react-redux";
import {
  toggleTrainigSetModal,
  sendTapAnnotationData,
  initTrainigSetModal
} from "../../actions/trainingSetActions";
import { setPlayerStateSnapshot } from "../../actions/videoPlayerActions";

class VideoPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: "",
      activeAnnotations: false
    };

    this.togglePlay = this.togglePlay.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
  }

  componentDidMount() {
    if (this.player) {
      this.player.subscribeToStateChange(this.handleStateChange.bind(this));
      // subscribe state change
      this.player.play();
    }
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
    console.log(type, values);
    const { pathIndex, path } = this.props.mapState;
    const latitude = path[pathIndex] ? path[pathIndex][0] : 0;
    const longitude = path[pathIndex] ? path[pathIndex][1] : 0;
    if (type === "tap") {
      const tapData = {
        annotation: {
          timestamp: Date.now(),
          latitude,
          longitude,
          class: null
        },
        point: values
      };
      this.props.sendTapAnnotationData(tapData);
    } else {
      const dragData = {
        showTrainingSet: true,
        annotation: {
          timestamp: Date.now(),
          latitude,
          longitude
        },
        point: values
      };

      this.props.initTrainigSetModal(dragData);
    }
  };

  fullScreen() {
    this.player.toggleFullscreen();
  }

  componentDidUpdate(prevProps, prevState) {
    const { videoPlayerState, trainingSet, videoUrl } = this.props;
    const { showTrainingSet } = trainingSet;

    if (
      prevProps.trainingSet.showTrainingSet !== showTrainingSet &&
      showTrainingSet === false
    ) {
      const { player } = this.player.getState();
      this.player.seek(player.currentTime + 3);
      this.player.play();
      this.refs.tapSelectionRef && this.refs.tapSelectionRef.clearCanvas();
    }

    if (prevProps.videoPlayerState !== videoPlayerState) {
      if (videoPlayerState && Object.keys(videoPlayerState).length) {
        const { currentTime } = videoPlayerState;
        this.player.seek(currentTime);
        // this.player.played.start(currentTime);
      }
    }

    if (prevProps.videoUrl !== videoUrl) {
      this.player.play();
    }
  }

  componentWillUnmount() {
    const { player } = this.player.getState();
    this.props.setPlayerStateSnapshot(player);
    this.player = null;
  }

  render() {
    return (
      <div className="video-player-container">
        <TapSelection
          ref="tapSelectionRef"
          showVideoControls={this.showVideoControls}
          getSelectionValue={this.getSelectionValue}
          handleVideoPlayer={this.player}
          disableAnnotations={this.props.disableAnnotations}
        >
          <Player
            fluid={false}
            width={this.props.playerWidth}
            height={this.props.playerHeight}
            loop
            autoplay={true}
            preload="auto"
            src={this.props.videoUrl}
            // src={testVidClip}
            ref={player => {
              this.player = player;
            }}
          >
            <ControlBar autoHide={false} />
          </Player>
        </TapSelection>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    trainingSet: state.trainingSet,
    videoPlayerState: state.videoPlayerState,
    mapState: state.mapState
  };
};
export default connect(mapStateToProps, {
  toggleTrainigSetModal,
  setPlayerStateSnapshot,
  sendTapAnnotationData,
  initTrainigSetModal
})(VideoPlayer);
