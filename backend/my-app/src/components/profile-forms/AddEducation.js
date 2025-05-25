import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileAction';
import { useNavigate, Link } from "react-router-dom";



const AddEducation = ({addEducation}) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description,
    } = formData;

    const onChange = e => { setFormData({ ...formData, [e.target.name]: e.target.value })
                            console.log(e.target.name)  
                            console.log(e.target.value)  };

    const onSubmit = e => {
        e.preventDefault();
        addEducation(formData, navigate);
    }

  return (
    <Fragment>
        <h1 className='large text-primary'>Add Your Education</h1>
        <p className='lead'>
            <i className='fas fa-code-branch' /> Add any school or bootcamp
            that you have attended
        </p>
        <small>* = required field</small>
        <form
            className='form add-education-form'
            onSubmit={e => onSubmit(e) }
        >
            <div className='form-group'>
                <input
                    type='text'
                    placeholder='* School or Bootcamp'
                    name='school'
                    value={school}
                    onChange={e => {onChange(e)} }
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    type='text'
                    placeholder='* Degree or Certificate'
                    name='degree'
                    value={degree}
                    onChange={e => onChange(e)}
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    type='text'
                    placeholder='Field of Study'
                    name='fieldOfStudy'
                    value={fieldOfStudy}
                    onChange={e => onChange(e)}
                />
            </div>
            <div className='form-group'>
                <h4>From Date</h4>
                <input
                    type='date'
                    name='from'
                    value={from}
                    onChange={e => onChange(e)}
                />
            </div>
            <div className='form-group'>
                <p>
                    <input
                        type='checkbox'
                        name='current'
                        checked={current}
                        value={current}
                        onChange={() => {
                            setFormData({ ...formData, current: !current });
                            toggleDisabled(!toDateDisabled);
                        }}
                    />{' '}
                    Current School
                </p>
            </div>
            <div className='form-group'>
                <h4>To Date</h4>
                <input
                    type='date'
                    name='to'
                    value={to}
                    onChange={e => onChange(e)}
                    disabled={toDateDisabled ? 'disabled' : ''}
                />
            </div>
            <div className='form-group'>
                <textarea
                    name='description'
                    cols='30'
                    rows='5'
                    placeholder='Program Description'
                    value={description}
                    onChange={e => onChange(e)}
                />
            </div>
            <input type='submit' className='btn btn-primary my-1' />
            <Link className='btn btn-light my-1' to='/dashboard'>
                Go Back
            </Link>
        </form>
    </Fragment>
  );
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}


export default connect(null, {addEducation})(AddEducation)
