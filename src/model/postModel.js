const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postedBy: {
        type: Number
    },
    decription: {
        type: String
    },
    image: {
        data: Buffer,
        type: String
    },
    video: {
        data: Buffer,
        type: String
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    hashTag: [String],
    friendTag: [Number],
    likes: {
        type: Number,
        default: 0
    },
    comments: [String],
    isDleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model('posts', postSchema);