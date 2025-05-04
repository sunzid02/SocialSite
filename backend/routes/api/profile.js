const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// const keys = 

//load profile model
const Profile = require('../../models/Profile');

//load User model
const User = require('../../models/User');


// @route  GET api/profile/test
// @desc   Test users route
//@access  Public
router.get('/test', (req, res) => {
    res.json({
        msg: "Profile Works"
    })
});


// @route  GET api/profile
// @desc   GET current user profiles
//@access  Private
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    
    const errors = {};
    
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No profile found for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status.json(err))
    });

module.exports = router;