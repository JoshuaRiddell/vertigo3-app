import { combineReducers } from "redux";
import session from "./session";
import trainingSet from "./trainingSet";
import videoPlayerState from "./videoPlayerState";
import sonarState from "./sonarState";
import mapState from "./mapState";
import controlModes from "./controlModes";

export default combineReducers({
  session,
  trainingSet,
  videoPlayerState,
  sonarState,
  mapState,
  controlModes
});
