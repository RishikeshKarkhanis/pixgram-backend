const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    following: { type:Number, default: 0 },
    followers: { type:Number, default: 0 },
    profilePicture: { type: String },
    bio: { type: String, default: '' }
});

module.exports = mongoose.model('User', userSchema); // ✅ model exported