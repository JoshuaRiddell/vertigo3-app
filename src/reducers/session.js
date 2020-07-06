import types from "../actions/types";

const initialState = {
  activeMode: "PREVIEW",
  startupMode: true,
  previewMode: true,
  recordingMode: false,
  sessionPause: false
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case types[actions.type]:
      return {
        ...state,
        ...actions.payload
      };

    default:
      return state;
  }
}
