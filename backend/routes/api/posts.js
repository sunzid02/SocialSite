const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Post Model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//validation
const validatePostInput = require('../../validation/post');


// @route  GET api/posts
// @desc   GET posts
//@access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts=> res.json(posts))
        .catch(err => res.status(404).json({
            noPostsFound: 'no posts found'
        }));
});

// @route  GET api/posts/:id
// @desc   GET post by id
//@access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({
            noPostFound: 'no post found with this id'
        }));
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


// @route  POST api/posts
// @desc   Delete POST
//@access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {

            Post.findById(req.params.id)
                .then(post => {
                   
                    //check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: 'User is not authorized' });
                    }

                    //delete
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.json({ success: true }))
                        .catch(err => console.error("Error removing post:", err));
                })
                .catch(err => {
                    console.error("Error finding post:", err);
                    res.status(404).json({ postnotfound: 'No post found' });
                });
        })
        .catch(err => {
            console.error("Error finding profile:", err);
            res.status(500).json({ error: 'Server error' });
        });


});


module.exports = router;