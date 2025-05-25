import { SET_CURRENT_USER, LOGOUT } from "../actions/types";
import isEmpty from "../validation/is-empty";


const initialState = {
    isAuthenticated: false,
    user: {},
    hallo: "hallo"
}

export default function(state= initialState, action){
    switch (action.type) {

        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }

        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };            
    
        default:
            return state;
    }
}