'use strict';

const PORT = 3000;

import express from 'express'
import connectDb from '../db/connection.js'

import * as productsDao from './dao-products.js';
import * as professionalsDao from './dao-professionals.js';
import * as ordersDao from './dao-orders.js'
import * as bookingsDao from './dao-bookings.js'
import * as reviewsDao from './dao-reviews.js'

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

app.get('/professionals',(req,res) => {
    professionalsDao.getProfessionals()
    .then(professionals => res.status(200).json({data : professionals , message :"REtrieved List of Professionals"}))
    .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Error: Could not retrieve professionals'});
    })
})

app.get('/orders', (req,res) => {
    ordersDao.getOrders()
    .then(orders =>res.status(200).json({data : orders , message : "Retrieved List of Orders"}))
    .catch(err => {
        console.error(err)
        res.status(500).json({message : 'Error:Could not retrieve orders'});
    })
})
/*
app.post('/bookings',(req,res) => {
    console.log(req)
    console.log(req.params.professionalID)
    console.log(req.professionalID)
    bookingsDao.getBookings(req.params.professionalID)
    .then(bookings => res.status(200).json({data: bookings , message : "Retrieved the list of bookings for the specified professional"}))
    .catch(err => { 
        console.error(err)
        res.status(500),json({message : "Error: Could not retrieve the list of booking for the specified professional"})
    })

})*/

app.get('/professional/:professionalID' , (req,res)=> {

    console.log(req.params.professionalID)
    professionalsDao.getProfessional(req.params.professionalID)
    .then(professional => res.status(200).json({data: professional , message:"Successfully recieved professional"}))
    .catch(err => {
        console.error(err)
        res.status(500).json({message:'Error : Could not retrieve professional'});
    })
})

app.get('/reviews/:professionalID',(req,res)=>{
    console.log(req.params.professionalID)
    reviewsDao.getReviews(req.params.professionalID)
    .then(reviews => res.status(200).json({data: reviews,message : "Successfully retrieved reviews"}))
    .catch(err => {
        console.error(err);
        res.status(500).json({message : "Error:Could not retrieve reviews"});
    })
})



app.listen(3000,() => console.log('server ready'));