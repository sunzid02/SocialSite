import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profileAction';
import { Link, useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';


const Profile = ({ getProfileById, profile: { profile, loading }, auth, match  }) => {
    const { id } = useParams();

    useEffect(() => {
        getProfileById(id);
    }, [getProfileById, id]);

    // console.log(profile.experience);
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
        <div class="profile-grid my-1">
            {/* top */}
            <ProfileTop profile={profile}></ProfileTop>

            {/* about */}
            <ProfileAbout profile={profile}></ProfileAbout>

            {/* experience */}
            <div className='profile-exp bg-white p-2'>
                <h2 className='text-primary'> Experience </h2>
                {
                    profile.experience.length > 0 ? (
                        <Fragment>
                            {profile.experience.map(experience => (
                                <ProfileExperience key={experience._id} experience={experience} />
                            ))}
                        </Fragment>
                    ) : (<h4> No experience found</h4>)
                }
            </div>

            {/* education */}
            <div className='profile-edu bg-white p-2'>
                <h2 className='text-primary'> Education </h2>
                {
                    profile.education.length > 0 ? (
                        <Fragment>
                            {profile.education.map(education => (
                                <ProfileEducation key={education._id} education={education} />
                            ))}
                        </Fragment>
                    ) : (<h4> No education found</h4>)
                }
            </div>
        </div>
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