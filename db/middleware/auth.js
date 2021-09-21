require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/usercollections');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifyToken._id , "tokens.token":token });
        if (!rootUser) { throw new Error('This is invalid user') };

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send('Unathorized user');
        console.log(error);
    }
}

    module.exports = auth;