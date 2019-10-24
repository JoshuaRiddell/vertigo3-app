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
      <div class="popup-layer">
        <div class="dr-popup-wrapper">
          {/* <span
            class="dr-close-btn"
            onClick={() => this.setState({ hidePopup: true })}
          >
            <img src="images/close-icon.svg" class="close-icon" />
          </span> */}
          <span class="dr-popup-label">Training set:</span>
          <div class="dr-popup-inner-wrap">
            <div class="popup-item" onClick={this.handlePopup}>
              <div class="popup-img-wrapper">
                <img src="images/Picture3.png" class="popup-img" />
              </div>
              <span class="popup-label bg-red-l">
                <span class="popup-text">Halophila ovalis</span>
              </span>
            </div>
            <div class="popup-item" onClick={this.handlePopup}>
              <div class="popup-img-wrapper">
                <img src="images/Picture4.png" class="popup-img" />
              </div>
              <span class="popup-label bg-green">
                <span class="popup-text">Cymodocea serrulata</span>
              </span>
            </div>
            <div class="popup-item" onClick={this.handlePopup}>
              <div class="popup-img-wrapper">
                <img src="images/Picture5.png" class="popup-img" />
              </div>
              <span class="popup-label bg-yellow">
                <span class="popup-text">Zostera muelleri</span>
              </span>
            </div>
            <div class="popup-item" onClick={this.handlePopup}>
              <div class="popup-img-wrapper">
                <img src="images/Picture6.png" class="popup-img" />
              </div>
              <span class="popup-label bg-blue-d">
                <span class="popup-text">Halodule uninervis</span>
              </span>
            </div>
            <div class="popup-item" onClick={this.handlePopup}>
              <div class="popup-img-wrapper">
                <img src="images/Picture7.png" class="popup-img" />
              </div>
              <span class="popup-label bg-orange">
                <span class="popup-text">Halophila spinulosa</span>
              </span>
            </div>
            <div class="popup-item" onClick={this.handlePopup}>
              <div class="popup-img-wrapper">
                <img src="images/Picture8.png" class="popup-img" />
              </div>
              <span class="popup-label bg-violet">
                <span class="popup-text">Syringodium isoetifolium</span>
              </span>
            </div>
            <div class="popup-item" onClick={this.handlePopup}>
              <div class="popup-img-wrapper">
                <img src="images/Picture9.png" class="popup-img" />
              </div>
              <span class="popup-label bg-blue-l">
                <span class="popup-text">Halophila decipiens</span>
              </span>
            </div>
            <div class="popup-item">
              <div class="popup-img-wrapper"></div>
              <span class="popup-label"></span>
            </div>
            <div class="popup-item">
              <div class="popup-img-wrapper"></div>
              <span class="popup-label"></span>
            </div>
            <div class="popup-item" onClick={this.handlePopup}>
              <div class="popup-img-wrapper">
                <img src="images/Picture17.png" class="popup-img" />
              </div>
              <span class="popup-label bg-pink">
                <span class="popup-text">Pentaceraster mammillatus</span>
              </span>
            </div>
            <div class="popup-item">
              <div class="popup-img-wrapper"></div>
              <span class="popup-label"></span>
            </div>
            <div class="popup-item" onClick={this.handlePopup}>
              <div class="popup-img-wrapper">
                {/* <img src="images/question.png" class="popup-img" /> */}
                <h1>?</h1>
              </div>
              <span class="popup-label bg-red-d">
                <span class="popup-text">Unknown or Other</span>
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
