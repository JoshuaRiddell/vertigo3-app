import types from "./types";

export const setActiveMode = (mode, showNotification) => dispatch => {
  if (mode === "PREVIEW" || mode === "STOP_SESSION") {
    showNotification("Preview mode", 0, "PREVIEW");
    dispatch({
      type: types.SET_PREVIEW_MODE,
      payload: {
        activeMode: "PREVIEW",
        startupMode: false,
        previewMode: true,
        recordingMode: false,
        sessionPause: false
      }
    });
  }

  if (mode === "RECORD_SESSION") {
    showNotification("Recording session", 6000, mode);
    dispatch({
      type: types.SET_RECORDING_MODE,
      payload: {
        activeMode: "RECORD_SESSION",
        previewMode: false,
        recordingMode: true,
        sessionPause: false
      }
    });
  }

  if (mode === "PAUSE_SESSION") {
    showNotification("Recording session paused", 0, mode);
    dispatch({
      type: types.SET_SESSION_PAUSE,
      payload: {
        activeMode: "PAUSE_SESSION",
        sessionPause: true,
        recordingMode: false
      }
    });
  }
};
