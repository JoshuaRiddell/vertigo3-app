import types from "./types";
import soundDataSuccess from "../assets/Data_sent.ogg";
import clickSound from "../assets/Key-click.ogg";
const { CONTROL_MODE_TYPES } = types;

export const changeControlMode = mode => dispatch => {
  dispatch({
    type: CONTROL_MODE_TYPES.CHANGE_CONTROL_MODE,
    payload: mode
  });

  const audio = new Audio(clickSound);
  audio.play();
};
