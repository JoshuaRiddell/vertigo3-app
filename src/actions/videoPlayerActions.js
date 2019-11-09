import types from "./types";
const { VIDEO_PLAYER_TYPES } = types;
export const setPlayerStateSnapshot = stateSnapshot => dispatch => {
  dispatch({
    type: VIDEO_PLAYER_TYPES.SET_VIDEO_PLAYER_STATE,
    payload: stateSnapshot
  });
};
