import types from "./types";
const { MAP_TYPES } = types;
export const setMapStateSnapshot = stateSnapshot => dispatch => {
  dispatch({
    type: MAP_TYPES.SET_MAP_STATE,
    payload: stateSnapshot
  });
};

export const setViewPosition = viewPosition => dispatch => {
  dispatch({
    type: MAP_TYPES.SET_MAP_VIEW_POSITION,
    payload: { viewPosition }
  });
};

export const setMapZoomLevel = zoomLevel => dispatch => {
  dispatch({
    type: MAP_TYPES.SET_MAP_ZOOM_LEVEL,
    payload: { zoomLevel }
  });
};
