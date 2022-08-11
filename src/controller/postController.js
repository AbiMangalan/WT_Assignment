const post = require('../model/postModel');

const createPost = async function (req, res) {
    try {

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

const editPost = async function (req, res) {
    try {

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

const deletePost = async function (req, res) {
    try {

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

module.exports = { createPost, editPost, deletePost };