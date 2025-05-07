const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Post Model
const Post = require('../../models/Post')

//validation
const validatePostInput = require('../../validation/post');

// @route  GET api/posts/test
// @desc   Test post route
//@access  Public
router.get('/test', (req, res) => {
    res.json({
        msg: "Posts Works"
    })
});

// @route  POST api/posts
// @desc   Create POST
//@access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    //validation    
    const {errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) 
    {
        //return errors with 400
        return res.status(400).json(errors);    
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save()
        .then(post => res.json(post))
        .catch(err=>res.status(400).json(err));
});


module.exports = router;