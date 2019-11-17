import React, { Component } from "react";
import { connect } from "react-redux";
import { changeControlMode } from "../../actions/controlModeActions";

import openSocket from "socket.io-client";

const basePath = process.env.REACT_APP_API_BASE_PATH;
const socket = openSocket(`${basePath}/control/mode`);

class ControlModes extends Component {
  componentDidMount() {
    socket.connect();

    socket.on("json", controlModeState => {
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
      console.log(controlModeState);
      this.props.changeControlMode(changedMode);
    });
  }

  componentWillUnmount() {
    socket.off("json");
    socket.disconnect();
  }

  changeControlMode = mode => {
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
          className={`dr-btn btn-full ${
            activeMode === "manual" ? "nav-btn-bg-1" : "nav-btn-bg-2"
          }`}
          onClick={() => this.changeControlMode("manual")}
        >
          manual
          <span>
            <img src="images/remote.png" className="remote-icon" />
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    controlModes: state.controlModes
  };
};
export default connect(mapStateToProps, { changeControlMode })(ControlModes);
