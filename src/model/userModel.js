const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    user_id: {
        type: Number,
        unique: true
    },
    password: {
        type: String
    },
    email_id: {
        type: String,
        unique: true,
        lowercase: true
    },
    user_name: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"]
    },
    mobile_no: {
        type: Number,
        default: false
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    followedBy: [Number],
    followerCount: Number,
    follows: [Number],
    followingCount: Number,
    postCount: Number,
    likedPosts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'posts'
    }],
    blockedBy: [Number],
    blockedUsers: [Number],
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);