const express = require('express');
const { createUser, getUsers, deleteUser, updateUser, loginUser } = require('../controllers/user.controller.js');

const router = express.Router();

router.post('/register', async (req, res) => {
    const userData = req.body;
    createUser(userData);
    res.send("User registered successfully");
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
    updateUser(userId, userData);
    res.send("User updated successfully");
});

router.get('/', (req, res) => {
    getUsers();
    res.send("The List Of Users");
});

module.exports = router;