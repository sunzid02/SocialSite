import axios from 'axios';
import { GET_ERRORS } from "./types";

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
