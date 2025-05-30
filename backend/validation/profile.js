const Validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validateProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';


    if (!Validator.isLength(data.handle, { min: 2, max: 40})) {
        errors.handle = 'Handle needs to be between 2 and 4 characters';
    }

    if (Validator.isEmpty(data.handle)) 
    {
        errors.handle = 'Profile handle is required';
    }

    if (Validator.isEmpty(data.status)) 
    {
        errors.status = 'Status field is required';
    }

    if (Validator.isEmpty(data.skills)) 
    {
        errors.skills = 'Skills field is required';
    }

    if (!isEmpty(data.website)) 
    {
        if(!Validator.isURL(data.website))
        {
            errors.website = "Website must be a valid url";
        }
    }

    if (!isEmpty(data.youtube)) 
    {
        if(!Validator.isURL(data.youtube))
        {
            errors.youtube = "youtube must be a valid url";
        }
    }

    if (!isEmpty(data.twitter)) 
    {
        if(!Validator.isURL(data.twitter))
        {
            errors.twitter = "twitter must be a valid url";
        }
    }

    if (!isEmpty(data.facebook)) 
    {
        if(!Validator.isURL(data.facebook))
        {
            errors.facebook = "facebook must be a valid url";
        }
    }

    if (!isEmpty(data.linkedin)) 
    {
        if(!Validator.isURL(data.linkedin))
        {
            errors.linkedin = "linkedin must be a valid url";
        }
    }

    if (!isEmpty(data.instagram)) 
    {
        if(!Validator.isURL(data.instagram))
        {
            errors.instagram = "instagram must be a valid url";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors) //to check if the errors object is empty or not. If not empty then we have errors
    }
}