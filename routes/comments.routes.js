const express = require('express');
const {getComments, createComment, deleteComment} = require('../controllers/commentController.js');

const router = express.Router();

router.get("/", (req, res) => {
    getComments();
    res.send("Get all comments");
});

router.post("/create", (req, res) => {
    const commentData = req.body;
    createComment(commentData);
    res.send("Create a new comment");
});

router.delete("/delete/:id", (req, res) => {
    const commentId = req.params.id;
    deleteComment(commentId);
    res.send(`Delete comment with ID: ${commentId}`);
});

module.exports = router;