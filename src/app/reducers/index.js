import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import homeReducer from "../modules/home/reducers/HomeReducer";
import mediumReducer from "../modules/medium/reducers/MediumReducer";
import codedaoReducer from "../modules/toidicodedao/reducers/CodeDaoReducer";

const reducers = combineReducers({
  authReducer,
  homeReducer,
  mediumReducer,
  codedaoReducer,
});

export default reducers;
