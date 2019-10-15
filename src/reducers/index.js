import { combineReducers } from "redux";
import labelReducer from "./labelReducer";
import memoReducer from "./memoReducer";

export default combineReducers({
  labels: labelReducer,
  memos: memoReducer
});
