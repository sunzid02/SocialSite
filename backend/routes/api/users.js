const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');



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
    //check user email already exist
    User.findOne({
        email: req.body.email
    })
     .then( user => {
        if(user){
            return res.status(400).json({
                email: 'Email already exists'
            });
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

    //Find the user by email
    User.findOne({email: email})
        .then(user => {
            //Check for user
            if (!user) 
            {
                return res.status(404).json({email: 'User not found'})
            } 
            else 
            {
                //check password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) 
                        {
                            res.json({ msg: 'Success'});    
                        } 
                        else 
                        {
                            return res.status(400).json({ password: 'Password incorrect!'});    
                        }
                    })
            }
        })
        .catch(err => console.log(err))
});

module.exports = router;