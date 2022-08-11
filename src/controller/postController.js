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

const like = async function(req, res) {
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

const deletePost = async function (req, res) {
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

module.exports = { createPost, editPost, like, deletePost };