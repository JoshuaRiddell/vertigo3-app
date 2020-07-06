import types from "../actions/types";
const { SYSTEM_STATUS_TYPES } = types;

const initialState = {
  showModal: true
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case SYSTEM_STATUS_TYPES[actions.type]:
      return {
        ...state,
        ...actions.payload
      };

    default:
      return state;
  }
}
