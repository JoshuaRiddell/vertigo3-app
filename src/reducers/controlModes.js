import types from "../actions/types";
const { CONTROL_MODE_TYPES } = types;

const initialState = {
  activeMode: "surFace"
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case CONTROL_MODE_TYPES.CHANGE_CONTROL_MODE:
      return {
        ...state,
        activeMode: actions.payload
      };

    default:
      return state;
  }
}
