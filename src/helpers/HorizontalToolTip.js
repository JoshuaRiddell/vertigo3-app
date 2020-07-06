import React, { PureComponent } from "react";
//Sonar componenet
export default class HorizontalToolTip extends PureComponent {
  render() {
    const { coordinates, onMouseDown, mode } = this.props;
    let x = coordinates.x;
    let y = coordinates.y;

    let displacement = coordinates.labelVal || 0;
    let labelText = ``;

    let leftOrientation =
      "6.04 0 6.04 15 15.82 15 7.42 19.73 5.35 20.78 3.54 18.96 0 22.5 3.54 26.04 7.07 22.5 5.38 20.81 7.51 20.24 27.77 15 48.04 15 48.04 0 6.04 0";
    let rightOrientation =
      "41.93 0 41.93 15 32.17 15 40.55 19.73 42.62 20.78 44.43 18.96 47.96 22.5 44.43 26.04 40.9 22.5 42.59 20.81 40.46 20.24 20.24 15 0 15 0 0 41.93 0";

    let orientation = {
      current: "left",
      points: leftOrientation
    };

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
            orientation.current === "right" ? x - 82 : x
          } ${y})`}
          onMouseDown={onMouseDown}
          onTouchStart={onMouseDown}
        >
          <polygon
            fill="rgb(244, 0, 0)"
            points={orientation.points}
            style={{ transform: "scale(2)" }}
          />

          <text
            transform={`translate(${
              orientation.current === "right" ? 2 : 15
            } 20.25)`}
            style={{
              pointerEvents: "none",
              userSelect: "none",
              fontSize: "22px",
              fontWeight: "600",
              userSelect: "none"
            }}
          >
            {labelText}
          </text>
        </g>
      </>
    );
  }
}
