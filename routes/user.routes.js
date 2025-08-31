const express = require('express');
const { createUser, getUsers, deleteUser, updateUser, loginUser } = require('../controllers/user.controller.js');
const { getUser } = require('../services/auth.js');
const User = require('../models/user.model.js');

const router = express.Router();

router.get('/currentUser', async (req, res) => {
    const token = req.cookies.uid;

    const user = getUser(token);
    console.log(user);
    
    if (!user) {
        return res.status(401).send({ "error": "Unauthorized" });
    }
    const data = await User.findById(user._doc._id);

    if(!data) {
        res.clearCookie("uid");
        return res.status(401).json({ message: "User not found, please login again" });
    }

    res.json(data);
});

router.get('/getuserbyid/:id', async (req, res) => {
    const uid = req.params.id;
    const user = await User.find({_id:uid});
    res.json(user[0]);
});

router.get('/getid/:username', async (req, res) => {
    const username = req.params.username;
    const user = await User.find({username});
    console.log(user[0]._id);
    
    res.json({"uid":user[0]._id});
});

router.post('/register', async (req, res) => {
    const userData = req.body;
    const user = await createUser(userData);
    if (user === null) {
        return res.status(400).send({ "error": "User creation failed" });

    } else {
        res.status(201).send(user);
    }
});

router.post('/login', async (req, res) => {

    const user = await loginUser(req, res);

    if (user === null) {
        return res.status(401).send("Login failed: Invalid credentials");
    }

    res.send(`Login successful for user: ${user}`);

});

router.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;
    const result = deleteUser(userId);
    res.json(result);
});

router.put('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    const out = await updateUser(userId, userData);
    res.json(out);
});

router.post('/logout', async (req, res) => {
    res.clearCookie("uid");
    res.status(200).json({ message: "Logged out successfully" });
    console.log("user logged out!");
    
});

router.get('/', (req, res) => {
    getUsers();
    res.send("The List Of Users");
});

module.exports = router;