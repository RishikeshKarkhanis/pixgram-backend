const Follow = require('../models/follow.model.js');
const User = require('../models/user.model.js');

const getFollows = async () => {
    const follows = await Follow.find({});
    console.log('Follows retrieved successfully:', follows);
}

const createFollow = async (followingId, followerId) => {
    const result = await Follow.create({"follower": followerId, "following": followingId});

    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    console.log(`User ${follower.username} is now following ${following.username}`);
}

const deleteFollow = async (followingId, followerId) => {
    const result = await Follow.find({"follower": followerId, "following": followingId});
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);
    await Follow.deleteOne({"follower": followerId, "following": followingId});
    console.log(`User ${follower.username} is unfollowed ${following.username}`);
}

module.exports = {getFollows, createFollow, deleteFollow};