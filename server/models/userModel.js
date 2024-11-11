const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"please enter a username"],
    },
    email:{
        type: String,
        required: [true,"please enter an email"],
        unique: true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid emaial",]        
    },
    password:{
        type: String,
        required: [true,"please enter a password"],
        minlength: 8,
    },
    image:{
        type: String,
        required: [true, "plesae enter an image"],
    }
});


//hash password before saving
userSchema.pre("save", async function(next){
    if(!this.isModified("pasword")){
        next();
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model("User", useerSchema)

module.exports = User;