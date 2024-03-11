import mongoose, { Schema } from "mongoose";

const products_model = new Schema({

    name : {
        type: String,
        required : true,
        unique : true
    },
    category: {
        type: String,
        required: true
    },
    distributor: {
        type: String,
    
    },
    manufacturer: {
        type: String,
        
    },
    origin: {
        type: String,
        
    },
    priceBought: {
        type: Number, 
        required: true
    },
    priceSold: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const professionals_model = new Schema({
    professionalID : {
        type : Number,
        required :true
    },
    fullName : {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    ShortDescription: {
        type: String,
        required: true,
        maxlength: 2000
    },
    reviewScore: Number
});

const reviews_model = new Schema({
    professionalID: { 
        type: Number, 
        required: true 
    },
    score: {
         type: Number,
          required: true 
        },
    reviewerName: { type: String, required: true },
    comment: {
        type :String, 
         max: 1000
    }
});

const availability_model = new Schema({
    professionalID: {
        type: Number,
        required: true
    },
    occupied_timeslots: {
        type: [String],
        required: true
    } // Assuming this is an array of strings
});

const bookings_model = new Schema({
    professionalID : Number,
    timeSlot: { type: Number, required: true },
    message: String,
    
},{timestamps: true}); //mongo will add createdAt and updatedAttimestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

const user_model = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String,
    role: { type: String, required: true }
});

const order_model = new Schema({

    professional: {
        type: String,
        required: true
    },
    items: {
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }
});

const Products = mongoose.model("Products", products_model);
const Professionals = mongoose.model("Professionals", professionals_model);
const Reviews = mongoose.model("Reviews", reviews_model);
const Availability = mongoose.model("Availability", availability_model);
const Bookings = mongoose.model("Bookings", bookings_model);
const Users = mongoose.model("Users", user_model);
const Orders = mongoose.model("Orders", order_model);

export { Products, Professionals, Reviews, Availability, Bookings, Users, Orders };
