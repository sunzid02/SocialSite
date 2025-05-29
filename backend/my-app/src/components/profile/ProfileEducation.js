import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const ProfileEducation = ({education: {
    school, degree, fieldOfStudy,to, from, description
}}) => {
  return (
    <div>
      <h3 className='text-dark'> {school} </h3>
      <p>
        {dayjs(from).format('YYYY/MM/DD')} -{' '}
        {to ? dayjs(to).format('YYYY/MM/DD') : 'Now'}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field of study: </strong> {fieldOfStudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired,
}

export default ProfileEducation
