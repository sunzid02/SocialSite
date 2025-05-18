import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { useNavigate, Navigate, Link } from "react-router-dom";
import classnames from 'classnames';

// Wrapper for class-based component to use useNavigate (React Router v6)
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}

class Login extends Component {

  constructor(){
    super();
    this.state = {
      email:'',
      password:'',
      errors:{}
    };

    // binding
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData);
    
  }

  // componentDidMount() {
  //   const { navigate, auth } = this.props;
  //   if (auth.isAuthenticated) {
  //     navigate('/dashboard');
  //   }
  // }

  componentDidUpdate(prevProps) {
    const { errors } = this.props;
    // Update state with errors if they change
    if (errors !== prevProps.errors) {
      this.setState({ errors });
    }
  }

  render() {
    const { errors } = this.state;
    const { auth } = this.props;

    // ✅ Redirect if authenticated
    if (auth.isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }

    return (
      <div>
        <section className="container">
            {/* <!-- Alert --> */}
            {/* <div className="alert alert-danger">
              Invalid Credentials
            </div> */}

            <h1 className="large text-primary">
              Sign In
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>

            <form  className="form" noValidate onSubmit={this.onSubmit}>

              {/* email */}
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  value={this.state.email}
                  className={classnames('form-control form-control-lg', {
                   'is-invalid': errors.email
                  })}
                  placeholder="Email Address" 
                  onChange={this.onChange}
                />
                {errors.email && (<div className="invalid-feedback"> {errors.email} </div>) }
              </div>

              {/* password */}
              <div className="form-group">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password
                   })}                  
                  value={this.state.password}
                  onChange={this.onChange}  
                />
                {errors.password && (<div className="invalid-feedback"> {errors.password} </div>) }
              </div>

              <input type="submit" value="Login" className="btn btn-primary" />
            </form>

            <p className="my-1">
              Don't have an account?  <Link to='/register'>Register</Link>             
            </p>
        </section>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,  //this state.auth is coming from our root reducer in this case authReducer
  errors: state.errors
});

// export default connect(mapStateToProps, { loginUser })(Login);

// ✅ Make sure to apply withRouter here
export default connect(mapStateToProps, { loginUser })(withRouter(Login));
// export default  Login;