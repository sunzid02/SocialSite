import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profileAction';
import { Link, useParams } from 'react-router-dom';


const Profile = ({ getProfileById, profile: { profile, loading }, auth, match  }) => {
    const { id } = useParams();

    useEffect(() => {
        getProfileById(id);
    }, [getProfileById, id]);

  return (
    <Fragment>
    { profile === null || loading ? <Spinner></Spinner> : 
      <Fragment>
        <Link to='/profiles' className='btn btn-light'>  Back to profiles </Link>
        {   auth.isAuthenticated 
         && auth.user 
         && profile.user 
            && auth.user.id === profile.user._id
            && (
                <Link to='/edit-profile' className='btn btn-dark'> 
                    Edit Profile 
                </Link>
        )}
      </Fragment>}
  </Fragment>
  )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { getProfileById })(Profile);