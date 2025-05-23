import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { useNavigate } from "react-router-dom";

// Wrapper for class-based component to use useNavigate (React Router v6)
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}

class Navbar extends Component {
  onLogoutClick(e){
    e.preventDefault();
    
    const { logoutUser, navigate } = this.props;

    // ✅ Pass navigate to the action
    logoutUser(navigate);
    // this.props.navigate('/login'); // Redirect from component, not inside action
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul>
        <li>
            <Link to='/dashboard'>
             <i className='fa fa-user' />{' '}            
             <span className='hide-sm'> Dashboard</span>
            </Link>
        </li>         
        <li>
          <a href="#" onClick={this.onLogoutClick.bind(this)}>
            {/* <img 
              className='rounded-circle'
              src={user.avatar} 
              alt={user.name} 
              style={{ width: '25px', marginRight:'5px'}}
              title="You must have a Gravatar connected to your email to display an image">                   
            </img>{' '} */}
            {/* <i className='fas fa-sign-out-alt' />{' '} */}
            <span className='hide-sm'> Logout</span>
          </a>
        </li>
       
      </ul>      
    );

    const guestLinks = (
      <ul>
          <li>
              <Link to='/register'>Register</Link>
          </li>
          <li>
              <Link to='/login'>Login</Link>
          </li>
      </ul>
    );


    return (
      <div>
        <nav className="navbar bg-dark">
          <h1>
              <Link to="/"> <i className="fas fa-code"></i> DevConnector </Link>
          </h1>
          {/* <ul>
              <li><Link to="/profiles">Developers</Link></li>
          </ul> */}

          { isAuthenticated ? authLinks: guestLinks }   
        </nav>   

      </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});


// export default connect(mapStateToProps, { logoutUser})(Navbar);
export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
