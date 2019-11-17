import React, { Component } from "react";
import { connect } from "react-redux";
import { setActiveMode } from "../../actions/sessionActions";
import PauseButton from "../../helpers/pauseButton";
import RecordButton from "../../helpers/recordButton";
import StopButton from "../../helpers/stopButton";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import openSocket from "socket.io-client";

const basePath = process.env.REACT_APP_API_BASE_PATH;
const socket = openSocket(`${basePath}/session/state`);

class SessionControls extends Component {
  state = {
    showConfirmModal: false
  };

  componentDidMount() {
    socket.connect();

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
  }

  componentWillUnmount() {
    socket.off("json");
    socket.disconnect();
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

        <Dialog
          open={showConfirmModal}
          onClose={this.showModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="record-modal"
        >
          <DialogTitle id="alert-dialog-title" className="record-modal title">
            {"Stop Session"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              className="record-modal content"
            >
              Are you sure you want to stop the current session ?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="record-modal actions">
            <Button onClick={this.showModal} color="primary">
              Disagree
            </Button>
            <Button
              onClick={() => {
                this.showModal();
                this.setMode("STOP_SESSION");
              }}
              color="primary"
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    session: state.session
  };
};
export default connect(mapStateToProps, { setActiveMode })(SessionControls);
