import React, { Component } from "react";
import Hammer from "hammerjs";

export default class TapSelection extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      selectionArea: React.createRef(),
      canvas: React.createRef(),
      ripples: React.createRef(),
      spanStyles: {},
      count: 0
    };

    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    this.annotationState = {
        dragging: false,
        start: {},
        current: {}
    };
  }

  touchStart(e) {
    console.log("Touch start");

    this.props.handleVideoPlayer.pause();

    const x = e.nativeEvent.touches[0].pageX;
    const y = e.nativeEvent.touches[0].pageY;

    this.annotationState.dragging = false;
    this.annotationState.start = {"x": x, "y": y}
  }

  touchMove(e) {
    console.log("Touch move");

    const x = e.nativeEvent.touches[0].pageX;
    const y = e.nativeEvent.touches[0].pageY;

    this.annotationState.dragging = true;
    this.annotationState.current = {"x": x, "y": y}

    this.draw();
  }

  touchEnd(e) {
    console.log("Touch end");

    this.props.handleVideoPlayer.play();

    this.annotationState.dragging = false;

    this.draw();
  }

  componentDidMount() {
    const { offsetWidth, offsetHeight } = this.state.selectionArea.current;
    const { disableAnnotations } = this.props;

    this.setState({ offsetWidth, offsetHeight });

    console.log(this.state.selectionArea.current.offsetLeft);

    if (disableAnnotations) {
        // implement unbinding of events here
    }
  }

  draw = () => {
    const { dragging, start, current } = this.annotationState;
    const { canvas } = this.state;
    const { left, top } = this.state.selectionArea.current.getBoundingClientRect();
    let ctx = canvas.current.getContext("2d");

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle = "#FF0000";

    console.log(left);

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
    const { canvas, rect } = this.state;

    this.setState({ drag: false, rect: {} });

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

      this.props.showVideoControls();
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
  callCleanUp = (cleanup, delay) => {
    const { bounce } = this.state;

    clearTimeout(bounce);

    this.setState({
      bounce: setTimeout(() => cleanup(), delay)
    });
  };

  cleanUp = () => {
    this.setState({ spanStyles: {}, count: 0 });
  };

  componentWillUnmount() {
    this.mc.destroy();
  }

  render() {
    const { drag, rect, offsetWidth, offsetHeight } = this.state;

    const { children = null, classes = "", onClickHandler = null } = this.props;

    return (
      <div
        ref={this.state.selectionArea}
        className={"ripple " + classes}
        onContextMenu={e => {
          e.preventDefault();
          return false;
        }}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
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
          //ref={this.state.ripples}
          className="rippleContainer"
          onMouseDown={this.showRipple}
          onMouseUp={() => this.callCleanUp(this.cleanUp, 2000)}
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
