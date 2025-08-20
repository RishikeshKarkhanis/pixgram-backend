const express = require('express');
const {getFollows, createFollow, deleteFollow} = require('../controllers/follow.controller.js');

const router = express.Router();

router.get("/", async (req, res) => {
    getFollows();
    res.send("Get Follow Data");
});

router.post("/create", async (req, res) => {
    const followData = req.body;
    const followerId = followData.follower;
    const followingId = followData.following;
    await createFollow(followingId, followerId);

    res.send(`Follow created from user ${followerId} to user ${followingId}`);
});

router.delete("/delete", (req, res) => {
    const followData = req.body;
    const followerId = followData.follower;
    const followingId = followData.following;
    deleteFollow(followingId, followerId);

    res.send(`Follow deleted from user ${followerId} to user ${followingId}`);
});

module.exports = router;