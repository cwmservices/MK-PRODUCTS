require('dotenv').config();
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const stripe = require("stripe")(process.env.PRIVATE_KEY);
// const uuid = require("uuid");
// const bcrypt = require('bcryptjs');
const auth = require('./db/middleware/auth');

const Products = require('./db/models/collections');
const User = require('./db/models/usercollections');

router.use(cookieParser());


router.get('/products', async (req, res) => {
    try {
        const products = await Products.find({});

        res.json(products);

        console.log('data passed to front end');

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
})

router.post('/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const profession = req.body.profession;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if (!name || !email || !phone || !profession || !password || !cpassword) {
        return res.status(422).json({ "message": "Please fill all the fields" });
    }

    try {
        const check = await User.findOne({ email: email });
        if (check) {
            res.status(200).json({ "message": "Please try another email it is already exist" });
        }

        if (password === cpassword) {
            const userData = new User({
                name: name,
                email: email,
                phone: phone,
                profession: profession,
                password: password,
                cpassword: cpassword
            })

            await userData.generateAuthToken();
            await userData.save();

        } else {
            res.send("password are not matching");
        }

    } catch (error) {
        console.log(error);
    };
})

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        if (!email || !password) {
            return res.status(400).json({ "message": "Please fill all the required fields" })
        }

        const signInData = await User.findOne({ email: email });
        if (signInData) {
            // const isMatch = await bcrypt.compare(password, signInData.password);
            // console.log(isMatch);


            const token = await signInData.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 6000000),
                httpOnly: true
            });

            if (password != signInData.password) {
                res.status(400).json({ error: "Invalid credentials" });
            }
            else {
                res.json({ message: "signin successfully" });
            }
        }
        else {
            res.status(400).json({ error: "Invalid credential" });
        }

    } catch (error) {
        console.log(error);
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken');
    res.status(200).send('user logout');
})


router.post('/charge', (req, res) => {
    const { product, token } = req.body;
    // const idempontencyKey = uuid();

    return stripe.customers
        .create({
            email: token.email,
            source: token.id
        })
        .then(customer => {
            stripe.charges.create(
                {
                    amount: product.price,
                    currency: "usd",
                    customer: customer.id,
                    receipt_email: token.email,
                    description: `purchase of ${product.name}`,
                    // shipping: {
                    //     name: token.card.name,
                    //     address: {
                    //         country: token.card.address_country
                    //     }
                    // }
                },
                // { idempontencyKey }
            );
        })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
})

router.post('/contact',auth, async(req,res)=>{
    try{
        const {name,email,message} =req.body;

        if(!name || !email || !message){
            console.log('please fill the fields in contact page');
        }

        const contactUser = await User.findOne({_id:req.userId});

        if(contactUser){
            const userMessages = contactUser.addUserMessages(name,email,message);
            await contactUser.save();
            res.status(200).json({'message':'data send to database successfully'})
        }
    }catch(error){
        console.log(error);
    }
   
})

router.get('/contact',auth,(req,res)=>{
    res.send(req.rootUser);
})

module.exports = router;