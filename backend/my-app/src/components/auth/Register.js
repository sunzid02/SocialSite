import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { registerUser } from '../../actions/authActions';



// Wrapper for class-based component to use useNavigate (React Router v6)
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name:'',
      email:'',
      password:'',
      password2:'',
      errors:{}
    };

    // binding
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentWillReceiveProps(nextProps){
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    console.log(newUser);

    this.props.registerUser(newUser, this.props.navigate);

    
  }

  render() {

    // const errors = this.state.errors; same thing
    const { errors } = this.state;
    const { auth } = this.props;

    // ✅ Redirect if authenticated
    if (auth.isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }

    return (
      <div>
        <section className="container">
          <h1 className="large text-primary">
            Sign Up
          </h1>
          <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

            <form className="form" noValidate onSubmit={this.onSubmit}>
              {/* name */}
              <div className="form-group">
                <input 
                  type="text" 
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.name
                  })}
                  placeholder="Name" 
                  name="name"
                  value={this.state.name} 
                  onChange={this.onChange}              
                />
                {errors.name && (<div className="invalid-feedback"> {errors.name} </div>) }
              </div>

              {/* email */}
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email
                  })}
                  placeholder="Email Address" 
                  value={this.state.email} 
                  onChange={this.onChange}
                />
                {errors.email && (<div className="invalid-feedback"> {errors.email} </div>) }
                <small className="form-text">
                  This site uses Gravatar, so if you want a profile image, use a Gravatar email.
                </small>

              </div>

              {/* password */}
              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Password" 
                  name="password" 
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password
                  })}                  
                  value={this.state.password} 
                  onChange={this.onChange}
                />
                {errors.password && (<div className="invalid-feedback"> {errors.password} </div>) }
              </div>

              {/* confirm password */}
              <div className="form-group">
                <input 
                  type="password"
                  placeholder="Confirm Password"  
                  name="password2" 
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password2
                  })}                     
                  value={this.state.password2} 
                  onChange={this.onChange}
                />
                {errors.password2 && (<div className="invalid-feedback"> {errors.password2} </div>) }

              </div>

              {/* submit button */}
              <input 
                type="submit" 
                value="Register" 
                className="btn btn-primary" 
              />
            </form>
          <p className="my-1">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </section>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,  //this state.auth is coming from our root reducer in this case authReducer
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
// export default Register;
