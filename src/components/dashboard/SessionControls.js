import React, { Component } from "react";
import { connect } from "react-redux";
import { setActiveMode } from "../../actions/sessionActions";
import { systemStatusChange } from "../../actions/systemsCheckActions";

import PauseButton from "../../helpers/pauseButton";
import RecordButton from "../../helpers/recordButton";
import StopButton from "../../helpers/stopButton";
import ConfirmModal from "../../helpers/ConfirmModal";
import openSocket from "socket.io-client";

const basePath = process.env.REACT_APP_API_BASE_PATH;
const socket = openSocket(`${basePath}/session/state`).connect();

class SessionControls extends Component {
  state = {
    showConfirmModal: false
  };

  componentDidMount() {
    const { startupMode } = this.props.session;

    if (startupMode) {
      this.props.showNotification("Not recording", 0, "STARTUP");
    }

    socket.on("json", sessionState => {
      const { active, paused } = sessionState;
      let mode = "";
      //record session
      if (active && !paused) {
        mode = "RECORD_SESSION";
      }
      //pause session
      if (paused && !active) {
        mode = "PAUSE_SESSION";
      }
      //stop session
      if (!active && !paused) {
        mode = "STOP_SESSION";
      }
      console.log({ sessionState, mode });
      this.props.setActiveMode(mode, this.props.showNotification);
    });

    socket.on("connect", () =>
      this.props.systemStatusChange({ sessionControls: true })
    );
    socket.on("disconnect", () =>
      this.props.systemStatusChange({ sessionControls: false })
    );

    if (!socket.connected) {
      this.props.systemStatusChange({ sessionControls: false });
    }
  }

  componentWillUnmount() {
    socket.removeAllListeners("json");
  }

  setMode = mode => {
    const { activeMode } = this.props.session;
    if (activeMode === mode) return;

    if (mode === "PREVIEW" || mode === "STOP_SESSION") {
      if (mode === "STOP_SESSION") {
        socket.emit("json", { active: false, paused: false });
      }
    }

    if (mode === "RECORD_SESSION") {
      socket.emit("json", { active: true, paused: false });
    }

    if (mode === "PAUSE_SESSION") {
      socket.emit("json", { active: false, paused: true });
    }
  };

  showModal = () => {
    this.setState({ showConfirmModal: !this.state.showConfirmModal });

    if (!this.state.showConfirmModal) {
      this.props.showNotification(
        "Stop recording session ?",
        0,
        "STOP_SESSION"
      );
    }
  };

  render() {
    const {
      activeMode,
      previewMode,
      recordingMode,
      sessionPause,
      startupMode
    } = this.props.session;

    const { showConfirmModal } = this.state;

    const {
      trainingSet: { recordingSession }
    } = this.props;
    console.log(recordingSession);
    return (
      <>
        <RecordButton
          active={recordingMode}
          handler={() =>
            (!recordingMode || sessionPause) && this.setMode("RECORD_SESSION")
          }
        />

        <PauseButton
          active={previewMode || sessionPause}
          handler={() =>
            !previewMode && !sessionPause && this.setMode("PAUSE_SESSION")
          }
        />
        {sessionPause && <StopButton handler={this.showModal} />}

        <ConfirmModal open={showConfirmModal} onClose={this.showModal}>
          <div className="modal-header">
            <h2>Stop Session</h2>
          </div>
          <div className="modal-content">
            <p>Are you sure you want to stop the current session ?</p>
          </div>
          <div className="modal-actions">
            <button className="link-btn" onClick={this.showModal}>
              Disagree
            </button>
            <button
              className="link-btn"
              onClick={() => {
                this.showModal();
                this.setMode("STOP_SESSION");
              }}
              color="primary"
            >
              Agree
            </button>
          </div>
        </ConfirmModal>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    session: state.session,
    trainingSet: state.trainingSet
  };
};
export default connect(mapStateToProps, { setActiveMode, systemStatusChange })(
  SessionControls
);
