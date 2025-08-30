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
    const data = await createFollow(followingId, followerId);

    if(data) {
        res.json(data);
    }
    else {
        res.status(400).json({message:"Error Creating Follow!"});
    }
});

router.delete("/delete", async (req, res) => {
    const followData = req.body;
    const followerId = followData.follower;
    const followingId = followData.following;
    const data = await deleteFollow(followingId, followerId);

    if(data) {
        res.json({"Follow Deleted" : data});
    }
    else {
        res.status(400).json({message:"Error Deleting Follow!"});
    }
});

module.exports = router;