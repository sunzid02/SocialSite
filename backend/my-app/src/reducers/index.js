import { combineReducers } from "redux";
import authReducer from './authReducer';
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import alertReducer from "./alert";


export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    alert: alertReducer
});