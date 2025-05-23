const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');


//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput =  require('../../validation/login');

// @route  GET api/users/test
// @desc   Test users route
//@access  Public
router.get('/test', (req, res) => {
    res.json({
        msg: "Users Works well"
    })
});

// @route  POST api/users/register
// @desc   Register user
//@access  Public
router.post('/register', (req, res) => {

    /**
     * 
        Assume validateRegisterInput() returns an object like this:
        {
            errors: { name: 'Name is required', email: 'Email is invalid' },
            isValid: false
        }     * 
     * 
     */
    const { errors, isValid } = validateRegisterInput(req.body);

    //check validatio, if false then show those errors  
    if (!isValid) {
        return res.status(400).json(errors)
    }

    //check user email already exist
    User.findOne({
        email: req.body.email
    })
     .then( user => {
        if(user){
            errors.email = 'Email already exists';

            return res.status(400).json(errors);
        }
        else
        {
            const avatar = gravatar.url(req.body.email, {
                s:'200', //size
                r:'pg', //Rating
                d:'mm'
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    else{
                        newUser.password = hash;
                        newUser.save()
                            .then( user => {
                                res.json(user)
                            })
                            .catch( err => console.log(err));
                    }
                })
            })
        }
     })
});


// @route  POST api/users/login
// @desc   Login User / Returning JWT Token
//@access  Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const { errors, isValid } = validateLoginInput(req.body);

    //check validatio, if false then show those errors  
    if (!isValid) {
        return res.status(400).json(errors)
    }

    //Find the user by email
    User.findOne({email: email})
        .then(user => {
            //Check for user
            if (!user) 
            {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            } 
            else 
            {
                //check password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) 
                        {
                            //user matched

                            //create jwt payload
                            const payload = { id: user.id, name: user.name, avatar: user.avatar };

                            //Sign Token
                            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                        } 
                        else 
                        {
                            errors.password = 'Password incorrect!';

                            return res.status(400).json(errors);    
                        }
                    })
            }
        })
        .catch(err => console.log(err))
});


// @route  GET api/users/current
// @desc   Return current user
//@access  Private
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
});

module.exports = router;