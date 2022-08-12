const post = require('../model/postModel');
const user = require('../model/userModel');
const { isInvalid } = require('./validator/postValidations');

const createPost = async function (req, res, next) {
    try {
        // let errors = isInvalid(req.body);
        // if (errors.length) {
        //     return res
        //         .status(400)
        //         .send({
        //             status: false,
        //             message: 'Bad request',
        //             error: errors
        //         });
        // }
        
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

const editPost = async function (req, res, next) {
    try {
        const { description, isPublic, hashTag, friendTag } = req.body;
        const files = req.files;
        let updatedDetails = {};
        if (description !== undefined) {
            updatedDetails['description'] = description
        }
        if (files[0] !== undefined) {
            updatedDetails['image'] = files[0];
        }
        if (files[1] !== undefined) {
            updatedDetails['video'] = files[1];
        }
        if (isPublic !== undefined) {
            updatedDetails['isPublic'] = isPublic;
        }
        if (hashTag !== undefined) {
            updatedDetails['$addToSet'] = { hashTag };
        }
        if (friendTag !== undefined) {
            updatedDetails['$addToSet'] = { friendTag };
        }
        const updatedPost = await post.findOneAndUpdate({
            postedBy: req.user_id
        }, {
            $set: updatedDetails
        }, {
            new: true
        });
        return res
            .status(201)
            .send({
                status: true,
                message: "Post edited successfully",
                data: updatedPost
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

const likePost = async function (req, res, next) {
    try {
        const userDet = await user.findOne({ user_id: req.user_id });
        if (userDet.likedPosts.includes(req.params.postId)) {
            return res
                .status(200)
                .send({
                    status: true,
                    message: "Post already liked"
                });
        }
        userDet.likedPosts.push(req.params.postId);
        await userDet.save();
        const postUpdated = await post.findOneAndUpdate({
            _id: req.params.postId
        }, {
            $inc: { likes: 1 }
        });
        return res
            .status(200)
            .send({
                status: true,
                message: "Post added to liked posts"
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

const deletePost = async function (req, res, next) {
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

const getFeed = async function (req, res, next) {
    try {
        const userDet = await user.findOne({ user_id: req.user_id });
        const filter = {
            user_id: { $nin: userDet.blockedUsers }
        };
        const postFeed = await post.aggregate([{
            $match: filter
        }, {
            $sample: {size: 10}
        }]);
        return res
            .status(404)
            .send({
                status: false,
                message: "Posts Feed",
                data: postFeed
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

module.exports = { createPost, editPost, likePost, deletePost, getFeed };