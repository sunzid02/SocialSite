import { CLEAR_CURRENT_PROFILE, CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE } from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};


export default function profileReducer(state = initialState, action){
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
        }

        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
        }
        
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
        }

        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
        }

        case CLEAR_CURRENT_PROFILE:
            return {
              ...state,
              profile: null
        };

        case GET_REPOS:
            return {
              ...state,
              repos: payload,
              loading: false
        };

        default:
            return state;
    }
}