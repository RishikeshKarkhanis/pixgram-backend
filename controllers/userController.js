const User = require('../models/userModel');

const getUsers = async () => {
    const users = await User.find();
    console.log('Users retrieved successfully:', users);
}

const createUser = async (userData) => {
    const result = await User.create(userData);
    console.log('User created successfully:', result);
}

const deleteUser = async (userId) => {
    const result = await User.findByIdAndDelete(userId);
    console.log('User deleted successfully:', result);
}

const updateUser = async (userId, userData) => {
    const result = await User.findByIdAndUpdate(userId, userData, { new: true });
    console.log('User updated successfully:', result);
}

module.exports = { createUser, getUsers, deleteUser, updateUser };