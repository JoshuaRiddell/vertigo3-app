import React from "react";
import boatIcon from "../../assets/sonar-boat-2.png";
import gliderIcon from "../../assets/glider-icon.svg";
export default class SonarChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // These are our 3 BÃ©zier points, stored in state.
      boatToGliderPosition: {
        startPoint: { x: 38, y: 14 },
        controlPoint: { x: 160, y: 7 },
        endPoint: { x: 196, y: 89.5 }
      },
      // We keep track of which point is currently being
      // dragged. By default, no point is.
      draggingPointKeys: null,

      vSliderPosition: {
        // startPoint: { x: 1, y: 22.3 },
        // endPoint: { x: 1, y: 82.7 }
        startPoint: { x: 245, y: 0 },
        endPoint: { x: 245, y: 33.46 }
      },

      hSliderPosition: {
        startPoint: { x: 120, y: 179.5 },
        endPoint: { x: 120, y: 179.5 }
      }
    };
  }

  componentDidMount() {
    const { activeMode } = this.props;
    this.updateCoordinatesByMode(activeMode);
  }
  componentDidUpdate(prevProps, prevState) {
    const { activeMode } = this.props;

    if (activeMode !== prevProps.activeMode) {
      this.updateCoordinatesByMode(activeMode);
    }
  }

  updateCoordinatesByMode = activeMode => {
    if (activeMode === "surFace") {
      this.setState({
        vSliderPosition: {
          startPoint: { x: 245, y: 0 },
          endPoint: { x: 245, y: 33.46 }
        }
      });
    }
    if (activeMode === "seaBed") {
      this.setState({
        vSliderPosition: {
          startPoint: { x: 245, y: 46.5 },
          endPoint: { x: 245, y: 90.7 }
        }
      });
    }

    if (activeMode === "manual") {
      this.setState({
        vSliderPosition: {
          startPoint: { x: 245, y: 60 },
          endPoint: { x: 245, y: 82.7 }
        }
      });
    }
  };
  handleMouseDown(keys) {
    this.setState({ draggingPointKeys: keys });
  }

  handleMouseUp() {
    this.setState({ draggingPointKeys: null });
    // document.documentElement.style.overflow = "auto";
  }

  handleMouseMove(e, type) {
    e.stopPropagation();
    let clientX = 0;
    let clientY = 0;

    if (type === "mouseMove") {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (type === "touchMove") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    const { viewBoxWidth, viewBoxHeight, activeMode } = this.props;

    const { draggingPointKeys } = this.state;

    if (!draggingPointKeys) {
      return;
    }
    document.documentElement.style.overflow = "hidden";

    const svgRect = this.node.getBoundingClientRect();

    const svgX = clientX - svgRect.left;
    const svgY = clientY - svgRect.top;
    const viewBoxX = (svgX * viewBoxWidth) / svgRect.width;

    const viewBoxY = (svgY * viewBoxHeight) / svgRect.height;

    const [parentKey, childKey] = draggingPointKeys.split(".");

    if (parentKey === "boatToGliderPosition") {
      this.setState({
        [parentKey]: {
          ...this.state[parentKey],
          [childKey]: { x: viewBoxX, y: viewBoxY }
        }
      });
    }
    if (parentKey === "vSliderPosition") {
      if (activeMode === "seaBed") {
        if (viewBoxY > 2.1 && viewBoxY < 92.7) {
          this.setState({
            [parentKey]: {
              ...this.state[parentKey],
              [childKey]: {
                ...this.state[parentKey][childKey],
                y: viewBoxY
              }
            }
          });
        }
      }
      if (activeMode === "surFace") {
        if (viewBoxY > 2.1 && viewBoxY < 160) {
          this.setState({
            [parentKey]: {
              ...this.state[parentKey],
              [childKey]: {
                ...this.state[parentKey][childKey],
                y: viewBoxY
              }
            }
          });
        }
      }
    }

    if (parentKey === "hSliderPosition") {
      if (viewBoxX > 0 && viewBoxX < 240) {
        this.setState({
          [parentKey]: {
            ...this.state[parentKey],
            [childKey]: {
              ...this.state[parentKey][childKey],
              x: viewBoxX
            }
          }
        });
      }
    }
    return false;
  }

  render() {
    const { viewBoxWidth, viewBoxHeight, activeMode } = this.props;
    const {
      boatToGliderPosition,
      vSliderPosition,
      hSliderPosition,
      draggingPointKeys
    } = this.state;

    const instructions = `
      M ${boatToGliderPosition.startPoint.x},${boatToGliderPosition.startPoint.y}
      Q ${boatToGliderPosition.controlPoint.x},${boatToGliderPosition.controlPoint.y}
        ${boatToGliderPosition.endPoint.x},${boatToGliderPosition.endPoint.y}
    `;
    //[{starting-point:34,end-point:56,76},{starting-point:34,end-point:56,76}
    //]
    return (
      <svg
        ref={node => (this.node = node)}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        onMouseMove={ev =>
          draggingPointKeys && this.handleMouseMove(ev, "mouseMove")
        }
        onTouchMove={ev =>
          draggingPointKeys && this.handleMouseMove(ev, "touchMove")
        }
        onMouseUp={() => draggingPointKeys && this.handleMouseUp()}
        onTouchEnd={() => draggingPointKeys && this.handleMouseUp()}
        onMouseLeave={() => draggingPointKeys && this.handleMouseUp()}
        onTouchCancel={() => draggingPointKeys && this.handleMouseUp()}
        style={{ overflow: "visible" }}
      >
        <rect
          width={viewBoxWidth}
          height="20"
          fill="rgb(33, 185, 245)"
          className="sky"
        />

        <g className="boat-glider-bezier">
          {/* <ConnectingLine from={startPoint} to={controlPoint} />
          <ConnectingLine from={controlPoint} to={endPoint} /> */}

          <Path instructions={instructions} />

          <BoatHandle
            coordinates={boatToGliderPosition.startPoint}
            // onMouseDown={() =>
            //   this.handleMouseDown("boatToGliderPosition.startPoint")
            // }
          />

          {/* <SmallHandle
            coordinates={boatToGliderPosition.controlPoint}
            onMouseDown={() =>
              this.handleMouseDown("boatToGliderPosition.controlPoint")
            }
          /> */}

          <GliderHandle
            coordinates={boatToGliderPosition.endPoint}
            // onMouseDown={() =>
            //   this.handleMouseDown("boatToGliderPosition.endPoint")
            // }
          />
        </g>

        {activeMode !== "manual" && (
          <g className="verticle-slider">
            {/* <CircleHandle coordinates={vSliderPosition.startPoint} /> */}
            {activeMode === "seaBed" ? (
              <VerticleToolTip
                coordinates={vSliderPosition.startPoint}
                mode={activeMode}
                onMouseDown={() =>
                  this.handleMouseDown("vSliderPosition.startPoint")
                }
              />
            ) : (
              <CircleHandle coordinates={vSliderPosition.startPoint} />
            )}
            <ConnectingLine
              from={vSliderPosition.startPoint}
              to={vSliderPosition.endPoint}
            />

            {activeMode === "surFace" ? (
              <VerticleToolTip
                mode={activeMode}
                coordinates={vSliderPosition.endPoint}
                onMouseDown={() =>
                  this.handleMouseDown("vSliderPosition.endPoint")
                }
              />
            ) : (
              <CircleHandle coordinates={vSliderPosition.endPoint} />
            )}
            <g className="horizontal-slider">
              {/* <CircleHandle coordinates={vSliderPosition.startPoint} /> */}
              <HorizontalToolTip
                coordinates={hSliderPosition.startPoint}
                mode={"manual"}
                onMouseDown={() =>
                  activeMode !== "manual" &&
                  this.handleMouseDown("hSliderPosition.startPoint")
                }
              />
            </g>
          </g>
        )}
        {activeMode === "manual" && (
          <>
            <CircleHandle coordinates={vSliderPosition.startPoint} />
            <rect
              x="1.35"
              y="1.35"
              width="8"
              height="8"
              transform="translate(117 202) rotate(-45)"
              stroke="rgb(244, 0, 0)"
              fill="rgb(0, 0, 0, 0)"
            />
            <rect
              x="1.04"
              y="1.04"
              width="6.01"
              height="6.01"
              fill="red"
              transform={`translate(${hSliderPosition.startPoint.x} 202) rotate(-45)`}
            />
          </>
        )}
      </svg>
    );
  }
}

