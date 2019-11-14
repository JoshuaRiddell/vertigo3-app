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
    const { trainingSet } = this.props;
    const { dataSet } = trainingSet;
    return (
      <div className="popup-layer">
        <div className="dr-popup-wrapper">
          <span className="dr-popup-label">Training set:</span>
          <div className="dr-popup-inner-wrap">
            {dataSet.map((item, index) => (
              <div
                key={index}
                className="popup-item"
                onClick={this.handlePopup}
              >
                <div className="popup-img-wrapper">
                  {item.img && <img src={item.img} className="popup-img" />}
                </div>
                <span
                  className={`popup-label ${
                    item.labelColorClass ? item.labelColorClass : ""
                  }`}
                >
                  {item.title && (
                    <span className="popup-text">{item.title}</span>
                  )}
                </span>
              </div>
            ))}
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
export default connect(mapStateToProps, { toggleTrainigSetModal })(
  TraningSetModal
);
