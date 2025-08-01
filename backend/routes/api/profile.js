const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('../../config/keys');
  
const config = require('config');
const request = require('request');

const validateProfileInput =  require('../../validation/profile');
const validateExperienceInput =  require('../../validation/experience');
const validateEducationInput =  require('../../validation/education');


//load profile model
const Profile = require('../../models/Profile');

//load User model
const User = require('../../models/User');
const Post = require('../../models/Post');


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
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No profile found for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status.json(err))
});

// @route  GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {

    const errors = {};

    Profile.findOne({ handle: req.params.handle })
            .populate('user', ['name', 'avatar'])
            .then( profile => {
                if (!profile) 
                {
                    errors.noprofile = 'No profile found for this user';
                    return res.status(404).json(errors);
                }

                res.json(profile);
            })
            .catch(err => res.status(404).json({profile: 'There is no profile for this user'}))
});

// @route  GET api/profile/user/:user_id
// @desc Get profile by handle
// @access Public
router.get('/user/:user_id', (req, res) => {

    const errors = {};

    Profile.findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar'])
            .then( profile => {
                if (!profile) 
                {
                    errors.noprofile = 'No profile found for this user';
                    return res.status(404).json(errors)
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json({profile: 'There is no profile for this user'}))
});


// @route  GET api/profile/all
// @desc Get profile by handle
// @access Public
router.get('/all', (req, res) => {

    const errors = {};

    Profile.find()
            .populate('user', ['name', 'avatar'])
            .then( profiles => {
                if (!profiles) 
                {
                    errors.noprofile = 'There are no profiles';
                    return res.status(404).json(errors);
                }

                res.json(profiles);
            })
            .catch(err => res.status(404).json({profile: 'There are no profiles'}))
});



// @route  POST api/profile
// @desc   Create or Edit user profiles
//@access  Private
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {

    //validation
    const {errors, isValid } = validateProfileInput(req.body);

    //check validation
    if (!isValid) 
    {
        //return errors with 400
        return res.status(400).json(errors);    
    }

    //Get fields
    const profileFields = {};

    profileFields.user = req.user.id;

    if (req.body.handle) 
    {
        profileFields.handle = req.body.handle;
    }

    if (req.body.company) 
    {
        profileFields.company = req.body.company;
    }

    if (req.body.website) 
    {
        profileFields.website = req.body.website;
    }
    if (req.body.location) 
    {
        profileFields.location = req.body.location;
    }
    if (req.body.bio) 
    {
        profileFields.bio = req.body.bio;
    }
    if (req.body.status) 
    {
        profileFields.status = req.body.status;
    }
    if (req.body.githubusername) 
    {
        profileFields.githubusername = req.body.githubusername;
    }

    //Skills - Split into array
    if (typeof req.body.skills !== 'undefined') 
    {
        profileFields.skills = req.body.skills.split(',');
    }

    //Socials
    profileFields.social = {};

    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) 
            {
                //update
                Profile.findOneAndUpdate({ user: req.user.id}, { $set: profileFields }, { new: true })
                    .then(profile => res.json(profile))    
            }
            else
            {
                //create

                //Check if handle exist
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if (profile) 
                        {
                            errors.handle = 'That handle already exist';
                            res.status(400).json(errors);    
                        }

                        //save profile
                        new Profile(profileFields).save()
                            .then(profile => res.json(profile))
                            .catch(err => res.json(err))
                    })
            }
        })

});


// @route  POST api/profile/experience
// @desc   Add experience to profile
//@access  Private
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
    //validation
    const {errors, isValid } = validateExperienceInput(req.body);

    //check validation
    if (!isValid) 
    {
        //return errors with 400
        return res.status(400).json(errors);    
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            //add experience array to profile
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile))
        })
        .catch(err => res.json(err))
});


// @route  POST api/profile/education
// @desc   Add education to profile
//@access  Private
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
    //validation    
    const {errors, isValid } = validateEducationInput(req.body);
    
    console.log(req.body);
    

    //check validation
    if (!isValid) 
    {
        //return errors with 400
        return res.status(400).json(errors);    
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newEducation = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            //add newEducation array to profile
            profile.education.unshift(newEducation);

            profile.save().then(profile => res.json(profile))
        })
        .catch(err => res.json(err))
});


// @route  DELETE api/profile/experience/:experience_id
// @desc   DELETE experience to profile
//@access  Private
router.delete('/experience/:experience_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            //Get remove index
            const removeIndex = profile.experience
                            .map(item => item.id)
                            .indexOf(req.params.experience_id);
            
            //Splice out of array
            profile.experience.splice(removeIndex, 1);

            //save
            profile.save()
                .then(profile => res.json(profile))
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.json(err))
});

// @route  DELETE api/profile/education/:education_id
// @desc   DELETE education to profile
//@access  Private
router.delete('/education/:education_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            //Get remove index
            const removeIndex = profile.education
                            .map(item => item.id)
                            .indexOf(req.params.education_id);
            
            //Splice out of array
            profile.education.splice(removeIndex, 1);

            //save
            profile.save()
                .then(profile => res.json(profile))
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.json(err))
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      // Delete all posts by the user
      await Post.deleteMany({ user: req.user.id });
  
      // Delete the user's profile
      await Profile.findOneAndDelete({ user: req.user.id });
  
      // Delete the user account
      await User.findOneAndDelete({ _id: req.user.id });
  
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
});


//@route    GET api/profile/github/:userName
//@desc     Get User Github Repo
//@access   Public
router.get('/github/:username', async (req, res) => {
    try {
      const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
        headers: {
          'user-agent': 'node.js',
          Authorization: `token ${keys.githubtoken}`
        },
        method: 'GET'

      };
      request(options, (error, response, body) => {
        if (error) console.error(error);
  
        if (response.statusCode !== 200) {
          return res.status(404).json({ msg: 'No Github profile found' });
        }
        res.json(JSON.parse(body));
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


module.exports = router;