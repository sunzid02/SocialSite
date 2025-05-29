import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const ProfileExperience = ({experience: {
    company, title, location, current, to, from, description
}}) => {
  return (
    <div>
      <h3 className='text-dark'> {company} </h3>
      <p>
        {dayjs(from).format('YYYY/MM/DD')} -{' '}
        {to ? dayjs(to).format('YYYY/MM/DD') : 'Now'}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  )
}

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired,
}

export default ProfileExperience
