import React from "react";
import boatIcon from "../../assets/sonar-boat.png";
import gliderIcon from "../../assets/sonar-glider.png";
export default class SonarChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // These are our 3 BÃ©zier points, stored in state.
      boatToGliderPosition: {
        startPoint: { x: 16.4257555847569, y: 10.512483574244415 },
        controlPoint: { x: 175, y: 7 },
        endPoint: { x: 231, y: 89.5 }
      },
      // We keep track of which point is currently being
      // dragged. By default, no point is.
      draggingPointKeys: null,

      vSliderPosition: {
        startPoint: { x: 1, y: 22.3 },
        endPoint: { x: 1, y: 82.7 }
      },

      hSliderPosition: {
        startPoint: { x: 120, y: 160 },
        endPoint: { x: 120, y: 160 }
      }
    };
  }

  handleMouseDown(keys) {
    this.setState({ draggingPointKeys: keys });
  }

  handleMouseUp() {
    this.setState({ draggingPointKeys: null });
    document.documentElement.style.overflow = "auto";
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
    const { viewBoxWidth, viewBoxHeight } = this.props;
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
      if (viewBoxY > 0 && viewBoxY < 150) {
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

    if (parentKey === "hSliderPosition") {
      if (viewBoxX > 0 && viewBoxX < 230) {
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
          height="15"
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

          <SmallHandle
            coordinates={boatToGliderPosition.controlPoint}
            onMouseDown={() =>
              this.handleMouseDown("boatToGliderPosition.controlPoint")
            }
          />

          <GliderHandle
            coordinates={boatToGliderPosition.endPoint}
            onMouseDown={() =>
              this.handleMouseDown("boatToGliderPosition.endPoint")
            }
          />
        </g>

        {activeMode !== "manual" && (
          <g className="verticle-slider">
            {/* <CircleHandle coordinates={vSliderPosition.startPoint} /> */}
            {activeMode === "surFace" ? (
              <ToolTip
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

            {activeMode === "seaBed" ? (
              <ToolTip
                mode={activeMode}
                coordinates={vSliderPosition.endPoint}
                onMouseDown={() =>
                  this.handleMouseDown("vSliderPosition.endPoint")
                }
              />
            ) : (
              <CircleHandle coordinates={vSliderPosition.endPoint} />
            )}
          </g>
        )}

        <g className="horizontal-slider">
          {/* <CircleHandle coordinates={vSliderPosition.startPoint} /> */}
          <ToolTip
            coordinates={hSliderPosition.startPoint}
            mode={"manual"}
            onMouseDown={() =>
              activeMode === "manual" &&
              this.handleMouseDown("hSliderPosition.startPoint")
            }
          />
        </g>
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
    height="15"
    width="15"
    x={coordinates.x - 10}
    y={coordinates.y - 10}
    // onMouseDown={onMouseDown}
    // onTouchStart={onMouseDown}
    // style={{ cursor: "-webkit-grab" }}
  />
);

const GliderHandle = ({ coordinates, onMouseDown }) => (
  <image
    xlinkHref={gliderIcon}
    height="20"
    width="20"
    x={coordinates.x - 10}
    y={coordinates.y - 10}
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
    transform="translate(0 18.25)"
    cx={coordinates.x}
    cy={coordinates.y}
    rx={3}
    ry={3}
    fill="rgb(244, 0, 0)"
  />
);

const ToolTip = ({ coordinates, onMouseDown, mode }) => {
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
        transform={`translate(${mode === "manual" ? x : -2} ${y - 3})`}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
      >
        {mode === "manual" ? (
          <polygon
            fill="rgb(244, 0, 0)"
            points="6.04 0 6.04 13 15.82 13 7.42 17.73 5.35 18.78 3.54 16.96 0 20.5 3.54 24.04 7.07 20.5 5.38 18.81 7.51 18.24 27.77 13 47.04 13 47.04 0 6.04 0"
          />
        ) : (
          <path
            fill="rgb(244, 0, 0)"
            d="M7.5,0V13h9.79L5.89,18.74A3,3,0,1,0,6,19.5a2.3,2.3,0,0,0,0-.26L29.23,13H48.5V0Z"
          />
        )}
        <text
          transform="translate(10 10.25)"
          style={{
            pointerEvents: "none",
            userSelect: "none",
            fontSize: "10px",
            fontWeight: "500"
          }}
        >{`${Math.round(mode === "manual" ? x : y * 100) / 100}m`}</text>
      </g>
      {mode === "manual" && (
        <rect
          x="1.35"
          y="1.35"
          width="6.66"
          height="6.66"
          transform="translate(117 177.5) rotate(-45)"
          stroke="rgb(244, 0, 0)"
          fill="rgb(0, 0, 0, 0)"
        />
      )}
    </>
  );
};
