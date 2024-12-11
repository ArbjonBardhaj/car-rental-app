const { findByIdAndDelete } = require("../models/carModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
//get all users

const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}


//get single user by id

const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Validate if userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      } 
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
//add a user

const addUser = async (req, res) => {
    const { username, email, password, image } = req.body;
    const newUser = new User({
        username,
        email,
        password,
        image
    });

    try {
        // Hash the password before saving the user
        newUser.password = await bcrypt.hash(password, 10);
        const user = await newUser.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: "this user already exists"});

    }
};

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

//login status

const loginStatus = (req, res) =>{
    res.status(200).json({message:"Login successful", user:req.User})

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
        let user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message:"User not found"});
        await User.findByIdAndDelete(req.params.id);
        res.json({message:"User deleted"});
    } catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}




//get single user data
// Only for testing purposes

const getUser = async (req,res) => {
    try {
        const User = await User.findById(req.params.id);
        res.json(User);
    }catch (error) {
        console.log(error).json({message:"Server Error"})
    }
}



module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    loginUser,
    loginStatus,
    getUser
}

