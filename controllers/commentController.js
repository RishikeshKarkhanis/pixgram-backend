const Comment = require('../models/commentModel.js');

const getComments = async (req, res) => {
    const comments = await Comment.find({});
    console.log('Comments retrieved successfully:', comments);
};

const createComment = async (commentData) => {
    const result = await Comment.create(commentData);
    console.log('Comment created successfully:', result);
};

const deleteComment = async (commentId) => {
    const result = await Comment.deleteOne({ _id: commentId });
    if (result.deletedCount > 0) {
        console.log('Comment deleted successfully');
    } else {
        console.log('No comment found to delete');
    }
};

module.exports = {getComments, createComment, deleteComment};