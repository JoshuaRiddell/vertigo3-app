import React, { Component } from "react";
import { connect } from "react-redux";
import { changeControlMode } from "../../actions/controlModeActions";
import { systemStatusChange } from "../../actions/systemsCheckActions";

import openSocket from "socket.io-client";

const basePath = process.env.REACT_APP_API_BASE_PATH;
const socket = openSocket(`${basePath}/control/mode`).connect();

class ControlModes extends Component {
  componentDidMount() {
    socket.on("json", (controlModeState) => {
      const { mode } = controlModeState;
      let changedMode = "";

      if (mode === "surface") {
        changedMode = "surFace";
      }

      if (mode === "seabed") {
        changedMode = "seaBed";
      }

      if (mode === "manual") {
        changedMode = "manual";
      }

      if (mode === "stable") {
        changedMode = "stable";
      }
      console.log(controlModeState);
      this.props.changeControlMode(changedMode);
    });

    socket.on("connect", () =>
      this.props.systemStatusChange({ controlMode: true })
    );
    socket.on("disconnect", () =>
      this.props.systemStatusChange({ controlMode: false })
    );

    if (!socket.connected) {
      this.props.systemStatusChange({ controlMode: false });
    }
  }

  componentWillUnmount() {
    socket.removeAllListeners();
  }

  changeControlMode = (mode) => {
    const {
      controlModes: { activeMode }
    } = this.props;

    if (activeMode === mode) return;

    if (mode === "surFace") {
      socket.emit("json", { mode: "surface" });
    }

    if (mode === "seaBed") {
      socket.emit("json", { mode: "seabed" });
    }

    if (mode === "manual") {
      socket.emit("json", { mode: "manual" });
    }

    if (mode === "stable") {
      socket.emit("json", { mode: "stable" });
    }
  };

  render() {
    const {
      controlModes: { activeMode }
    } = this.props;
    return (
      <div className="nav-wrapper">
        <div
          className={`dr-btn btn-half btn-l ${
            activeMode === "surFace" ? "nav-btn-bg-1" : "bg-olive-dark"
          }`}
          onClick={() => this.changeControlMode("surFace")}
        >
          Surface
        </div>
        <div
          className={`dr-btn btn-half btn-r ${
            activeMode === "seaBed" ? "nav-btn-bg-1" : "bg-olive-dark"
          }`}
          onClick={() => this.changeControlMode("seaBed")}
        >
          Seabed
        </div>
        <div
          className={`dr-btn btn-half btn-r controller-btn ${
            activeMode === "manual" ? "nav-btn-bg-1" : "nav-btn-bg-2"
          }`}
          onClick={() => this.changeControlMode("manual")}
        >
          Manual
          <span>
            <img src="images/remote.png" className="remote-icon" />
          </span>
        </div>
        <div
          className={`dr-btn btn-half btn-r controller-btn ${
            activeMode === "stable" ? "nav-btn-bg-1" : "nav-btn-bg-2"
          }`}
          onClick={() => this.changeControlMode("stable")}
        >
          Stable
          <span>
            <img src="images/remote.png" className="remote-icon" />
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    controlModes: state.controlModes
  };
};
export default connect(mapStateToProps, {
  changeControlMode,
  systemStatusChange
})(ControlModes);
