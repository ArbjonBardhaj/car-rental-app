const mongoose = require("mogoose");

const tokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,   
        ref: "User"
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 7300,
    },
});


const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;