import React, { PureComponent } from "react";
//Sonar componenet
export default class VerticleToolTip extends PureComponent {
  render() {
    const { coordinates, onMouseDown, mode } = this.props;
    let x = coordinates.x;
    let y = coordinates.y;
    let labelVal = coordinates.labelVal;
    return (
      <>
        <g
          style={{ cursor: "-webkit-grab" }}
          transform={`translate(${x - 102} ${y - 15})`}
          onMouseDown={onMouseDown}
          onTouchStart={onMouseDown}
        >
          <path
            fill="rgb(244, 0, 0)"
            d="M46.93,0V14.91H35.72l10.73,5.41a4.64,4.64,0,1,1-.07,1.14L22.06,14.91H0V0Z"
            style={{ transform: "scale(2)" }}
          />

          <text
            transform="translate(12 20.25)"
            style={{
              pointerEvents: "none",
              userSelect: "none",
              fontSize: "22px",
              fontWeight: "600",
              userSelect: "none"
            }}
          >
            {`${
              labelVal
                ? labelVal
                : ((Math.round(y * 100) * 0.1884) / 100).toFixed(1)
            } m`}
          </text>
        </g>
      </>
    );
  }
}
