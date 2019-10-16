import types from "../actions/types";

const initialState = {
  showTrainingSet: false
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case types.TOGGLE_TRAINING_SET:
      return {
        ...state,
        showTrainingSet: actions.payload
      };

    default:
      return state;
  }
}
