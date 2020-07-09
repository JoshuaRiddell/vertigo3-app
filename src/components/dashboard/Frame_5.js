import React, { Component } from "react";
import clickSound from "../../assets/Key-click.ogg";
import soundDataSuccess from "../../assets/Data_sent.ogg";
import { connect } from "react-redux";
import { sendSeaGrassData } from "../../actions/trainingSetActions";
import Papa from "papaparse";
import frame_5_cells_csv from "../../data-sets/frame-5-cells.csv";

class Frame_5 extends Component {
  state = {
    dataSelection: "",
    cells: Array.from(Array(16), (_, i) => i + 1)
  };

  componentDidMount() {
    Papa.parse(frame_5_cells_csv, {
      download: true,
      header: true,
      complete: (results) => {
        const { data } = results;

        if (data.length) {
          const { cells } = this.state;
          let cellsCopy = cells.slice();

          data.forEach((element) => {
            cellsCopy[element.cell - 1] = element;
          });
          this.setState({ cells: cellsCopy });
        }
      }
    });
  }

  setDataSelection = (cell) => {
    if (cell && cell.label) {
      this.setState(
        {
          dataSelection: cell.label
        },
        () => {
          this.feedBackSounds("click");
          setTimeout(() => this.sendCurrentData(), 100);
        }
      );
    }
  };

  sendCurrentData = () => {
    const { dataSelection } = this.state;
    const {
      mapState: { pathIndex, path }
    } = this.props;

    const latitude = path[pathIndex] ? path[pathIndex][0] : 0;
    const longitude = path[pathIndex] ? path[pathIndex][1] : 0;

    this.props.sendSeaGrassData({
      annotation: {
        timestamp: Date.now(),
        latitude,
        longitude,
        class: dataSelection
      }
    });

    this.setState(
      {
        dataSelection: ""
      },
      () => this.feedBackSounds("success")
    );
  };

  feedBackSounds = (type) => {
    if (type === "click") {
      const audio = new Audio(clickSound);
      audio.play();
    }
    if (type === "success") {
      const audio = new Audio(soundDataSuccess);
      audio.play();
    }
  };

  render() {
    const { dataSelection, cells } = this.state;

    const {
      session: { recordingMode }
    } = this.props;

    return (
      <React.Fragment>
        <div className="bottom-sec">
          <div className="frame-5-data-wrapper">
            {cells.map((cell, index) => (
              <React.Fragment key={index}>
                <div
                  className={`frame-5-data-item ${
                    cell && !cell.label ? `bg-empty-cell` : ""
                  } ${
                    cell && cell.label && dataSelection === cell.label
                      ? "active"
                      : ""
                  }`}
                  style={
                    cell && cell.color ? { backgroundColor: cell.color } : {}
                  }
                  onClick={() => recordingMode && this.setDataSelection(cell)}
                >
                  <h1 className="data-label">
                    {cell && cell.label ? cell.label : ""}
                  </h1>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trainingSet: state.trainingSet,
    mapState: state.mapState,
    session: state.session
  };
};
export default connect(mapStateToProps, { sendSeaGrassData })(Frame_5);
