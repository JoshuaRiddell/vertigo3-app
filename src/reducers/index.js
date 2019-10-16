import { combineReducers } from "redux";
import session from "./session";
import trainingSet from "./trainingSet";

export default combineReducers({
  session,
  trainingSet
});
