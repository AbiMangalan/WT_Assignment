const user = require('../model/userModel');
const { sign } = require('jsonwebtoken');
const { isRequired } = require('./validator/userValidations');
const post = require('../model/postModel');

const getNextId = async function () {
    try {
        const nextId = await user.find().count();
        return nextId;
    } catch (err) {
        console.log(err.message);
    }
};

const register = async function (req, res) {
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
        const userData = {
            name: req.body.name,
            user_id: await getNextId(),
            password: req.body.password,
            email_id: req.body.email_id,
            user_name: req.body.user_name,
            gender: req.body.gender,
            mobile_no: req.body.mobile_no,
            isPublic: false
        }
        const newUser = await user.create(userData);
        return res
            .status(201)
            .send({
                status: true,
                message: "User Created Successfully",
                data: newUser
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

const login = async function (req, res) {
    try {
        const loginCredentials = req.body;
        const errors = isValid(loginCredentials);
        if (errors.length) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: 'Bad request',
                    error: errors
                });
        }
        const { user_id } = await user
            .findOne({
                user_name: loginCredentials.user_name,
                password: loginCredentials.password
            })
        const token = sign({ user_id }, process.env.SECRET_KEY);
        return res
            .status(200)
            .send({
                status: true,
                message: "Login successful",
                data: token
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

const editProfile = async function (req, res) {
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

const follow = async function (req, res) {
    try {
        const followedUser = await user.findOneAndUpdate({
            user_id: req.params.userId
        }, {
            $inc: { followerCount: 1 },
            $addToSet: { followedBy: req.userId }
        }, {
            new: true
        });
        const follower = await user.findOneAndUpdate({
            user_id: req.userId
        }, {
            $inc: { followingCount: 1 },
            $addToSet: { follows: req.params.userId }
        }, {
            new: true
        });
        return res
            .status(200)
            .send({
                status: true,
                message: `${follower.name} started following ${followedUser.name}`
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

const unfollow = async function (req, res) {
    try {
        const followedUser = await user.findOneAndUpdate({
            user_id: req.params.userId
        }, {
            $inc: { followerCount: -1 },
            $pull: { followedBy: req.userId }
        }, {
            new: true
        });
        const follower = await user.findOneAndUpdate({
            user_id: req.userId
        }, {
            $inc: { followingCount: -1 },
            $pull: { follows: req.params.userId }
        }, {
            new: true
        });
        return res
            .status(200)
            .send({
                status: true,
                message: `${follower.name} unfollowed ${followedUser.name}`
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

const block = async function (req, res) {
    try {
        const updatedUser = await user.findOneAndUpdate({
            user_id: req.user_id
        }, {
            $addToSet: { blockedUsers: req.params.userId }
        }, {
            new: true
        });
        return res
            .status(200)
            .send({
                status: true,
                message: "User has been blocked"
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

const unblock = async function (req, res) {
    try {
        const updatedUser = await user.findOneAndUpdate({
            user_id: req.user_id
        }, {
            $pull: { blockedUsers: req.params.userId }
        }, {
            new: true
        });
        return res
            .status(200)
            .send({
                status: true,
                message: "User has been unblocked"
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

const profileDetails = async function (req, res) {
    try {
        const userProfile = await user.findOne({ user_id: req.params.userId });
        if (!userProfile) {
            return res
                .status(404)
                .send({
                    status: false,
                    message: "User not found.",
                });
        }
        let details = {
            name: userProfile.name,
            user_name: userProfile.user_name,
            followers: userProfile.followerCount,
            following: userProfile.followingCount
        }
        const userPosts = await post.find({ postedBy: req.user_id, isPublic: true });
        details['posts'] = userPosts.length;
        let filter = userPosts.reduce((set, curr) => set.add(curr._id), new Set());
        filter = { likedPosts: { $in: Array.from(filter) } };
        let likedBy = await user.aggregate([{
            $match: filter
        }]);
        details['likedBy'] = likedBy;
        return res
            .status(200)
            .send({
                status: true,
                message: "User details",
                data: details
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

module.exports = { register, login, editProfile, follow, unfollow, block, unblock, profileDetails };