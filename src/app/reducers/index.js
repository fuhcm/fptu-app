import { combineReducers } from "redux";

import loginPageReducer from './AuthReducer';

const reducers = combineReducers({
    loginPageReducer
});

export default reducers;