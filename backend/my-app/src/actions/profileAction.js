import axios from "axios";

import { GET_ERRORS, GET_PROFILE, PROFILE_ERROR, SET_ALERT } from "./types";
import { setAlert } from "./alertAction";

//Get the current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } 
    catch (error) 
    {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: error.response.statusText, 
                status: error.response.status
            }
        });
    }
};


//Create or update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/api/profile', formData);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      if (!edit) {
        navigate('/dashboard');
      }

    } 
    catch (err) {
      const errors = err.response.data;

      if (errors && typeof errors === 'object') {
        Object.values(errors).forEach((msg) =>
          dispatch(setAlert(msg, 'danger'))            
        );
      }
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // });

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };