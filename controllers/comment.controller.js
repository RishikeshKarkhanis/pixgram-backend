const Comment = require('../models/comment.model.js');
const Post = require('../models/post.model.js');

const getComments = async (req, res) => {
    const comments = await Comment.find({});
    console.log('Comments retrieved successfully:', comments);
};

const createComment = async (commentData) => {
    const result = await Comment.create(commentData);
    console.log('Comment created successfully:', result);

    await Post.updateOne(
            { _id: commentData.postId },
            { $inc: { comments: 1 } }
        );

    return result;
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