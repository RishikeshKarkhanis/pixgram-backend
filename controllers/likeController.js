const Like = require('../models/likeModel');

const getLikes = async () => {
    const likes = await Like.find({});
    console.log('Likes retrieved successfully:', likes);
}

const createLike = async (likeData) => {
    const result = await Like.create(likeData);
    console.log('Like created successfully:', result);
}

const deleteLike = async (userId, postId) => {
    const result = await Like.deleteOne({ userId, postId });
    if (result.deletedCount > 0) {
        console.log('Like deleted successfully');
    }
    else {
        console.log('No like found to delete');
    }
}

module.exports = {getLikes, createLike, deleteLike};