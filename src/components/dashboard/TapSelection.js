import React, { Component } from "react";
import Hammer from "hammerjs";
import soundDataSuccess from "../../assets/Data_sent.ogg";

export default class TapSelection extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      selectionArea: React.createRef(),
      canvas: React.createRef(),
      ripples: React.createRef(),
      spanStyles: {},
      count: 0,
      annotationState: {
        dragging: false,
        start: {},
        current: {}
      },
      zoomState: {
        zooming: false,
        scale: 1,
        lastScale: 1,
        startZoomPosition: { x: 0, y: 0 },
        currentZoomPosition: { x: 0, y: 0 }
      },
      activateGestures: false
    };
  }

  touchStart = (e) => {
    const { gesturesTimeout } = this.state;
    const {
      center: { x, y }
    } = e;

    if (gesturesTimeout) clearTimeout(gesturesTimeout);

    this.setState({
      annotationState: {
        dragging: true,
        start: { x, y },
        current: { x, y }
      },
      zoomState: {
        ...this.state.zoomState,
        zooming: false
      }
    });
  };

  touchMove = (e) => {
    console.log(e);
    const {
      center: { x, y }
    } = e;

    const { annotationState } = this.state;
    if (annotationState.dragging) {
      this.setState({
        annotationState: {
          ...this.state.annotationState,
          current: { x: x, y: y }
        }
      });

      this.draw();
    } else {
      this.pinchZoom(e);
    }
    if (!this.state.annotationState.dragging) {
      this.props.pauseStream();
    }
  };

  touchEnd = (e) => {
    const { annotationState, gesturesTimeout } = this.state;
    if (annotationState.dragging && e.distance > 10) {
      this.props.getSelectionValue(e.type, {
        topLeft: annotationState.start,
        bottomRight: annotationState.current
      });
      this.setState({ activateGestures: false });
    } else {
      if (gesturesTimeout) clearTimeout(gesturesTimeout);
      this.setState({
        annotationState: {
          dragging: false,
          start: {},
          current: {}
        },
        gesturesTimeout: setTimeout(() => {
          this.setState({ activateGestures: false });
          this.zoomReset();
          this.props.playStream();
        }, 3000)
      });
    }

    this.draw();
  };

  componentDidMount() {
    const { selectionArea } = this.state;
    const { offsetWidth, offsetHeight } = selectionArea.current;
    const { disableAnnotations } = this.props;

    this.setState({ offsetWidth, offsetHeight });

    this.refs.ripples.onmousedown = null;
    this.refs.ripples.onmouseup = null;

    this.hammerTime = new Hammer(selectionArea.current, {});

    this.hammerTime.get("pinch").set({
      enable: true
    });

    this.hammerTime.on("tap", this.activateGestures);
  }

  activateGestures = (e) => {
    const { disableAnnotations } = this.props;
    const { activateGestures, gesturesTimeout } = this.state;

    if (disableAnnotations) return;

    if (!activateGestures) {
      this.props.pauseStream();
      this.setState({
        activateGestures: true,
        gesturesTimeout: setTimeout(() => {
          this.props.playStream();
          this.setState({ activateGestures: false });
        }, 3000)
      });
    } else {
      if (gesturesTimeout) clearTimeout(gesturesTimeout);
      this.zoomReset();
      this.props.playStream();
      this.setState({
        activateGestures: false,
        gesturesTimeout: ""
      });
      this.showRipple(e);
    }
  };

  pinchZoom = (ev) => {
    const { gesturesTimeout, zoomState, annotationState } = this.state;
    if (gesturesTimeout) clearTimeout(gesturesTimeout);

    let posX = zoomState.currentZoomPosition.x,
      posY = zoomState.currentZoomPosition.y,
      scale = zoomState.scale,
      last_scale = zoomState.lastScale,
      last_posX = zoomState.startZoomPosition.x,
      last_posY = zoomState.startZoomPosition.y,
      max_pos_x = 0,
      max_pos_y = 0,
      el = ev.target;

    //pinch
    if (ev.type === "pinch") {
      scale = Math.max(0.999, Math.min(last_scale * ev.scale, 4));
    }

    if (ev.type === "pinchstart") {
      this.setState({
        annotationState: {
          ...annotationState,
          drag: false
        }
      });
    }
    //pan
    if (scale != 1) {
      posX = last_posX + ev.deltaX;
      posY = last_posY + ev.deltaY;
      max_pos_x = Math.ceil(((scale - 1) * el.clientWidth) / 2);
      max_pos_y = Math.ceil(((scale - 1) * el.clientHeight) / 2);

      if (posX > max_pos_x) {
        posX = max_pos_x;
      }
      if (posX < -max_pos_x) {
        posX = -max_pos_x;
      }
      if (posY > max_pos_y) {
        posY = max_pos_y;
      }
      if (posY < -max_pos_y) {
        posY = -max_pos_y;
      }

      if (ev.type === "pinch") {
        this.setState({
          zoomState: {
            ...this.state.zoomState,
            scale,
            zooming: true,
            currentZoomPosition: { x: posX, y: posY }
          }
        });
      }

      if (ev.type === "panmove") {
        this.setState({
          zoomState: {
            ...this.state.zoomState,
            currentZoomPosition: { x: posX, y: posY }
          }
        });
      }

      if (ev.type === "pinchend") {
        last_scale = scale;

        this.setState({
          zoomState: {
            ...this.state.zoomState,
            lastScale: last_scale,
            startZoomPosition: { x: posX, y: posY },
            currentZoomPosition: { x: posX, y: posY }
          }
        });
      }

      if (ev.type === "panend") {
        this.setState({
          zoomState: {
            ...this.state.zoomState,
            startZoomPosition: this.state.zoomState.currentZoomPosition
          }
        });
      }
    }
  };

  zoomReset = () => {
    const { zoomResetTimeoutId } = this.state;

    if (zoomResetTimeoutId) clearTimeout(zoomResetTimeoutId);

    this.setState({
      zoomState: {
        zooming: false,
        scale: 1,
        lastScale: 1,
        startZoomPosition: { x: 0, y: 0 },
        currentZoomPosition: { x: 0, y: 0 }
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { activateGestures } = this.state;
    if (
      prevState.activateGestures !== activateGestures &&
      activateGestures === true
    ) {
      this.hammerTime.on("press", this.touchStart);
      this.hammerTime.on(
        "pinchstart pinch pinchend panmove panend",
        this.touchMove
      );
      this.hammerTime.on("panend pancancel pressup", this.touchEnd);
      //avas
    }

    if (
      prevState.activateGestures !== activateGestures &&
      activateGestures === false
    ) {
      this.hammerTime.off(
        "press pressup pan panmove panend pancancel pinchstart pinch pinchend"
      );
    }
  }

  draw = () => {
    const { dragging, start, current } = this.state.annotationState;
    const { canvas } = this.state;
    const {
      left,
      top
    } = this.state.selectionArea.current.getBoundingClientRect();
    let ctx = canvas.current.getContext("2d");

    ctx.lineWidth = 6;
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle = "#FF0000";

    var scaling_factor = 1.0;
    if (dragging) {
      scaling_factor = 0.8;
    }

    const drag_width = scaling_factor * (current.x - start.x);
    const drag_height = scaling_factor * (current.y - start.y);
    const x = start.x - drag_width - left;
    const y = start.y - drag_height - top;
    const width = drag_width * 2;
    const height = drag_height * 2;
    // console.log({ x, y, drag_width, drag_height, width, height });
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.strokeRect(x, y, width, height);
  };

  clearCanvas = (type) => {
    const { canvas, zoomState } = this.state;

    this.setState({
      annotationState: {
        dragging: false,
        start: { x: 0, y: 0 },
        current: { x: 0, y: 0 }
      }
    });
    this.zoomReset();
    canvas.current
      .getContext("2d")
      .clearRect(0, 0, canvas.current.width, canvas.current.height);

    setTimeout(() => this.draw(), 300);
  };

  showRipple = (e) => {
    e.preventDefault();

    const { center } = e;
    const { selectionArea, bounce } = this.state;
    const rippleContainer = selectionArea.current;
    const size = rippleContainer.offsetWidth;
    const pos = rippleContainer.getBoundingClientRect();
    const x = center.x - pos.x - size / 2;
    const y = center.y - pos.y - size / 2;

    const spanStyles = {
      top: y + "px",
      left: x + "px",
      height: size + "px",
      width: size + "px"
    };
    const count = this.state.count + 1;
    if (bounce) clearTimeout(bounce);

    this.setState({
      spanStyles: { ...this.state.spanStyles, [1]: spanStyles },
      count: count,
      bounce: setTimeout(() => this.setState({ spanStyles: {}, count: 0 }), 500)
    });

    //api call
    const audio = new Audio(soundDataSuccess);
    audio.play();

    this.props.getSelectionValue(e.type, { x, y });
  };

  renderRippleSpan = () => {
    const { spanStyles = {} } = this.state;
    const spanArray = Object.keys(spanStyles);
    if (spanArray && spanArray.length > 0) {
      return spanArray.map((key, index) => {
        return (
          <span
            key={"spanCount_" + index}
            className=""
            style={{ ...spanStyles[key] }}
          />
        );
      });
    } else {
      return null;
    }
  };

  render() {
    const {
      annotationState: { dragging },
      offsetWidth,
      offsetHeight,
      zoomState: { zooming, currentZoomPosition, scale },
      activateGestures
    } = this.state;

    const {
      children = null,
      classes = "",
      onClickHandler = null,
      disableAnnotations
    } = this.props;

    return (
      <div
        ref={this.state.selectionArea}
        className={"ripple " + classes}
        onContextMenu={(e) => {
          e.preventDefault();
          return false;
        }}
      >
        {/* <div
          style={{
            position: "absolute",
            zIndex: 1000,
            color: "white",
            fontSize: "23px",
            backgroundColor: "black",
            padding: "10px"
          }}
        >
          {JSON.stringify(this.state.zoomState)}
        </div> */}
        <div
          className="zoomFrame"
          style={
            zooming
              ? {
                  transform: `translate3d(${currentZoomPosition.x}px, ${currentZoomPosition.y}px, 0) scale3d(${scale}, ${scale}, 1)`
                }
              : {
                  transform: `translate3d(${currentZoomPosition.x}px, ${currentZoomPosition.y}px, 0) scale3d(${scale}, ${scale}, 1)`,
                  transition: "-webkit-transform 0.3s ease-in-out",
                  transition: "transform 0.3s ease-in-out"
                }
          }
        >
          {children}
        </div>

        <canvas
          id="canvas"
          className={`selection-area ${
            activateGestures ? "gesturesActive" : ""
          }`}
          ref={this.state.canvas}
          width={offsetWidth}
          height={offsetHeight - 7}
          style={
            dragging
              ? { outline: "10px solid #24ea00", outlineOffset: "-8px" }
              : {}
          }
          onContextMenu={(e) => {
            e.preventDefault();
            return false;
          }}
        />
        <div
          ref="ripples"
          className="rippleContainer"
          onContextMenu={(e) => {
            e.preventDefault();
            return false;
          }}
        >
          {this.renderRippleSpan()}
        </div>
      </div>
    );
  }
}
