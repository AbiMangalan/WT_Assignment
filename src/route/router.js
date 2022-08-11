const express = require('express');
const router = express.Router();
const { register, login, editProfile, follow, block } = require('../controller/userController');
const { createPost, editPost, deletePost } = require('../controller/postController');

// Users -> user registration, user login, follow / unfollow user, block / unblock user, edit profile

// APIs for Users/Profiles
router.post('/users/register', register);
router.post('/users/login', login);
router.patch('/users/:userId/edit', editProfile);
router.patch('/users/:userId/follow', follow);
router.patch('/users/:userId/follow', block);
router.delete();

// Posts -> upload post, like post (1 time only), delete own post, edit post.

// APIs for Posts
router.post('/users/:userId/posts/create', createPost);
router.patch('/users/:userId/posts/:postId/edit', editPost);
router.delete('/users/:userId/posts/:postId/delete', deletePost);

module.exports = router;