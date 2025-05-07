const Validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validatePostInput(data){
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    // Check if text is empty
    if (Validator.isEmpty(data.text)) {
        errors.text = 'Post text is required';
    } 
    else if (!Validator.isLength(data.text, { min: 10, max: 300 })) 
    {
        errors.text = 'Post must be between 10 and 300 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors) //to check if the errors object is empty or not. If not empty then we have errors
    }
}