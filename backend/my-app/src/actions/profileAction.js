import axios from "axios";

import { ACCOUNT_DELETED, CLEAR_CURRENT_PROFILE, CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE } from "./types";
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


//Get all profiles
export const getProfiles = () => async dispatch => {

  dispatch({ type: CLEAR_PROFILE });
  try {
      const res = await axios.get('/api/profile/all');

      dispatch({
          type: GET_PROFILES,
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

//Get github repos
export const getGithubRepos = (username) => async dispatch => {
  try {
      const res = await axios.get(`/api/profile/github/${username}`);

      dispatch({
          type: GET_REPOS,
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


//Get profile by id
export const getProfileById = (userId) => async dispatch => {
  try {
      const res = await axios.get(`/api/profile/user/${userId}`);

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


//Delete experience
export const deleteExperience = id => async dispatch =>{
  try {
      const res = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(
        setAlert('Experience removed', 'success')
      );
  } 
  catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { 
            msg: error.response.statusText, 
            status: error.response.status
        }
    });
  }
}

//Delete experience
export const deleteEducation = id => async dispatch =>{
  try {
      const res = await axios.delete(`/api/profile/education/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(
        setAlert('Education removed', 'success')
      );
  } 
  catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { 
            msg: error.response.statusText, 
            status: error.response.status
        }
    });
  }
}

//Delete account and profile
export const deleteAccount = () => async dispatch =>{
  if (window.confirm('Are you sure? This cannot be undone')) 
  {
    try {
        const res = await axios.delete('/api/profile');
  
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED});
        dispatch(setAlert('Your account has been deleted'));

    } 
    catch (error) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { 
              msg: error.response.statusText, 
              status: error.response.status
          }
      });
    }    
  }
}


