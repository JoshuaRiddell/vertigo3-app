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
      rect: {},
      drag: false,
      spanStyles: {},
      count: 0
    };
  }

  componentDidMount() {
    const { offsetWidth, offsetHeight } = this.state.selectionArea.current;

    this.setState({ offsetWidth, offsetHeight });
    this.mc = new Hammer(this.state.selectionArea.current);
    //this.ripple = new Hammer(this.state.ripples.current);

    // this.ripple.on("tap", e => {
    //   this.showRipple(e);
    // });
    // let the pan gesture support all directions.
    // this will block the vertical scrolling on a touch-device while on the element
    this.mc.get("pan").set({ direction: Hammer.DIRECTION_HORIZONTAL });
    // this.mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });

    // listen to events...
    this.mc.on("press", e => {
      console.log(e.type + " gesture detected.");
      if (e.type === "press") {
        const { srcEvent } = e;
        const { offsetLeft, offsetTop } = this.state.selectionArea.current;
        this.setState({
          rect: {
            mouseStartX: srcEvent.pageX - offsetLeft,
            mouseStartY: srcEvent.pageY - offsetTop,
            startX: srcEvent.pageX - offsetLeft,
            startY: srcEvent.pageY - offsetTop
          },
          drag: true
        });
        console.log(
          offsetWidth,
          offsetHeight,
          offsetLeft,
          offsetTop,
          e,
          srcEvent
        );
        this.props.handleVideoPlayer.pause();
      }
    });

    // listen to events...
    this.mc.on(
      "panleft panright panup pandown panend pancancel pressup tap",
      e => {
        console.log(e.type + " gesture detected.");
        const { drag, rect, canvas } = this.state;
        const { srcEvent } = e;
        const { offsetLeft, offsetTop } = this.state.selectionArea.current;
        console.log(e);

        if (srcEvent.type === "pointercancel") {
          this.props.handleVideoPlayer.play();
          this.setState({ rect: {}, drag: false });
        }
        if (
          e.type === "tap" ||
          e.type === "pressup" ||
          e.type === "pancancel" ||
          e.type === "panend"
        ) {
          //return this.clearCanvas(e.type);
          //apply scale factor
          if (drag) {
            const width =
              rect.startX > rect.mouseStartX
                ? rect.width - 100
                : rect.width + 100;
            const height =
              rect.startY > rect.mouseStartY
                ? rect.height - 100
                : rect.height + 100;

            const x =
              rect.startX > rect.mouseStartX
                ? rect.startX - 100
                : rect.startX + 100;
            const y =
              rect.startY > rect.mouseStartY
                ? rect.startY - 100
                : rect.startY + 100;

            this.setState({
              rect: {
                ...rect,
                // startX: x,
                // startY: y,
                width: width,
                height: height
              },
              drag: false
            });

            canvas.current
              .getContext("2d")
              .clearRect(0, 0, canvas.current.width, canvas.current.height);

            this.draw();
          }
          return this.props.getSelectionValue(e.type, rect);
        }
        if (drag) {
          let moveX = rect.mouseStartX - (srcEvent.pageX - offsetLeft);
          let moveY = rect.mouseStartY - (srcEvent.pageY - offsetTop);
          console.log(moveX, moveY, srcEvent);
          this.setState({
            rect: {
              ...rect,
              startX: rect.mouseStartX - moveX,
              startY: rect.mouseStartY - moveY,
              width: moveX * 2,
              height: moveY * 2
            }
          });
          canvas.current
            .getContext("2d")
            .clearRect(0, 0, canvas.current.width, canvas.current.height);

          this.draw();
        }
      }
    );
  }

  draw = () => {
    const { drag, rect, canvas } = this.state;
    let ctx = canvas.current.getContext("2d");
    //ctx.setLineDash([2]);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle = "#FF0000";

    //scale rect when drawing
    const x =
      rect.startX > rect.mouseStartX ? rect.startX - 320 : rect.startX - 180;
    const y =
      rect.startY > rect.mouseStartY ? rect.startY - 60 : rect.startY - 20;

    ctx.strokeRect(x, y, rect.width, rect.height);

    console.log(x, y);
    // console.log(
    //   "Top-Left = " +
    //     (rect.mouseStartX + rect.startX) +
    //     ":" +
    //     (rect.mouseStartY - rect.startY) +
    //     "\n Width = " +
    //     rect.width +
    //     "px \n Height = " +
    //     rect.height +
    //     "px"
    // );
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
