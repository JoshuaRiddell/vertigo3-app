import types from "./types";
import Papa from "papaparse";
import reef_labels_csv from "../data-sets/reef-labels.csv";

const { TRAINING_SET_TYPES } = types;
const basePath = process.env.REACT_APP_API_BASE_PATH;

export const toggleTrainigSetModal = (show) => (dispatch) => {
  dispatch({
    type: TRAINING_SET_TYPES.TOGGLE_TRAINING_SET,
    payload: show
  });
};

export const initTrainigSetModal = (dragData) => (dispatch) => {
  dispatch({
    type: TRAINING_SET_TYPES.INITIALIZE_TRAINING_SET,
    payload: dragData
  });
};

export const sendTapAnnotationData = (values) => (dispatch) => {
  fetch(`${basePath}/annotation/videoPoint`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(values)
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch({
        type: TRAINING_SET_TYPES.RECORDING_SESSION_DATA,
        payload: values
      });
    })
    .catch((err) => console.log(err));
};

export const sendDragAnnotationData = (values) => (dispatch) => {
  fetch(`${basePath}/annotation/videoRectangle`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(values)
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch({
        type: TRAINING_SET_TYPES.TOGGLE_TRAINING_SET,
        payload: false
      });

      dispatch({
        type: TRAINING_SET_TYPES.RECORDING_SESSION_DATA,
        payload: values
      });
    })
    .catch((err) => console.log(err));
};

export const sendSeaGrassData = (values) => (dispatch) => {
  fetch(`${basePath}/annotation/videoFrame`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(values)
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch({
        type: TRAINING_SET_TYPES.RECORDING_SESSION_DATA,
        payload: values
      });
    })
    .catch((err) => console.log(err));
};

export const getTrainingSets = () => (dispatch) => {
  Papa.parse(reef_labels_csv, {
    download: true,
    header: true,
    complete: (results) => {
      const { data } = results;
      if (data.length) {
        let trainingSetObj = {};
        data.forEach((row) => {
          const { training_set, cell, label, image } = row;

          if (training_set && !trainingSetObj[training_set]) {
            trainingSetObj.training_set = training_set;
            trainingSetObj.rows = [];
          }
          if (cell && label && image) {
            trainingSetObj.rows.push({ cell, label, image });
          }
        });
        if (Object.keys(trainingSetObj).length) {
          dispatch({
            type: TRAINING_SET_TYPES.SET_TRAINING_DATA_SET,
            payload: trainingSetObj
          });
        }
      }
    }
  });
};
