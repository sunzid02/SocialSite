import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";


// Wrapper for class-based component to use useNavigate (React Router v6)
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}

class Landing extends Component {
  componentDidMount(){
    if (this.props.auth.isAuthenticated) 
    {
        this.props.navigate('/dashboard');
    }
  }
    
  render() {
    return (
      <div>
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'>Developer Connector</h1>
                    <p className='lead'>
                        Create a developer profile/portfolio, share posts and
                        get help from other developers
                    </p>
                    <div className='buttons'>
                        <Link to='/register' className='btn btn-primary'>
                            Sign Up
                        </Link>
                        <Link to='/login' className='btn btn-light'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>        
      </div>
    )
  }
}


Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,  //this state.auth is coming from our root reducer in this case authReducer
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(Landing));
