import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import dayjs from 'dayjs';
import { deleteEducation } from '../../actions/profileAction';


const Education = ({ education, deleteEducation }) => {
    
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td> { edu.school } </td>
            <td> { edu.degree } </td>
            <td> { edu.fieldOfStudy } </td>


            <td>
                {dayjs(edu.from).format('YYYY/MM/DD')} -{' '}
                {edu.to === null ? 'Now' : dayjs(edu.to).format('YYYY/MM/DD')}
            </td>

            <td> { edu.description } </td>


            <td>
                <button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}>Delete</button>
            </td>
        </tr>
    ));

  return (
    <Fragment>
        <h2 className='my-2'> Education </h2>
        <table className='table education-table'>
            <thead>
                <tr>
                    <th>School</th>
                    <th className='hide-sm'>Degree</th>
                    <th className='hide-sm'>Study field</th>
                    <th className='hide-sm'>Years</th>
                    <th className='hide-sm'>Description</th>
                    <th className='hide-sm'>Option</th>
                </tr>
            </thead>
            <tbody>
                {educations}
            </tbody>
        </table>
    </Fragment>
  )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
}

export default connect(null, {deleteEducation}) (Education);
