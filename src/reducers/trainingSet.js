import types from "../actions/types";
import traningSet from "../data-sets/traningSet";

const { TRAINING_SET_TYPES } = types;

const initialState = {
  showTrainingSet: false,
  dataSet: traningSet,
  annotation: {},
  point: {}
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case TRAINING_SET_TYPES.TOGGLE_TRAINING_SET:
      return {
        ...state,
        showTrainingSet: actions.payload,
        annotation: {},
        point: {}
      };
    case TRAINING_SET_TYPES.INITIALIZE_TRAINING_SET:
      return {
        ...state,
        ...actions.payload
      };

    default:
      return state;
  }
}
