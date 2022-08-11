const post = require('../model/postModel');
const { isRequired } = require('./validator/postValidations');

const createPost = async function (req, res) {
    try {
        const errors = isRequired(req.body);
        if (errors.length) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: 'Bad request',
                    error: errors
                });
        }
        const newPost = await post.create(req.body);
        return res
            .status(201)
            .send({
                status: true,
                message: "Post added successfully",
                data: newPost
            });
    } catch (err) {
        return res
            .status(500)
            .send({
                status: false,
                message: err.message
            });
    }
};

const editPost = async function (req, res) {
    try {

    } catch (err) {
        return res
            .status(500)
            .send({
                status: false,
                message: err.message
            });
    }
};

const like = async function (req, res) {
    try {
        const userDet = await user.findOne({ user_id: req.user_id });
        if(userDet.likedPosts.includes(req.params.postId)) {
            return res
                .status(200)
                .send({
                    status: true,
                    message: "Post exists already in liked posts"
                });
        }
        const postUpdated = await post.findOneAndUpdate({
            user_id: req.params.user_id
        }, {
            $inc: { likes: 1 }
        });
        return res
            .status(200)
            .send({
                status: true,
                message: "Post added to Liked posts"
            });
    } catch (err) {
        return res
            .status(500)
            .send({
                status: false,
                message: err.message
            });
    }
}

const deletePost = async function (req, res) {
    try {
        const deleted = await post.findOneAndUpdate({
            user_id: req.params.user_id,
            isDleted: false
        }, {
            isDeleted: true
        });
        if (deleted) {
            return res
                .status(200)
                .send({
                    status: true,
                    message: "Post deleted successfully"
                });
        }
        return res
            .status(404)
            .send({
                status: false,
                message: "Post not found or has already been deleted"
            });
    } catch (err) {
        return res
            .status(500)
            .send({
                status: false,
                message: err.message
            });
    }
};

const getFeed = async function (req, res) {
    try {

    } catch (err) {
        return res
            .status(500)
            .send({
                status: false,
                message: err.message
            });
    }
}

module.exports = { createPost, editPost, like, deletePost, getFeed };