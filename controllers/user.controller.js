const User = require('../models/user.model.js');

const getUsers = async () => {
    const users = await User.find();
    console.log('Users retrieved successfully:', users);
}

const createUser = async (userData) => {
    const result = await User.create(userData);
    console.log('User created successfully:', result);
}

const loginUser = async (req) => {
    const userData = req.body;
    const user = await User.findOne(userData);
    if (!user) {
        console.log('Login failed: Invalid credentials');
        return null;
    }
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
}

module.exports = { createUser, getUsers, deleteUser, updateUser, loginUser };