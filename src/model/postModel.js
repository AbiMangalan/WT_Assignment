const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
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
    friendtag: [Number],
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [Number],
    comments: [String]
}, {
    timestamps: true
}
);

module.exports = mongoose.model('posts', postSchema);