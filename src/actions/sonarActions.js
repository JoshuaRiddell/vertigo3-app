import types from "./types";
const { SONAR_TYPES } = types;
export const setSonarStateSnapshot = stateSnapshot => dispatch => {
  dispatch({
    type: SONAR_TYPES.SET_SONAR_STATE,
    payload: stateSnapshot
  });
};
