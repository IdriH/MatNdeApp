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
    professionalID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category : { 
        type : String,
        required: true,
    },
    fullName : {
        type: String,
        required: true
    },
    ShortDescription: {
        type: String,
        required: true,
        maxlength: 2000
    },
    available : {type: Boolean,default:true},
    reviewScore: {
        type: Number,
        set: v => Math.round(v * 10) / 10 // Round to 1 decimal place
    },
    phoneNumber:{type: String,required:true,maxlength:20},
    profilePicture: { type: String },
});

const reviews_model = new Schema({
    professionalID: { 
        type: String, 
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

/*maybe in v2
const availability_model = new Schema({
    professionalID: {
        type: Number,
        required: true
    },
    availability: [
        {
            date:{
                type: Date
            },
            timeslot: {
                type: String,
                required: true
            },
            occupied: {
                type: Boolean,
                default: false
            }
        }
    ]
});

export { availability_model };


const bookings_model = new Schema({
    professionalID: { type: Number, required: true }, // Add professionalID field
    timeSlot: { type: String, required: true },
    message: String,
    date :{type:Date , required: true},
    timeStamp: { type: Date, default: Date.now } // Add timeStamp field with default value
}, { timestamps: true });*/

const user_model = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'professional', 'user']  // Only these roles are valid
    },
    hash: {
        type: String,
        required: true  // Assuming hash must be stored for password handling
    },
    salt: {
        type: String,
        required: true  // Assuming salt must be stored for password handling
    }
});

//schema to add orderID,status
const order_model = new Schema({
    /*
    orderID: {

    },
    */
    professionalID: {
        type: String,
        required: true
    },
    // keeping both name and id even though they are both considered unique to not break the already working functions
    // with pID 
    professionalName: {
        type : String , 
        //required : true,
    },
    products: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    status: {
        type: String,
        enum: ['accepted', 'pending', 'declined'],
        default: 'pending' // Set 'pending' as the default status
    }
}, { timestamps: true });


const Products = mongoose.model("Products", products_model);
const Professionals = mongoose.model("Professionals", professionals_model);
const Reviews = mongoose.model("Reviews", reviews_model);
//const Availability = mongoose.model("Availability", availability_model);
//const Bookings = mongoose.model("Bookings", bookings_model);
const Users = mongoose.model("Users", user_model);
const Orders = mongoose.model("Orders", order_model);

export { Products, Professionals, Reviews, Users, Orders };
