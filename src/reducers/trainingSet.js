import types from "../actions/types";
import traningSet from "../data-sets/traningSet";

const { TRAINING_SET_TYPES } = types;

const initialState = {
  showTrainingSet: false,
  dataSet: {},
  annotation: {},
  point: {},
  recordingSession: []
};

export default function (state = initialState, actions) {
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
    case TRAINING_SET_TYPES.RECORDING_SESSION_DATA:
      return {
        ...state,
        recordingSession: [...state.recordingSession, actions.payload]
      };

    case TRAINING_SET_TYPES.SET_TRAINING_DATA_SET:
      return {
        ...state,
        dataSet: actions.payload
      };

    default:
      return state;
  }
}
