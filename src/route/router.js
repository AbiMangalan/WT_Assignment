const express = require('express');
const router = express.Router();
const { register, login, editProfile, follow, block } = require('../controller/userController');
const { createPost, editPost, like, deletePost } = require('../controller/postController');

// Users -> user registration, user login, follow / unfollow user, block / unblock user, edit profile

// APIs for Users/Profiles
router.post('/users/register', register);
router.post('/users/login', login);
router.patch('/users/:userId/edit', editProfile);
router.patch('/users/:userId/follow', follow);
router.patch('/users/:userId/block', block);
router.get(); //profile details, follow count, following count, list of users who liked the post, number of posts posted by a user

// Posts -> upload post, like post (1 time only), delete own post, edit post.

// APIs for Posts
router.post('/users/:userId/posts/create', createPost);
router.patch('/users/:userId/posts/:postId/edit', editPost);
router.patch('/users/:userId/posts/:postId/edit', like);
router.delete('/users/:userId/posts/:postId/delete', deletePost);

// Explore APIs

router.get(); // random feed of posts from other users except from the blocked users

module.exports = router;