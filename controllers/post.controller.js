const Post = require('../models/post.model.js');

const getPosts = async () => {
    const posts = await Post.find();
    console.log('Posts retrieved successfully:', posts);
    return posts;
}

const createPost = async (postData) => {
    const result = await Post.create(postData);
    console.log('Post created successfully:', result);
    return result
}

const deletePost = async (postId) => {
    const result = await Post.findByIdAndDelete(postId);
    if (result) {
        console.log('Post deleted successfully:', result);
        return result;
    } else {
        console.log('Post not found with ID:', postId);
        return null
    }
}

module.exports = { getPosts, createPost, deletePost };