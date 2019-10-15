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

class SessionControls extends Component {
  state = {
    showConfirmModal: false
  };
  // componentDidMount() {
  //   console.log(this.props);
  //   this.setMode("PREVIEW");
  // }

  setMode = mode => {
    console.log(mode);
    const { activeMode } = this.props.session;
    if (activeMode === mode) return;

    this.props.setActiveMode(mode, this.props.showNotification);
  };

  showModal = () => {
    this.setState({ showConfirmModal: !this.state.showConfirmModal });
    console.log(!this.state.showConfirmModal);
    if (!this.state.showConfirmModal) {
      this.props.showNotification(
        "Stop Recording Session ?",
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
export default connect(
  mapStateToProps,
  { setActiveMode }
)(SessionControls);
