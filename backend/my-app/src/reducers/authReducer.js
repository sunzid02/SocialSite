import { ACCOUNT_DELETED, SET_CURRENT_USER } from "../actions/types";
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

        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
        }
            
         
        default:
            return state;
    }
}