import types from "../actions/types";
const { SONAR_TYPES } = types;

const initialState = {};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case SONAR_TYPES[actions.type]:
      return {
        ...state,
        ...actions.payload
      };

    default:
      return state;
  }
}
