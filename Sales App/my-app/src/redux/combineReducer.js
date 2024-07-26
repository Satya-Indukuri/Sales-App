import { userReducer } from "./userReducer";
import { combineReducers } from "redux";

export const combineReducer = combineReducers({userReducer: userReducer});
