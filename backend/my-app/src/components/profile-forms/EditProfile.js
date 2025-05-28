import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profileAction';

import { useNavigate, Link } from "react-router-dom";

// Wrapper for class-based component to use useNavigate (React Router v6)
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}

//errors is coming from props, then we rename it to reduxErrors
const EditProfile = ({ profile:{ profile, loading }, createProfile, errors: reduxErrors, auth: { user }, getCurrentProfile }) => {

    //errors is local state here
    const [errors] = useState({});    
    const navigate = useNavigate();

    const [formData, setFromData ] = useState({
       'handle': '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    //redux e store update hoile, eikhaner local  errorState er value redux er global reduxError object diye update kore ditasi
    // 1. Fetch profile on mount
    useEffect(() => {
      getCurrentProfile();
    }, [getCurrentProfile]);

    // 2. Update local form state when profile or loading changes
    //"Jokhon profile or user.name change hoy, tokhon amra form er sob gulo field abar update kori – jate form e latest data dekha jai."
    useEffect(() => {
      setFromData({
        handle: user?.name || '',
        company: loading || !profile?.company ? '' : profile.company,
        website: loading || !profile?.website ? '' : profile.website,
        location: loading || !profile?.location ? '' : profile.location,
        status: loading || !profile?.status ? '' : profile.status,
        skills: loading || !profile?.skills ? '' : profile.skills.join(','),
        githubusername: loading || !profile?.githubusername ? '' : profile.githubusername,
        bio: loading || !profile?.bio ? '' : profile.bio,
        twitter: profile?.social?.twitter || '',
        facebook: profile?.social?.facebook || '',
        linkedin: profile?.social?.linkedin || '',
        youtube: profile?.social?.youtube || '',
        instagram: profile?.social?.instagram || '',
      });
    }, [
      loading,
      profile?.company,
      profile?.website,
      profile?.location,
      profile?.status,
      profile?.skills,
      profile?.githubusername,
      profile?.bio,
      profile?.social?.twitter,
      profile?.social?.facebook,
      profile?.social?.linkedin,
      profile?.social?.youtube,
      profile?.social?.instagram,
      user?.name
    ]);

    // 3. Update handle from user.name
    useEffect(() => {
      if (user?.name) {
        setFromData((prev) => ({ ...prev, handle: user.name }));
      }
    }, [user?.name]);

  
    const {
        handle,
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    const onSubmit = e => {
      e.preventDefault();

      createProfile(formData, navigate, true)
    }



    const onChange = e => setFromData({...formData, [e.target.name]: e.target.value});
    
    return (
    <Fragment>
      <h1 className="large text-primary">
        Edit Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required fields</small>
      <form className="form edit-profile-form" onSubmit={e => onSubmit(e)}>
        <input type="hidden" 
          name="handle"
          value={handle}
        />
        <div className="form-group">
          <select 
            name="status" 
            value={status} 
            onChange={(e) => onChange(e)}
            className={errors.status ? 'form-control is-invalid' : 'form-control'}
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          { 
            errors.status && 
            <div className="invalid-feedback">
              {errors.status}
            </div>
          }
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >

        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={(e) => onChange(e)} />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website"  value={website} onChange={(e) => onChange(e)} />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => onChange(e)} />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills"
             name="skills"  
            value={skills} 
            onChange={(e) => onChange(e)} 
            className={errors.skills ? 'form-control is-invalid' : 'form-control'}

          />
          { 
            errors.skills && 
            <div className="invalid-feedback">
              {errors.skills}
            </div>
          }
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >

        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} onChange={(e) => onChange(e)} 
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e) => onChange(e)} ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        {/* social  network */}
        <div className="my-2">
          <button  onClick={() => toggleSocialInputs(!displaySocialInputs) } type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        { displaySocialInputs && 
            <Fragment>
                <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x"></i>
                    <input type="text" placeholder="Twitter URL" name="twitter"  value={twitter} onChange={(e) => onChange(e)} />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x"></i>
                    <input type="text" placeholder="Facebook URL" name="facebook"  value={facebook} onChange={(e) => onChange(e)} />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x"></i>
                    <input type="text" placeholder="YouTube URL" name="youtube"  value={youtube} onChange={(e) => onChange(e)} />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x"></i>
                    <input type="text" placeholder="Linkedin URL" name="linkedin"  value={linkedin} onChange={(e) => onChange(e)} />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                    <input type="text" placeholder="Instagram URL" name="instagram"  value={instagram} onChange={(e) => onChange(e)} />
                </div>
            </Fragment>}


        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-primary my-1" to='/dashboard'>Go Back</Link>
      </form>      
    </Fragment>
  )
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,  //this state.auth is coming from our root reducer in this case authReducer
  errors: state.errors,
  profile: state.profile
});

export default withRouter(connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile));
