const express = require('express');
const {getLikes, createLike, deleteLike} = require('../controllers/likeController.js');

const router = express.Router();

router.get('/', async (req, res) => {
    getLikes();
    res.send("The List Of Likes");
});

router.post('/create', async (req, res) => {
    const likeData = req.body;
    await createLike(likeData);
    res.send("Like created successfully");
});

router.delete('/delete', async (req, res) => {
    const { userId, postId } = req.body;
    await deleteLike(userId, postId);
    res.send("Like deleted successfully");
});

module.exports = router;