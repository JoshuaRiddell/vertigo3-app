import React from "react";
import { connect } from "react-redux";
import { setSonarStateSnapshot } from "../../actions/sonarActions";
import { systemStatusChange } from "../../actions/systemsCheckActions";

import HorizontalToolTip from "../../helpers/HorizontalToolTip";
import VerticleToolTip from "../../helpers/VerticleToolTip";
import CircleHandle from "../../helpers/CircleHandle";
import SmallHandle from "../../helpers/SmallHandle";
import GliderHandle from "../../helpers/GliderHandle";
import BoatHandle from "../../helpers/BoatHandle";
import Path from "../../helpers/Path";
import ConnectingLine from "../../helpers/ConnectingLine";

import openSocket from "socket.io-client";

const basePath = process.env.REACT_APP_API_BASE_PATH;
const socket = openSocket(`${basePath}/control/parameters`).connect();

class SonarChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // These are our 3 BÃ©zier points, stored in state.
      boatToGliderPosition: {
        startPoint: { x: 98, y: 20 },
        controlPoint: { x: 350, y: 30 },
        endPoint: { x: 400, y: 186.5 }
      },
      // We keep track of which point is currently being
      // dragged. By default, no point is.
      draggingPointKeys: null,

      vSliderPosition: {
        startPoint: { x: 526, y: 15 },
        endPoint: { x: 526, y: 133.46, labelVal: 10.4 }
      },

      hSliderPosition: {
        startPoint: { x: 262, y: 390 },
        endPoint: { x: 262, y: 390 }
      }
    };
  }

  componentDidMount() {
    const {
      controlModes: { activeMode }
    } = this.props;
    this.updateCoordinatesByMode(activeMode);

    //socket.on("json", positionState => {
    // const { mode } = controlModeState;
    // let changedMode = "";

    // if (mode === "surface") {
    //   changedMode = "surFace";
    // }

    // if (mode === "seabed") {
    //   changedMode = "seaBed";
    // }

    // if (mode === "manual") {
    //   changedMode = "manual";
    // }
    //console.log(positionState);
    // this.props.changeControlMode(changedMode);
    //});
    socket.on("connect", () =>
      this.props.systemStatusChange({ sonarControls: true })
    );
    socket.on("disconnect", () =>
      this.props.systemStatusChange({ sonarControls: false })
    );

    if (!socket.connected) {
      this.props.systemStatusChange({ sonarControls: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      controlModes: { activeMode },
      sonarState
    } = this.props;

    if (activeMode !== prevProps.controlModes.activeMode) {
      this.updateCoordinatesByMode(activeMode);
    }

    if (prevProps.sonarState !== sonarState) {
      if (sonarState && Object.keys(sonarState).length) {
        this.setState({ ...sonarState });
      }
    }
  }

  componentWillUnmount() {
    this.props.setSonarStateSnapshot(this.state);
    socket.removeAllListeners();
  }

  updateCoordinatesByMode = activeMode => {
    if (activeMode === "surFace") {
      this.setState({
        vSliderPosition: {
          startPoint: { x: 526, y: 15 },
          endPoint: { x: 526, y: 133.46, labelVal: 10.4 }
        }
      });
    }

    if (activeMode === "seaBed") {
      this.setState({
        vSliderPosition: {
          startPoint: { x: 526, y: 46.5, labelVal: 16.1 },
          endPoint: { x: 526, y: 234.5 }
        }
      });
    }

    if (activeMode === "manual") {
      this.setState({
        vSliderPosition: {
          startPoint: { x: 526, y: 170.5 },
          endPoint: { x: 245, y: 82.7 }
        }
      });
    }
  };
  handleMouseDown(e, keys) {
    this.setState({ draggingPointKeys: keys });
  }

  handleMouseUp() {
    this.setState({ draggingPointKeys: null });
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

    const {
      viewBoxWidth,
      viewBoxHeight,
      controlModes: { activeMode }
    } = this.props;

    const { draggingPointKeys } = this.state;
    if (!draggingPointKeys) {
      return;
    }

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
        if (viewBoxY > 13.5 && viewBoxY < 234.5) {
          const labelVal = (
            Math.abs(Math.round((viewBoxY - 240.5) * 100) * 0.083) / 100
          ).toFixed(1);

          socket.emit("json", [
            { name: "seabed_height", value: labelVal, unit: "m" }
          ]);

          this.setState({
            [parentKey]: {
              ...this.state[parentKey],
              [childKey]: {
                ...this.state[parentKey][childKey],
                y: viewBoxY,
                labelVal
              }
            }
          });
        }
      }

      if (activeMode === "surFace") {
        if (viewBoxY > 13.5 && viewBoxY < 363) {
          const labelVal = (
            (Math.round((viewBoxY - 7.3) * 100) * 0.083) /
            100
          ).toFixed(1);

          socket.emit("json", [
            { name: "surface_depth", value: labelVal, unit: "m" }
          ]);

          this.setState({
            [parentKey]: {
              ...this.state[parentKey],
              [childKey]: {
                ...this.state[parentKey][childKey],
                y: viewBoxY,
                labelVal
              }
            }
          });
        }
      }
    }

    if (parentKey === "hSliderPosition") {
      if (viewBoxX > 0 && viewBoxX < 525) {
        const centerPoint = 525 / 2;

        let displacement =
          (Math.round(viewBoxX - centerPoint) * viewBoxWidth * 0.0071) / 100;

        socket.emit("json", [
          { name: "track", value: displacement.toFixed(1), unit: "m" }
        ]);

        this.setState({
          [parentKey]: {
            ...this.state[parentKey],
            [childKey]: {
              ...this.state[parentKey][childKey],
              x: viewBoxX,
              labelVal: displacement
            }
          }
        });
      }
    }
    return false;
  }

  render() {
    const {
      viewBoxWidth,
      viewBoxHeight,
      controlModes: { activeMode }
    } = this.props;
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
          height="40"
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
            {activeMode === "seaBed" ? (
              <VerticleToolTip
                coordinates={vSliderPosition.startPoint}
                mode={activeMode}
                onMouseDown={e =>
                  this.handleMouseDown(e, "vSliderPosition.startPoint")
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
                onMouseDown={e =>
                  this.handleMouseDown(e, "vSliderPosition.endPoint")
                }
              />
            ) : (
              <CircleHandle coordinates={vSliderPosition.endPoint} />
            )}
            <g className="horizontal-slider">
              <HorizontalToolTip
                coordinates={hSliderPosition.startPoint}
                mode={"manual"}
                onMouseDown={e =>
                  activeMode !== "manual" &&
                  this.handleMouseDown(e, "hSliderPosition.startPoint")
                }
              />
            </g>
          </g>
        )}
        {activeMode === "manual" && (
          <>
            <CircleHandle coordinates={vSliderPosition.startPoint} />
            <rect
              width="10"
              height="10"
              fill="red"
              transform={`translate(${hSliderPosition.startPoint.x} 435) rotate(-45)`}
            />
          </>
        )}
        <rect
          width="15"
          height="15"
          transform="translate(259 435) rotate(-45)"
          strokeWidth="2px"
          stroke="rgb(244, 0, 0)"
          fill="rgb(0, 0, 0, 0)"
        />
      </svg>
    );
  }
}

const mapStateToProps = state => {
  return {
    sonarState: state.sonarState,
    controlModes: state.controlModes
  };
};
export default connect(mapStateToProps, {
  setSonarStateSnapshot,
  systemStatusChange
})(SonarChart);
