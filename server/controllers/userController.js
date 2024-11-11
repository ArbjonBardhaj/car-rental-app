const { findByIdAndDelete } = require("../models/carModel");
const User = require("../models/userModel");

//get all users

const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error).json({message:"Server Error"});
    }
}

//get single user by id

const getUserById = async (req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        console.log(error).json({message:"Server Error"});
    }
}

//add a user

const addUser = async (req, res) =>{
    const {username, email, password, image} = req.body;
    const newUser = new User({
        username,
        email,
        password,
        image
    })
    try {
        const user = await newUser.save()
        res.json(user);
    } catch (error) {
        console.log(error).json({message:"Server Error"});
    }
}

//update a user

const updateUser = async (req, res) =>{
    const {username, email, password, image} = req.body;
    const userFields = {};
    if(username) userFields.username = username;
    if(email) userFields.email = email;
    if(password) userFields.password = password;
    if(image) userFields.image = image;
    try {
        let User = await User.findById(req.params.id);
        if(!User) return res.status(404).json({message:"User not found"});
    } catch(error){
        console.log(error).json({message:"Server Error"});
    }
}


//delete a user 
const deleteUser = async (req, res) =>{
    try {
        let User = await User.findByid.req.params.id;
        if(!User) return res.status(404).json({message:"User not found"});
        await User.findByIdAndDelete(req.params.id);
        res.json({message:"User deleted"});
    } catch(error){
        console.log(error).json({message:"Server Error"});
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}

