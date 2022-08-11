const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    user_id: {
        type: Number
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
    followedBy: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    }],
    followerCount: Number,
    follows: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    }],
    followingCount: Number,
    postCount: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);