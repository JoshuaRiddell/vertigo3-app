import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { systemsCheckModal } from "../../actions/systemsCheckActions";

class SystemsCheck extends PureComponent {
  componentDidMount() {
    const {
      systemStatus: {
        showModal,
        controlMode,
        gliderStats,
        sessionControls,
        sonarControls
      }
    } = this.props;

    if (controlMode && gliderStats && sessionControls && sonarControls) {
      this.props.systemsCheckModal(false);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      systemStatus: {
        showModal,
        controlMode,
        gliderStats,
        sessionControls,
        sonarControls
      }
    } = this.props;
    const prevCheck =
      prevProps.systemStatus.controlMode &&
      prevProps.systemStatus.gliderStats &&
      prevProps.systemStatus.sessionControls &&
      prevProps.systemStatus.sonarControls;
    const currentCheck =
      controlMode && gliderStats && sessionControls && sonarControls;

    if (prevCheck !== currentCheck && currentCheck) {
      setTimeout(() => this.props.systemsCheckModal(false), 600);
    }
    if (prevCheck !== currentCheck && !currentCheck) {
      this.props.systemsCheckModal(true);
    }
  }
  render() {
    const {
      systemStatus: {
        showModal,
        controlMode,
        gliderStats,
        sessionControls,
        sonarControls
      }
    } = this.props;

    const nucLink =
      controlMode && gliderStats && sessionControls && sonarControls;
    return showModal ? (
      <>
        <div className="modal-overlay"></div>
        <div className="modal-container systems-check">
          <div style={{ textAlign: "end" }}>
            <span
              className="dr-close-btn"
              onClick={() => this.props.systemsCheckModal(false)}
            >
              <img src="images/close-icon.svg" className="close-icon" />
            </span>
          </div>
          <div className="modal-header" style={{ justifyContent: "start" }}>
            <h2 style={{ marginRight: "20px" }}>Systems Check</h2>
            <SyncLoader loading={true} color={`#4caf50`} />
          </div>
          <ul className="systems-check-list">
            <li className={nucLink ? "check" : "cross"}>
              NUC link established
            </li>
            <li className="check">Vertigo3 powered up</li>
            <li className="check">Storage capacity 68%</li>
          </ul>
        </div>
      </>
    ) : (
      <></>
    );
  }
}

const mapStateToProps = state => {
  return {
    systemStatus: state.systemStatus
  };
};
export default connect(mapStateToProps, { systemsCheckModal })(SystemsCheck);
