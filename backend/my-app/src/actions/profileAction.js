import axios from "axios";

import { CLEAR_CURRENT_PROFILE, GET_ERRORS, GET_PROFILE, PROFILE_ERROR, SET_ALERT, UPDATE_PROFILE } from "./types";
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
export const createProfile = (formData, navigate, edit = false) =>
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


//Add experience (Here we are using thunk)
export const addExperience = (formData, navigate) => async dispatch => {
  try {

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(
      setAlert('Experience Added', 'success')
    );
    
    navigate('/dashboard');
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

//Add education (Here we are using thunk)
export const addEducation = (formData, navigate) => async dispatch => {
  try {

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(
      setAlert('Education Added', 'success')
    );
    
    navigate('/dashboard');
  } 
  catch (err) {
    console.log(err);
    
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

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};