const ConnectingLine = ({ from, to }) => (
  <line
    x1={from.x}
    y1={from.y + 20}
    x2={to.x}
    y2={to.y + 20}
    stroke="rgb(255, 0, 0)"
    // strokeDasharray="5,5"
    strokeWidth={2}
  />
);

const Path = ({ instructions }) => (
  <path d={instructions} fill="none" stroke="rgb(255, 0, 0)" strokeWidth={2} />
);

const BoatHandle = ({ coordinates, onMouseDown }) => (
  <image
    xlinkHref={boatIcon}
    height="60"
    width="60"
    x={-8}
    y={-17}
    // onMouseDown={onMouseDown}
    // onTouchStart={onMouseDown}
    // style={{ cursor: "-webkit-grab" }}
  />
);

const GliderHandle = ({ coordinates, onMouseDown }) => (
  <image
    xlinkHref={gliderIcon}
    height="35"
    width="35"
    x={coordinates.x - 6}
    y={coordinates.y - 21.5}
    onMouseDown={onMouseDown}
    onTouchStart={onMouseDown}
    style={{ cursor: "-webkit-grab" }}
  />
);

const SmallHandle = ({ coordinates, onMouseDown }) => (
  <ellipse
    cx={coordinates.x}
    cy={coordinates.y}
    rx={3}
    ry={3}
    fill="rgb(255, 255, 255, 0.60)"
    stroke="rgb(244, 0, 137, 0.60)"
    strokeWidth={2}
    onMouseDown={onMouseDown}
    onTouchStart={onMouseDown}
    style={{ cursor: "-webkit-grab" }}
  />
);

