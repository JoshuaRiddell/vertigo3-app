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
      activateGestures: false
    };

    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.showRipple = this.showRipple.bind(this);
    this.callCleanUp = this.callCleanUp.bind(this);
    this.canvasClearId = null;
  }

  touchStart(e) {
    const { gesturesTimeout } = this.state;
    if (gesturesTimeout) clearTimeout(gesturesTimeout);

    if (e.nativeEvent.touches.length === 1) {
      this.clearCanvas();

      const x = e.nativeEvent.touches[0].pageX;
      const y = e.nativeEvent.touches[0].pageY;

      this.setState({
        annotationState: {
          dragging: false,
          start: { x: x, y: y },
          current: { x: x, y: y }
        }
      });
    }
  }

  touchMove(e) {
    if (e.nativeEvent.touches.length === 1) {
      const x = e.nativeEvent.touches[0].pageX;
      const y = e.nativeEvent.touches[0].pageY;

      this.setState({
        annotationState: {
          ...this.state.annotationState,
          dragging: true,
          current: { x: x, y: y }
        }
      });

      this.draw();
      if (!this.state.annotationState.dragging) {
        this.props.handleVideoPlayer.pause();
      }
    }
  }

  touchEnd(e) {
    const { annotationState, scaling } = this.state;
    if (annotationState.dragging) {
      this.props.getSelectionValue(e.type, this.state.annotationState);
      this.setState({ activateGestures: false });
    }
    this.draw();
  }

  componentDidMount() {
    const { offsetWidth, offsetHeight } = this.state.selectionArea.current;
    const { disableAnnotations } = this.props;

    this.setState({ offsetWidth, offsetHeight });

    this.onTouchStart = null;
    this.onTouchMove = null;
    this.onTouchEnd = null;
    this.refs.ripples.onmousedown = null;
    this.refs.ripples.onmouseup = null;
  }

  activateGestures = e => {
    const { activateGestures, gesturesTimeout } = this.state;

    if (!activateGestures) {
      this.props.handleVideoPlayer.pause();
      this.setState({
        activateGestures: true,
        gesturesTimeout: setTimeout(() => {
          this.props.handleVideoPlayer.play();
          this.setState({ activateGestures: false });
        }, 3000)
      });
    } else {
      if (gesturesTimeout) clearTimeout(gesturesTimeout);

      this.props.handleVideoPlayer.play();
      this.setState({ activateGestures: false, gesturesTimeout: "" });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const { activateGestures } = this.state;
    if (
      prevState.activateGestures !== activateGestures &&
      activateGestures === true
    ) {
      this.onTouchStart = this.touchStart;
      this.onTouchMove = this.touchMove;
      this.onTouchEnd = this.touchEnd;
      this.refs.ripples.onmousedown = this.showRipple;
      this.refs.ripples.onmouseup = this.callCleanUp;
      this.onClick = null;
    }

    if (
      prevState.activateGestures !== activateGestures &&
      activateGestures === false
    ) {
      this.onTouchStart = null;
      this.onTouchMove = null;
      this.onTouchEnd = null;
      this.refs.ripples.onmousedown = null;
      this.refs.ripples.onmouseup = null;
      this.onClick = this.activateGestures;
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

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.strokeRect(x, y, width, height);
  };

  clearCanvas = type => {
    const { canvas } = this.state;

    this.setState({
      annotationState: {
        dragging: false,
        start: { x: 0, y: 0 },
        current: { x: 0, y: 0 }
      }
    });

    canvas.current
      .getContext("2d")
      .clearRect(0, 0, canvas.current.width, canvas.current.height);

    setTimeout(() => this.draw(), 300);
  };

  showRipple = e => {
    e.preventDefault();
    if (e.button === 0) {
      const rippleContainer = e.currentTarget;
      const size = rippleContainer.offsetWidth;
      const pos = rippleContainer.getBoundingClientRect();
      const x = e.pageX - pos.x - size / 2;
      const y = e.pageY - pos.y - size / 2;

      const spanStyles = {
        top: y + "px",
        left: x + "px",
        height: size + "px",
        width: size + "px"
      };
      const count = this.state.count + 1;
      this.setState({
        spanStyles: { ...this.state.spanStyles, [count]: spanStyles },
        count: count
      });
      // this.props.showVideoControls();
    }
  };

  renderRippleSpan = () => {
    const { showRipple = false, spanStyles = {} } = this.state;
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

  /* Debounce Code to call the Ripple removing function */
  callCleanUp = () => {
    const { bounce, gesturesTimeout } = this.state;
    if (bounce) clearTimeout(bounce);

    this.setState({
      bounce: setTimeout(
        () => this.setState({ spanStyles: {}, count: 0 }),
        2000
      )
    });
    //api call
    const audio = new Audio(soundDataSuccess);
    audio.play();
  };

  render() {
    const { drag, offsetWidth, offsetHeight } = this.state;

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
        onContextMenu={e => {
          e.preventDefault();
          return false;
        }}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onClick={!disableAnnotations ? this.activateGestures : null}
      >
        {children}

        <canvas
          id="canvas"
          className="selection-area"
          ref={this.state.canvas}
          width={offsetWidth}
          height={offsetHeight}
          style={drag ? { border: "4px solid green" } : {}}
          onContextMenu={e => {
            e.preventDefault();
            return false;
          }}
        />
        <div
          ref="ripples"
          className="rippleContainer"
          onMouseDown={this.onmousedown}
          onMouseUp={this.onmouseup}
          onContextMenu={e => {
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
