const express = require('express');
const { getPosts, createPost, deletePost } = require('../controllers/post.controller.js');
const User = require('../models/user.model.js');
const Follow = require('../models/follow.model.js');
const Post = require('../models/post.model.js');
const Like = require('../models/like.model.js');


const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await getPosts();
    res.json(posts);
});

router.get('/feed/:id', async (req, res) => {
    try {
        const uid = req.params.id;
        const following = await Follow.find({ follower: uid }).select('following -_id');
        const followingIds = following.map(f => f.following);

        const posts = await Post.find({ postedBy: { $in: followingIds } })
            .populate('postedBy', 'username profilePicture')
            .sort({ createdAt: -1 });

        const postsWithHasLiked = await Promise.all(
            posts.map(async (post) => {
                const hasLiked = await Like.exists({
                    postId: post._id,
                    userId: uid
                });

                return {
                    ...post,
                    hasLiked: !!hasLiked   // 👈 frontend can now use this
                };
            })
        );

        res.json(posts);
    } 
    
    catch (error) {
        res.json({ "error": error.message } );
    }
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