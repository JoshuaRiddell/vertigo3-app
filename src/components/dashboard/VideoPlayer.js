import React from "react";
import TapSelection from "./TapSelection";
import { connect } from "react-redux";
import {
  toggleTrainigSetModal,
  sendTapAnnotationData,
  initTrainigSetModal
} from "../../actions/trainingSetActions";

const videoBasePath = process.env.REACT_APP_VIDEO_API_BASE_PATH;

class VideoPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeAnnotations: false,
      streamAvailable: true,
      pauseStream: false,
      jpegStreamCanvas: React.createRef()
    };

    this.image = new Image();
    this.image.src = videoBasePath;

    this.image.onload = this.onStreamLoad;
    this.image.onerror = this.onError;
  }

  componentDidMount() {
    const {
      jpegStreamCanvas: { current }
    } = this.state;
    const ctx = current.getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, 1076, 900);
    ctx.fillStyle = "black";
    ctx.fill();

    this.drawImages();
  }

  onStreamLoad = (e) => {
    this.setState({ streamAvailable: true });
  };

  onError = (e) => {
    const { pauseStream } = this.state;

    if (!pauseStream) {
      this.setState({ streamAvailable: false });
    }
  };

  drawImages = () => {
    const {
      jpegStreamCanvas: { current }
    } = this.state;
    const ctx = current.getContext("2d");

    this.setState({
      intervalId: setInterval(() => {
        try {
          ctx.drawImage(
            this.image,
            0,
            0,
            this.props.playerWidth,
            this.props.playerHeight
          );
        } catch (err) {
          this.image.src = videoBasePath;
        }
      }, 1000 / 30)
    });
  };

  playStream = () => {
    this.setState(
      { pauseStream: false },
      () => (this.image.src = videoBasePath)
    );
  };

  pauseStream = () => {
    this.setState({ pauseStream: true }, () => (this.image.src = ""));
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
        point: this.scalingAlgo(values, type)
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
        point: this.scalingAlgo(values)
      };

      this.props.initTrainigSetModal(dragData);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { trainingSet } = this.props;
    const { showTrainingSet } = trainingSet;

    if (
      prevProps.trainingSet.showTrainingSet !== showTrainingSet &&
      showTrainingSet === false
    ) {
      this.playStream();
      this.refs.tapSelectionRef && this.refs.tapSelectionRef.clearCanvas();
    }
  }

  componentWillUnmount() {
    const { intervalId } = this.state;

    if (intervalId) {
      clearInterval(intervalId);
    }
    this.image = null;
  }

  scalingAlgo = (values, action) => {
    const { playerWidth, playerHeight } = this.props;
    const blackFlyVideoSize = { h: 2448, v: 2048 };
    const scaled_h = blackFlyVideoSize.h / playerWidth;
    const scaled_v = blackFlyVideoSize.v / playerHeight;

    if (action === "tap") {
      const { x, y } = values;
      return { x: Math.round(x * scaled_h), y: Math.round(y * scaled_v) };
    } else {
      const { topLeft, bottomRight } = values;
      return {
        topLeft: {
          x: Math.round(topLeft.x * scaled_h),
          y: Math.round(topLeft.y * scaled_v)
        },
        bottomRight: {
          x: Math.round(bottomRight.x * scaled_h),
          y: Math.round(bottomRight.y * scaled_v)
        }
      };
    }
  };
  render() {
    const {
      session: { recordingMode }
    } = this.props;
    const { streamAvailable, pauseStream } = this.state;
    return (
      <div className="video-player-container">
        <TapSelection
          ref="tapSelectionRef"
          getSelectionValue={this.getSelectionValue}
          disableAnnotations={this.props.disableAnnotations || !recordingMode}
          playStream={this.playStream}
          pauseStream={this.pauseStream}
        >
          {!streamAvailable && !pauseStream && (
            <img
              className="stream-unavailable-icon flash-infinite"
              src={"images/no-video.svg"}
            ></img>
          )}
          <canvas
            id="jpeg-stream-canvas"
            ref={this.state.jpegStreamCanvas}
            width={this.props.playerWidth}
            height={this.props.playerHeight}
          ></canvas>
        </TapSelection>
      </div>
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
export default connect(mapStateToProps, {
  toggleTrainigSetModal,
  sendTapAnnotationData,
  initTrainigSetModal
})(VideoPlayer);
