const express = require('express');
const { createUser, getUsers, deleteUser, updateUser, loginUser } = require('../controllers/user.controller.js');
const { getUser } = require('../services/auth.js');
const User = require('../models/user.model.js');

const router = express.Router();

router.get('/currentUser', async (req, res) => {
    const token = req.cookies.uid;

    const user = getUser(token);
    if (!user) {
        return res.status(401).send({ "error": "Unauthorized" });
    }
    const data = await User.findById(user._doc._id);
    res.json(data);
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
    deleteUser(userId);
    res.send("User deleted successfully");
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