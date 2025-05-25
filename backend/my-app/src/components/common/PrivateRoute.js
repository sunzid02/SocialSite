import { Navigate,  Outlet  } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ auth }) => {
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);