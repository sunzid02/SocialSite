const Validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validateRegisterInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //email
    if (Validator.isEmpty(data.email)) 
    {
        errors.email = 'Email is required';
    }    
    else if (!Validator.isEmail(data.email)) 
    {
        errors.email = 'Email is invalid';
    }

    //password
    if (Validator.isEmpty(data.password)) 
    {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors) //to check if the errors object is empty or not. If not empty then we have errors
    }
}