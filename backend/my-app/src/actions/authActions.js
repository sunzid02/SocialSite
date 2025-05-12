import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from '../utils/setAuthToken';
// ES6 Import (Recommended)
import { jwtDecode } from 'jwt-decode';


// Register User
export const registerUser = (userData, navigate) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => navigate('/login'))
    .catch(err => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      } else {
        console.error("Network Error or Server Error", err);
        dispatch({
          type: GET_ERRORS,
          payload: { general: "Network Error. Please try again later." }
        });
      }
    });
};


//Login - Get user token
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //save to localStorage
            const { token } = res.data;

            //set token to localStrorage
            localStorage.setItem('jwtToken', token);

            //set token to auth header
            setAuthToken(token);

            //Decode token to get user data
            const decoded = jwtDecode(token);

            //set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
              })
        )
};

//set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}