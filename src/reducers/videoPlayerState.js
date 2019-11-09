import types from "../actions/types";
const { VIDEO_PLAYER_TYPES } = types;

const initialState = {};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case VIDEO_PLAYER_TYPES[actions.type]:
      return {
        ...state,
        ...actions.payload
      };

    default:
      return state;
  }
}
