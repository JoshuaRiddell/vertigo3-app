import types from "../actions/types";
import traningSet from "../data-sets/traningSet";

const initialState = {
  showTrainingSet: false,
  dataSet: traningSet
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
