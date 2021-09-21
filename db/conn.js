require('dotenv').config();
const mongoose = require('mongoose');

dbURL = process.env.URL;

mongoose.connect(dbURL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log('Connection to database has been successful');
}).catch((err) =>{ 
    console.log(err)
});
