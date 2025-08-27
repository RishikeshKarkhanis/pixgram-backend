const express = require('express');
const {getLikes, createLike, deleteLike} = require('../controllers/like.controller.js');

const router = express.Router();

router.get('/', async (req, res) => {
    getLikes();
    res.send("The List Of Likes");
});

router.post('/create', async (req, res) => {
    const likeData = req.body;
    const result = await createLike(likeData);
    res.json(result);
});

router.delete('/delete', async (req, res) => {
    const { userId, postId } = req.body;
    await deleteLike(userId, postId);
    res.send("Like deleted successfully");
});

module.exports = router;