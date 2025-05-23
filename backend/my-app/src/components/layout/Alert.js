import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  console.log('Rendering alerts:', alerts); // Should show both

  return (
    <div className="alert-wrapper">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert alert-${alert.alertType}`}
          style={{ border: '1px solid #333', marginBottom: '10px' }}
        >
          {alert.msg}
        </div>
      ))}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);