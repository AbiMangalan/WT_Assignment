const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
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
    friendtag: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    }],
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    }],
    comments: [String]
}, {
    timestamps: true
}
);

module.exports = mongoose.model('posts', postSchema);