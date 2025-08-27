const express = require('express');
const {getComments, createComment, deleteComment} = require('../controllers/comment.controller.js');

const router = express.Router();

router.get("/", (req, res) => {
    getComments();
    res.send("Get all comments");
});

router.post("/create", async (req, res) => {
    const commentData = req.body;
    const result = await createComment(commentData);
    res.json(result);
});

router.delete("/delete/:id", (req, res) => {
    const commentId = req.params.id;
    deleteComment(commentId);
    res.send(`Delete comment with ID: ${commentId}`);
});

module.exports = router;