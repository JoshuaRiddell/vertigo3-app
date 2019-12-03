import types from "./types";
const { SYSTEM_STATUS_TYPES } = types;

export const systemsCheckModal = showModal => dispatch => {
  dispatch({
    type: SYSTEM_STATUS_TYPES.SYSTEM_STATUS_MODAL_TOGGLE,
    payload: { showModal }
  });
};

export const systemStatusChange = statusUpdate => dispatch => {
  dispatch({
    type: SYSTEM_STATUS_TYPES.SYSTEM_STATUS_CHANGE,
    payload: { ...statusUpdate }
  });
};
