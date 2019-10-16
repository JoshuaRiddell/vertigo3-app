import types from "./types";

export const toggleTrainigSetModal = show => dispatch => {
  dispatch({
    type: types.TOGGLE_TRAINING_SET,
    payload: show
  });
};
