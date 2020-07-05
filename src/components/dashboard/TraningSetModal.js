import React, { Component } from "react";
import { connect } from "react-redux";
import {
  toggleTrainigSetModal,
  sendDragAnnotationData
} from "../../actions/trainingSetActions";
import soundDataSuccess from "../../assets/Data_sent.ogg";

class TraningSetModal extends Component {
  state = {
    trainingSetName: "",
    cells: Array.from(Array(9), (_, i) => i + 1)
  };

  componentDidMount() {
    const {
      trainingSet: { dataSet }
    } = this.props;

    if (dataSet && Object.keys(dataSet).length) {
      this.mapDataOverCells(dataSet);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { trainingSet } = this.props;

    if (prevProps.trainingSet !== trainingSet) {
      this.mapDataOverCells(trainingSet.dataSet);
    }
  }

  mapDataOverCells = (dataSet) => {
    const { cells } = this.state;
    const { training_set, rows } = dataSet;

    let cellsCopy = cells.slice();

    rows.forEach((element) => {
      cellsCopy[element.cell - 1] = element;
    });

    this.setState({ cells: cellsCopy, trainingSetName: training_set });
  };

  handlePopup = (itemClass) => {
    const { trainingSet } = this.props;
    const { showTrainingSet, annotation, point } = trainingSet;
    //do api stuff

    this.props.sendDragAnnotationData({
      annotation: {
        ...annotation,
        class: itemClass
      },
      point
    });

    const audio = new Audio(soundDataSuccess);
    audio.play();
  };
  render() {
    const { trainingSetName, cells } = this.state;

    return (
      <div className="popup-layer">
        <div className="dr-popup-wrapper">
          <div className="training-set-header">
            <span className="training-set-label">Training set: </span>
            <span className="training-set-name">{trainingSetName}</span>
          </div>
          <div className="dr-popup-inner-wrap">
            {cells.map((cell, index) => (
              <div
                key={index}
                className="popup-item"
                onClick={cell.label ? () => this.handlePopup(cell.label) : null}
              >
                <div className="popup-img-wrapper">
                  {cell.image && (
                    <img src={`images/${cell.image}`} className="popup-img" />
                  )}
                </div>
                <span className={`popup-label`}>
                  {cell.label && (
                    <span className="popup-text">{cell.label}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trainingSet: state.trainingSet
  };
};
export default connect(mapStateToProps, {
  toggleTrainigSetModal,
  sendDragAnnotationData
})(TraningSetModal);
