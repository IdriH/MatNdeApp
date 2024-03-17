'use strict';

const PORT = 3000;

import express from 'express'
import connectDb from '../db/connection.js'

import * as productsDao from './dao-products.js';
import * as professionalsDao from './dao-professionals.js';
import * as ordersDao from './dao-orders.js'
//import * as bookingsDao from './dao-bookings.js'
import * as reviewsDao from './dao-reviews.js'
//import * as availabilitiesDao from './dao-availabilities.js'

const app = express();
app.use(express.json())
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

app.post('/reviews/add',(req,res)=>{
    console.log(req.body);
    reviewsDao.addReview(req.body)
    .then(review => res.status(200).json({data:review,messge : "Successfully added review!"}))
    .catch(err =>{
        console.error(err);
        res.status(500).json({message:"Error:Could not retrieve review!"})
    })
})

//delete review for admin only
app.delete('/reviews/delete/:reviewId', async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const result = await reviewsDao.deleteReview(reviewId);
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error: Could not delete review' });
    }
});

app.get('/orders/:pID',async (req,res) => {
    const professionalID = req.params.pID;
    ordersDao.getOrdersForProfessional(professionalID)
    .then(orders => res.status(200).json({data : orders,message:"Orders for professional retrieved"}))
    .catch(err =>{
        console.error("Error:",err);
        res.status(500).json({message: "Error:Could not retrieve orders for professional"})
    })

});

app.get('/orders/:pID/:oID', async(req,res)=>{
    ordersDao.getOrderForProfessional(req.params.pID,req.params.oID)
    .then(order => res.status(200).json({data:order,message: "order retrieved successfully"}))
    .catch(err => {
        console.error('Error:',err)
        res.status(500).json({message:"Error:Could not retrieve specific order"})
    })
})

app.post('/orders/add',async(req,res) => {
    ordersDao.addOrder(req.body)
    .then(order => res.status(200).json({data: order, message:"Order added successfully"}))
    .catch(err =>{
        console.error("Error:",err)
        res.status(500).json({message:"Error:Could not make order!"})
    })
})

app.delete('/orders/delete/:orderID', async (req, res) => {
    const orderID = req.params.orderID;
    ordersDao.deleteOrder(orderID)
        .then(() => res.status(200).json({ message: "Order deleted successfully" }))
        .catch(err => {
            console.error("Error:", err)
            res.status(500).json({ message: "Error: Could not delete order" })
        });
});

app.put('/orders/modify/:orderID', async (req, res) => {
    const orderID = req.params.orderID;
    const { products } = req.body;
    ordersDao.modifyOrder(orderID, products)
        .then(order => res.status(200).json({ data: order, message: "Order modified successfully" }))
        .catch(err => {
            console.error("Error:", err)
            res.status(500).json({ message: "Error: Could not modify order" })
        });
});

app.get('/professionals/status/:pID',async(req,res) => {
    professionalsDao.toggleStatus(req.params.pID)
    .then(professional => res.status(200).json({data:professional,message:"Toogled status for professional"}))
    .catch(err => { 
        console.error("error:",err);
        res.status(500).json({message:"Error:Could not toggle status"});
    })
})












/*availability slots canceled maybe done in v2
app.get('/availability/:professionalID',(req,res) => {
availabilitiesDao.getAvailability(req.params.professionalID)
.then(availability => res.status(200).json({data:availability , message:"Successfully retrieved availabilities"}))
.catch(err => {
    console.error(err);
    res.status(500).json({message: "Error:Could not retrieve availability"})
})
})
*/


app.listen(3000,() => console.log('server ready'));