const CircleHandle = ({ coordinates }) => (
  <ellipse
    transform="translate(0 25.25)"
    cx={coordinates.x}
    cy={coordinates.y - 5}
    rx={5}
    ry={5}
    fill="rgb(244, 0, 0)"
  />
);

const VerticleToolTip = ({ coordinates, onMouseDown, mode }) => {
  let x = coordinates.x;
  let y = coordinates.y;
  return (
    // <polygon
    //   className="sonar-tooltip"
    //   onMouseDown={onMouseDown}
    //   style={{ cursor: "-webkit-grab" }}
    //   fill="rgb(244, 0, 0)"
    //   transform={`translate(${x} ${y})`}
    //   points="3.85 0 3.85 13 13.64 13 0 19.86 25.58 13 44.85 13 44.85 0 3.85 0"
    // />
    <>
      <g
        style={{ cursor: "-webkit-grab" }}
        transform={`translate(${194} ${y - 3})`}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
      >
        <path
          fill="rgb(244, 0, 0)"
          d="M46.93,0V14.91H35.72l10.73,5.41a4.64,4.64,0,1,1-.07,1.14L22.06,14.91H0V0Z"
        />

        <text
          transform="translate(10 10.25)"
          style={{
            pointerEvents: "none",
            userSelect: "none",
            fontSize: "10px",
            fontWeight: "600",
            userSelect: "none"
          }}
        >
          {`${((Math.round(y * 100) * 0.1884) / 100).toFixed(1)} m`}
        </text>
      </g>
    </>
  );
};

const HorizontalToolTip = ({ coordinates, onMouseDown, mode }) => {
  let x = coordinates.x;
  let y = coordinates.y;

  let displacement = 0;
  let labelText = ``;

  let leftOrientation =
    "6.04 0 6.04 15 15.82 15 7.42 19.73 5.35 20.78 3.54 18.96 0 22.5 3.54 26.04 7.07 22.5 5.38 20.81 7.51 20.24 27.77 15 48.04 15 48.04 0 6.04 0";
  let rightOrientation =
    "41.93 0 41.93 15 32.17 15 40.55 19.73 42.62 20.78 44.43 18.96 47.96 22.5 44.43 26.04 40.9 22.5 42.59 20.81 40.46 20.24 20.24 15 0 15 0 0 41.93 0";

  let orientation = {
    current: "left",
    points: leftOrientation
  };

  const centerPoint = 120;
  const totalWidth = 240;

  displacement = (Math.round(x - centerPoint) * totalWidth * 0.0347) / 100;

  if (displacement > 0) {
    labelText = `R ${displacement.toFixed(1)} m`;
    orientation = {
      current: "right",
      points: rightOrientation
    };
  }
  if (displacement < 0) {
    labelText = `L ${Math.abs(displacement).toFixed(1)} m`;

    orientation = {
      current: "left",
      points: leftOrientation
    };
  }
  if (displacement === 0) {
    labelText = `${displacement.toFixed(1)} m`;

    orientation = {
      current: "left",
      points: leftOrientation
    };
  }
  return (
    <>
      <g
        style={{ cursor: "-webkit-grab" }}
        transform={`translate(${
          orientation.current === "right" ? x - 41 : x
        } ${y})`}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
      >
        <polygon fill="rgb(244, 0, 0)" points={orientation.points} />

        <text
          transform={`translate(${
            orientation.current === "right" ? 2 : 10
          } 10.25)`}
          style={{
            pointerEvents: "none",
            userSelect: "none",
            fontSize: "10px",
            fontWeight: "600",
            userSelect: "none"
          }}
        >
          {labelText}
        </text>
      </g>

      <rect
        x="1.35"
        y="1.35"
        width="8"
        height="8"
        transform="translate(116.5 202) rotate(-45)"
        stroke="rgb(244, 0, 0)"
        fill="rgb(0, 0, 0, 0)"
      />
    </>
  );
};
