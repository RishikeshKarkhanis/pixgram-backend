const express = require('express');
const { createUser, getUsers, deleteUser, updateUser } = require('../controllers/user.controller.js');

const router = express.Router();

router.post('/register', async (req, res) => {
    const userData = req.body;
    createUser(userData);
    res.send("User registered successfully");
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