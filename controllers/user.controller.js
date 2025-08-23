const User = require('../models/user.model.js');
const {v4: uuidv4} = require('uuid');
const { setUser, getUser } = require('../services/auth.js');

const getUsers = async () => {
    const users = await User.find();
    console.log('Users retrieved successfully:', users);
}

const createUser = async (userData) => {
    try {
        const result = await User.create(userData);
        console.log('User created successfully:', result);
        return result;
    }
    catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
    
}

const loginUser = async (req, res) => {
    const userData = req.body;
    const user = await User.findOne(userData);

    if (!user) {
        console.log('Login failed: Invalid credentials');
        return null;
    }

    const token = setUser( user);
    res.cookie('uid', token);

    console.log('Login successful for user:', user.username);
    return user;
}

const deleteUser = async (userId) => {
    const result = await User.findByIdAndDelete(userId);
    console.log('User deleted successfully:', result);
}

const updateUser = async (userId, userData) => {
    const result = await User.findByIdAndUpdate(userId, userData, { new: true });
    console.log('User updated successfully:', result);
    return result;
}

module.exports = { createUser, getUsers, deleteUser, updateUser, loginUser };