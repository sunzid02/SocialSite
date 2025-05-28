import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileAction';

class Navbar extends Component {
  onLogoutClick(e){
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;
  
      const authLinks = (
        <ul>
          <li><Link to="/profiles" className="nav-link">Developers</Link></li>              

          <li>
            <Link className="nav-link" to="/feed">
              Post Feed
            </Link>
          </li>
          <li >
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li  style={{ 
                'margin-top': '6px', 
              }}
              >
            <button
              onClick={this.onLogoutClick.bind(this)}
              className="btn btn-link nav-link p-0"
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: 0, 
                color: 'inherit', 
                textDecoration: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img
                className="rounded-circle"
                src={user.avatar}
                alt={user.name}
                style={{ width: '25px', marginRight: '5px' }}
                title="You must have a Gravatar connected to your email to display an image"
              />
              Logout
            </button>
          </li>

        </ul>
      );
  
      const guestLinks = (
        <ul>
          <li><Link to="/profiles" className="nav-link">Developers</Link></li>              

          <li>
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </li>
          <li >
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      );

    return (
      <div>
        <nav className="navbar bg-dark">
          <h1>
              <Link to="/"> <i className="fas fa-code"></i> DevConnector </Link>
          </h1>

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


// export default connect(mapStateToProps, { logout})(Navbar);
// export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(withRouter(Navbar));
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);