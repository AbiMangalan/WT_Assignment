const express = require('express');
const router = express.Router();
const { register, login, editProfile, follow, unfollow, block, unblock, profileDetails } = require('../controller/userController');
const { createPost, editPost, likePost, deletePost, getFeed } = require('../controller/postController');
const { authentication, authorization } = require('../controller/middleware/middlewares')

// Users -> user registration, user login, follow / unfollow user, block / unblock user, edit profile

// APIs for Users/Profiles
router.post('/users/register', register);
router.post('/users/login', login);
router.patch('/users/:userId/edit', authentication, authorization, editProfile);
router.patch('/users/:userId/follow', authentication, follow);
router.patch('/users/:userId/unfollow', authentication, unfollow);
router.patch('/users/:userId/block', authentication, block);
router.patch('/users/:userId/unblock', authentication, unblock);
router.get('/users/:userId', authentication, profileDetails); //profile details, follow count, following count, list of users who liked the post, number of posts posted by a user

// Posts -> upload post, like post (1 time only), delete own post, edit post.

// APIs for Posts
router.post('/users/:userId/posts/create', authentication, createPost);
router.patch('/users/:userId/posts/:postId/edit', authentication, authorization, editPost);
router.patch('/users/:userId/posts/:postId/edit', authentication, likePost);
router.delete('/users/:userId/posts/:postId/delete', authentication, authorization, deletePost);

// Explore APIs

router.get('/users/:userId/feed', getFeed); // random feed of posts from other users except from the blocked users

module.exports = router;