'use strict';

const PORT = 3000;

import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
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

const accessLogStream = fs.createWriteStream(path.join('./', 'access.log'), { flags: 'a' });

// Save log entries to a file
app.use(morgan('combined', { stream: accessLogStream }));


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
    console.log(req.params.name)
    reviewsDao.getReviews(req.params.professionalID)
    .then(reviews => res.status(200).json({data: reviews,message : "Successfully retrieved reviews"}))
    .catch(err => {
        console.error(err);
        res.status(500).json({message : "Error:Could not retrieve reviews"});
    })
})

app.post('/reviews/add',(req,res)=>{
   console.log(req.body)
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

app.get('/orders/professionals/:pID',async (req,res) => {
    const professionalID = req.params.pID;
    console.log("%%%%%%%%%%%%0" + professionalID)
    ordersDao.getOrdersForProfessional(professionalID)
    .then(orders => res.status(200).json({data : orders,message:"Orders for professional retrieved"}))
    .catch(err =>{
        console.error("Error:",err);
        res.status(500).json({message: "Error:Could not retrieve orders for professional"})
    })

});

app.get('/orders/professionals/:pID/:oID', async(req,res)=>{
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

app.post('/products/add', async (req, res) => {
    productsDao.addProduct(req.body)
        .then(product => res.status(200).json({ data: product, message: "Product added successfully" }))
        .catch(err => {
            console.error("Error:", err);
            res.status(500).json({ message: "Error: Could not add product" });
        });
});

// Route to modify product by ID
app.put('/products/modify/:id', async (req, res) => {
    console.log('called route')
    const { id } = req.params;
    const updateData = req.body; // Get update data from request body

    try {
        const updatedProduct = await productsDao.updateProduct(id, updateData);
        if (updatedProduct) {
            res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});


// Route to delete a product
app.delete('/products/delete', async (req, res) => {
    try {
        const productName = req.body.name;

        await productsDao.deleteProduct(productName);
        
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' });
    }
});

// Route to add a professional
app.post('/professionals/add', async (req, res) => {
    try {
        const newProfessional = req.body;

        await professionalsDao.addProfessional(newProfessional);
        
        res.status(200).json({ message: 'Professional added successfully' });
    } catch (error) {
        console.error('Error adding professional:', error);
        res.status(500).json({ message: 'Error adding professional' });
    }
});

// Route to modify a professional
app.put('/professionals/modify', async (req, res) => {
    try {
        const professionalID = req.body.professionalID;
        const updatedFields = req.body;

        await professionalsDao.modifyProfessional(professionalID, updatedFields);
        
        res.status(200).json({ message: 'Professional modified successfully' });
    } catch (error) {
        console.error('Error modifying professional:', error);
        res.status(500).json({ message: 'Error modifying professional' });
    }
});

// Route to delete a professional
app.delete('/professionals/delete/:professionalID', async (req, res) => {
    try {
        const professionalID = req.params.professionalID;

        await professionalsDao.deleteProfessional(professionalID);
        
        res.status(200).json({ message: 'Professional deleted successfully' });
    } catch (error) {
        console.error('Error deleting professional:', error);
        res.status(500).json({ message: 'Error deleting professional' });
    }
});

// Route to get a specific order by ID
app.get('/orders/:orderID', async (req, res) => {
    try {
        const orderID = req.params.orderID;

        const order = await ordersDao.getOrderById(orderID);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ data: order, message: 'Order retrieved successfully' });
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ message: 'Error retrieving order' });
    }
});

// Route to accept an order by ID
app.put('/orders/accept/:orderID', async (req, res) => {
    try {
        
        const orderID = req.params.orderID;
        const accepted = req.body.accepted;

        console.log(orderID)

        // Check if order exists
        const order = await ordersDao.getOrderById(orderID);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order has already been accepted
        if (order.accepted) {
            return res.status(400).json({ message: 'Order has already been accepted' });
        }

        // Update the order with the accepted status
        await ordersDao.acceptOrder(orderID, accepted);

        // Update product inventory
        await productsDao.updateProductInventory(order.products);

        res.status(200).json({ message: 'Order accepted successfully' });
    } catch (error) {
        console.error('Error accepting order:', error);
        res.status(500).json({ message: 'Error accepting order' });
    }
});















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