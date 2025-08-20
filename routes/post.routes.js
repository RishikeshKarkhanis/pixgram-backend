const express = require('express');
const { getPosts, createPost, deletePost } = require('../controllers/post.controller.js');
const { route } = require('./user.routes');

const router = express.Router();

router.get('/', (req, res) => {
    getPosts();
    res.send("The List Of Posts");
});

router.post('/create', async (req, res) => {
    const postData = req.body;
    await createPost(postData);
    res.send("Post created successfully");
});

router.delete('/delete/:id', async (req, res) => {
    const postId = req.params.id;
    await deletePost(postId);
    res.send("Post deleted successfully");
});

module.exports = router;