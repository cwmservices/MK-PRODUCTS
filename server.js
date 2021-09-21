require('dotenv').config();
const express = require('express');
const app = express();

const productRoutes = require('./productRoutes');

require('./db/conn');

const items = require('./Items');

const Products = require('./db/models/collections');

const PORT = process.env.PORT || 5000;

const importData = async () =>{
    try{
        await Products.deleteMany({});
        
        await Products.insertMany(items);

        console.log('data inserted');

    }
    catch(error){
      console.log(error);
    }
}

importData();

app.use(express.json());

app.use(productRoutes);

app.listen(PORT,(req,res)=>{
    console.log(`server running on port ${PORT}`)
})