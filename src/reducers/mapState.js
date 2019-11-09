import types from "../actions/types";
const { MAP_TYPES } = types;

const initialState = {
  path: [],
  pathIndex: 0,
  viewPosition: [-23.908223, 152.386752],
  zoomLevel: 14
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case MAP_TYPES[actions.type]:
      return {
        ...state,
        ...actions.payload
      };

    default:
      return state;
  }
}
