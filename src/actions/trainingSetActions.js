import types from "./types";

const { TRAINING_SET_TYPES } = types;
const basePath = process.env.REACT_APP_API_BASE_PATH;

export const toggleTrainigSetModal = show => dispatch => {
  dispatch({
    type: TRAINING_SET_TYPES.TOGGLE_TRAINING_SET,
    payload: show
  });
};

export const initTrainigSetModal = dragData => dispatch => {
  dispatch({
    type: TRAINING_SET_TYPES.INITIALIZE_TRAINING_SET,
    payload: dragData
  });
};

export const sendTapAnnotationData = values => dispatch => {
  fetch(`${basePath}/annotation/videoPoint`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(values)
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
  // dispatch({
  //   type: types.TOGGLE_TRAINING_SET,
  //   payload: values
  // });
};

export const sendDragAnnotationData = values => dispatch => {
  fetch(`${basePath}/annotation/videoRectangle`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(values)
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      dispatch({
        type: TRAINING_SET_TYPES.TOGGLE_TRAINING_SET,
        payload: false
      });
    })
    .catch(err => console.log(err));
};

export const sendSeaGrassData = values => dispatch => {
  fetch(`${basePath}/annotation/videoFrame`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(values)
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
  // dispatch({
  //   type: types.TOGGLE_TRAINING_SET,
  //   payload: values
  // });
};
