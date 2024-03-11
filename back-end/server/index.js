'use strict';

const PORT = 3000;

import express from 'express'
import connectDb from '../db/connection.js'

import * as productsDao from './dao-products.js';


const app = express();

connectDb();


app.get('/',(req,res) =>{
    res.send('Hello World!');
})


app.get('/products', (req, res) => {
    productsDao.getProducts()
    .then(products => res.status(200).json({ data: products, message: "Retrieved List of Products" }))
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Error: Could not retrieve products' });
    });
});



app.listen(3000,() => console.log('server ready'));