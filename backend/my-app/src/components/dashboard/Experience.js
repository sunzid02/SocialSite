import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import dayjs from 'dayjs';
import { deleteExperience } from '../../actions/profileAction';


const Experience = ({ experience, deleteExperience }) => {
    
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>


            <td>
                {dayjs(exp.from).format('YYYY/MM/DD')} -{' '}
                {exp.to === null ? 'Now' : dayjs(exp.to).format('YYYY/MM/DD')}
            </td>

            <td>
                <button className="btn btn-danger"  onClick={() => deleteExperience(exp._id)} >Delete</button>
            </td>
        </tr>
    ));

  return (
    <Fragment>
        <h2 className='my-2'> Experience</h2>
        <table className='table experience-table'>
            <thead>
                <tr>
                    <th>Company</th>
                    <th className='hide-sm'>Title</th>
                    <th className='hide-sm'>Years</th>
                    <th className='hide-sm'>Option</th>
                </tr>
            </thead>
            <tbody>
                {experiences}
            </tbody>
        </table>
    </Fragment>
  )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect( null, {deleteExperience})(Experience);
