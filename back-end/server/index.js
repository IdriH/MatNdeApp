'use strict';

const PORT = 3000;

import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import connectDb from '../db/connection.js'
import crypto from 'crypto'
import session from 'express-session'
import passport from 'passport';
import LocalStrategy from 'passport-local'

import multer from 'multer'

import * as productsDao from './dao-products.js';
import * as professionalsDao from './dao-professionals.js';
import * as ordersDao from './dao-orders.js'
//import * as bookingsDao from './dao-bookings.js'
import * as reviewsDao from './dao-reviews.js'
//import * as availabilitiesDao from './dao-availabilities.js'
import * as usersDao from './dao-users.js'

const app = express();

app.use(express.json())
app.use('/uploads',express.static('uploads'))
connectDb();

const accessLogStream = fs.createWriteStream(path.join('./', 'access.log'), { flags: 'a' });

// Save log entries to a file
app.use(morgan('combined', { stream: accessLogStream }));

// Set up multer storage for storing profile pictures
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Set the destination folder for storing uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // Use the original filename for storing the file
    }
  });
  
  const upload = multer({ storage: storage });


/*** Passport ***/

/** Authentication-related imports **/
//const passport = require('passport');                              // authentication middleware
//const LocalStrategy = require('passport-local');                   // authentication strategy (username and password)

/** Set up authentication strategy to search in the DB a user with a matching password.
 * The user object will contain other information extracted by the method userDao.getUser 
 **/
passport.use(new LocalStrategy(async function verify(username, password, callback) {
  const user = await usersDao.getUser(username, password)
  if(!user)
    return callback(null, false, 'Incorrect username or password');  
    
  return callback(null, user); 
}));

// Serializing in the session the user object given from LocalStrategy(verify).
passport.serializeUser(function (user, callback) { 
  callback(null, user);
});

// Starting from the data in the session, we extract the current (logged-in) user.
passport.deserializeUser(function (user, callback) { 
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
  // e.g.: return userDao.getUserById(id).then(user => callback(null, user)).catch(err => callback(err, null));

  return callback(null, user); // this will be available in req.user
});

/** Creating the session */
// Function to generate a random secret for session
function generateSecret() {
    return crypto.randomBytes(64).toString('hex'); // Generates a random key of 64 bytes long
  }
  
  const sessionSecret = generateSecret(); // Store this securely and use as your session secret



app.use(session({
  secret: sessionSecret,  // Use the generated secret here
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.authenticate('session'));


/** Defining authentication verification middleware **/
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.get('/',(req,res) =>{
    res.send('Hello World!');
})

// POST /api/sessions 
// This route is used for performing login.
app.post('/api/sessions', function(req, res, next) {
    passport.authenticate('local', (err, user, info) => { 
      if (err)
        return next(err);
        if (!user) {
          // display wrong login messages
          return res.status(401).json({ error: info});
        }
        // success, perform the login and extablish a login session
        req.login(user, (err) => {
          if (err)
            return next(err);
          
          // req.user contains the authenticated user, we send all the user info back
          // this is coming from userDao.getUser() in LocalStratecy Verify Fn
          return res.json(req.user);
        });
    })(req, res, next);
  });
  
  // GET /api/sessions/current
  // This route checks whether the user is logged in or not.
  app.get('/api/sessions/current', (req, res) => {
    if(req.isAuthenticated()) {
      res.status(200).json(req.user);}
    else
      res.status(401).json({error: 'Not authenticated'});
  });
  
  // DELETE /api/session/current
  // This route is used for loggin out the current user.
  app.delete('/api/sessions/current', (req, res) => {
    req.logout(() => {
      res.status(200).json({});
    });
  });
  
  


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

app.get('/orders',isLoggedIn, (req,res) => {
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
        res.status(500).json({message:"Error:Could not save review!", error : err.message})
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
    console.log(req.params.pID)
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
    console.log(JSON.stringify(req.body) + '==============')
    ordersDao.addOrder(req.body)
    .then(order => res.status(200).json({data: order, message:"Order added successfully"}))
    .catch(err =>{
        console.error("Error:",err)
        res.status(500).json({message:"Error:Could not make order!",error : err.message})
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
            // Ensuring that the detailed error message is sent to the client
            res.status(400).json({ message: "Error: Could not add product", error: err.message });
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


app.delete('/products/delete/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        await productsDao.deleteProduct(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' });
    }
});

// Route to add a professional
/*
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
*/
// Route to add a professional
app.post('/professionals/add', upload.single('profilePicture'), async (req, res) => {
    try {
        
        
        
        console.log(req.file)
        console.log(req.body);
        const newProfessional = req.body;
        if (req.file) {
            newProfessional.profilePicture = req.file.path;  // Using `path` instead of `filename` if you want the full path
        }
        

        const result = await professionalsDao.addProfessionalWithUser(newProfessional);

        res.status(200).json({ message: 'Professional added successfully', data: result });
    } catch (error) {
        console.error('Error adding professional:', error);
        res.status(500).json({ message: 'Error adding professional', error: error.message });
    }
});



// Route to modify a professional
app.put('/professionals/modify', async (req, res) => {
    try {
        const professionalID = req.body.professionalID;
        const updatedFields = req.body;
        console.log(professionalID + "@@@@@@@@@@@@");
        console.log(updatedFields+ "@@@@@@@@@@@@@@");

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

/*
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
*/
// Route to accept an order
app.put('/orders/accept/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await ordersDao.updateOrderStatus(orderId, 'accepted');
        res.status(200).json({ data: updatedOrder, message: 'Order accepted successfully' });
    } catch (error) {
        console.error('Error accepting order:', error);
        // Make sure to send the error message text, not the error object
        console.log(error + "EEEEEEEEEEERRR")
        console.log(error.message + "MMMMMMMMMMMMMMMM")
        res.status(409).json({ message: 'Error accepting order', error: error.message });
    }
});
// Route to decline an order
app.put('/orders/decline/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await ordersDao.updateOrderStatus(orderId, 'declined');
        res.status(200).json({ data: updatedOrder, message: 'Order declined successfully' });
    } catch (error) {
        console.error('Error declining order:', error);
        res.status(500).json({ message: 'Error declining order' });
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