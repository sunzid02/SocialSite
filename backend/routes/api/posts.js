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


// @route  POST api/posts/like/:postId
// @desc   Like post
//@access  Private
router.put('/like/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {

            Post.findById(req.params.postId)
                .then(post => {
                    
                    //already liked the post
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyLike: 'User already like this post...'})                   
                    }

                    //Add user id to likes array
                    post.likes.unshift({ user: req.user.id });

                    post.save().then(post => res.json(post))
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


// @route  POST api/posts/unlike/:postId
// @desc   Remove like from the post
//@access  Private
router.put('/unlike/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {

            Post.findById(req.params.postId)
                .then(post => {
                    
                    //already liked the post
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notliked: 'You have not liked this post yet...'})                   
                    }

                    //Get Remove index
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    //Splice out of array
                    post.likes.splice(removeIndex, 1);

                    //save
                    post.save().then( post => res.json(post));
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


// @route  POST api/posts/comment/:postId
// @desc   Add a comment to the post
//@access  Private
router.post('/comment/:postId', passport.authenticate('jwt', {session: false}), (req, res) => {

    Post.findById(req.params.postId)
        .then(post => {

            //validation    
            const {errors, isValid } = validatePostInput(req.body);

            //check validation
            if (!isValid) 
            {
                //return errors with 400
                return res.status(400).json(errors);    
            }
             
            //create comment
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            // Add to comments array
            post.comments.unshift(newComment);
            
            //save
            post.save()
                .then(post => res.json(post))
                .catch(err => res.json({ comment: 'comment insertion failed'}))
        })
        .catch(err => res.status(404).json({ postnotfound: 'post not found' + err }))
});

// @route  DELETE api/posts/comment/:postId/:commentId
// @desc   Remove a comment from the post
//@access  Private
router.delete('/comment/:postId/:commentId', passport.authenticate('jwt', {session: false}), (req, res) => {

    Post.findById(req.params.postId)
        .then(post => {

            //Check to see if the comment exists
            if(post.comments.filter(comment => comment._id.toString() === req.params.commentId).length === 0 )
            {
                return res.status(404).json({ commentnotexist: 'comment does not exist'});
            }

            //Get remove index
            const removeIndex = post.comments
                        .map(item => item._id.toString())
                        .indexOf(req.params.commentId)

            //Splice comment out of array
            post.comments.splice(removeIndex, 1);

            post.save()
                .then(post => res.json(post))
                .catch(err => res.status(500).json({
                    ailed: 'comment deletion failed'
                })) 


        })
        .catch(err => res.status(404).json({ postnotfound: 'post not found' + err }))
});

module.exports = router;