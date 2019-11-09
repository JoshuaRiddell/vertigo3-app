import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleTrainigSetModal } from "../../actions/trainingSetActions";
import soundDataSuccess from "../../assets/Data_sent.ogg";
class TraningSetModal extends Component {
  handlePopup = () => {
    const { trainingSet } = this.props;
    const { showTrainingSet } = trainingSet;
    //do api stuff
    const audio = new Audio(soundDataSuccess);
    audio.play();

    this.props.toggleTrainigSetModal(false);
  };
  render() {
    return (
      <div className="popup-layer">
        <div className="dr-popup-wrapper">
          {/* <span
            className="dr-close-btn"
            onClick={() => this.setState({ hidePopup: true })}
          >
            <img src="images/close-icon.svg" className="close-icon" />
          </span> */}
          <span className="dr-popup-label">Training set:</span>
          <div className="dr-popup-inner-wrap">
            <div className="popup-item" onClick={this.handlePopup}>
              <div className="popup-img-wrapper">
                <img src="images/Picture3.png" className="popup-img" />
              </div>
              <span className="popup-label bg-red-l">
                <span className="popup-text">Halophila ovalis</span>
              </span>
            </div>
            <div className="popup-item" onClick={this.handlePopup}>
              <div className="popup-img-wrapper">
                <img src="images/Picture4.png" className="popup-img" />
              </div>
              <span className="popup-label bg-green">
                <span className="popup-text">Cymodocea serrulata</span>
              </span>
            </div>
            <div className="popup-item" onClick={this.handlePopup}>
              <div className="popup-img-wrapper">
                <img src="images/Picture5.png" className="popup-img" />
              </div>
              <span className="popup-label bg-yellow">
                <span className="popup-text">Zostera muelleri</span>
              </span>
            </div>
            <div className="popup-item" onClick={this.handlePopup}>
              <div className="popup-img-wrapper">
                <img src="images/Picture6.png" className="popup-img" />
              </div>
              <span className="popup-label bg-blue-d">
                <span className="popup-text">Halodule uninervis</span>
              </span>
            </div>
            <div className="popup-item" onClick={this.handlePopup}>
              <div className="popup-img-wrapper">
                <img src="images/Picture7.png" className="popup-img" />
              </div>
              <span className="popup-label bg-orange">
                <span className="popup-text">Halophila spinulosa</span>
              </span>
            </div>
            <div className="popup-item" onClick={this.handlePopup}>
              <div className="popup-img-wrapper">
                <img src="images/Picture8.png" className="popup-img" />
              </div>
              <span className="popup-label bg-violet">
                <span className="popup-text">Syringodium isoetifolium</span>
              </span>
            </div>
            <div className="popup-item" onClick={this.handlePopup}>
              <div className="popup-img-wrapper">
                <img src="images/Picture9.png" className="popup-img" />
              </div>
              <span className="popup-label bg-blue-l">
                <span className="popup-text">Halophila decipiens</span>
              </span>
            </div>
            <div className="popup-item">
              <div className="popup-img-wrapper"></div>
              <span className="popup-label"></span>
            </div>
            <div className="popup-item">
              <div className="popup-img-wrapper"></div>
              <span className="popup-label"></span>
            </div>
            <div className="popup-item" onClick={this.handlePopup}>
              <div className="popup-img-wrapper">
                <img src="images/Picture17.png" className="popup-img" />
              </div>
              <span className="popup-label bg-pink">
                <span className="popup-text">Pentaceraster mammillatus</span>
              </span>
            </div>
            <div className="popup-item">
              <div className="popup-img-wrapper"></div>
              <span className="popup-label"></span>
            </div>
            <div className="popup-item" onClick={this.handlePopup}>
              <div className="popup-img-wrapper">
                {/* <img src="images/question.png" className="popup-img" /> */}
                <h1>?</h1>
              </div>
              <span className="popup-label bg-red-d">
                <span className="popup-text">Unknown or Other</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    trainingSet: state.trainingSet
  };
};
export default connect(
  mapStateToProps,
  { toggleTrainigSetModal }
)(TraningSetModal);
