const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption : { type: String },
    imageUrl: { type: String, required: true, default: 'default' },
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Post', postSchema);