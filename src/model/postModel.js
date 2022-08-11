const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    decription: {
        type: String
    },
    image: {
        data: Buffer,
        type: String
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    hashTag: [String],
    friendtag: [String],
    likes: Number,
    likedBy: [{ type: mongoose.SchemaTypes.ObjectId }],
    comments: [String]
}, {
    timestamps: true
}
);

module.exports = mongoose.model('posts', postSchema);