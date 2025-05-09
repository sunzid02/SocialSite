const Validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validateExperienceInput(data){
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    if (Validator.isEmpty(data.title)) 
    {
        errors.title = 'Job title is required';
    }    

    if (Validator.isEmpty(data.company)) 
    {
        errors.company = 'Company field is required';
    }    

    if (Validator.isEmpty(data.from)) 
    {
        errors.from = 'Job starting date is required';
    }    


    return {
        errors,
        isValid: isEmpty(errors) //to check if the errors object is empty or not. If not empty then we have errors
    }
}