import axios from 'axios';
import { CLEAR_PROFILE, GET_ERRORS, SET_CURRENT_USER, LOGOUT } from "./types";
import setAuthToken from '../utils/setAuthToken';
// ES6 Import (Recommended)
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'react-router-dom';
import { Navigate } from "react-router-dom";


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
      } 
      else 
      {
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


//Log user out
// export const logoutUser = (navigate = null) => dispatch => {
//   //Remove the token from localStorage
//   localStorage.removeItem('jwtToken');

//   //Remove auth header for future requests
//   setAuthToken(false);

//   //Set current user to {} which will set isAuthenticated to false
//   dispatch(setCurrentUser({}));

//   // redirect to login page
  
//   // ✅ Redirect user to login if navigate is provided
//   if (navigate) {
//     // Small delay before navigating
//     setTimeout(() => {
//       navigate("/login");
//     }, 0); // minimal delay to allow cleanup
//   }

//   dispatch({
//     type: CLEAR_PROFILE
//   });

// }
// Logout
export const logout = () => ({ type: LOGOUT });