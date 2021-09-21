require("dotenv").config();
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    messages: [{
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// userschema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//         this.cpassword = await bcrypt.hash(this.cpassword, 10);
//     }
//     next();
// })

userschema.methods.generateAuthToken = async function () {
    try{
        const token = await jwt.sign({ _id: this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }catch(error){
        console.log(error);
    }
}

userschema.methods.addUserMessages = async function(name, email, message){
    this.messages = this.messages.concat({ name, email, phone, message });
    return this.messages;
}

const User = mongoose.model('USER', userschema);
module.exports = User;


