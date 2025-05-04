const Validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''; //confirming password

    //name validation
    if (Validator.isEmpty(data.name)) 
    {
        errors.name = 'Name is required';
    }
    else if(!Validator.isLength(data.name, {min:2, max: 30})){
        errors.name = "Name must be between 2 and 30 characters";
    }

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
    else if (!Validator.isLength(data.password, {min: 6, max: 30})) 
    {
        errors.password = 'Password must be atleast 6 characters';
    }

    //confirm password required
    if (Validator.isEmpty(data.password2)) 
    {
        errors.password2 = 'Confirm Password field is required';
    }
        
    //confirming password matching
    if (!Validator.equals(data.password, data.password2)) 
    {
        errors.password2 = 'Password must match';
    }

    return {
        errors,
        isValid: isEmpty(errors) //to check if the errors object is empty or not. If not empty then we have errors
    }
}