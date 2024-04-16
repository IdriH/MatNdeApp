import mongoose, { Schema } from "mongoose";

const products_model = new Schema({
    //to be added id 
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
    category : { 
        type : String,
        required: true,
    },
    fullName : {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    ShortDescription: {
        type: String,
        required: true,
        maxlength: 2000
    },
    available : {type: Boolean,default:true},
    reviewScore: Number,
    phoneNumber:{type: String,required:true,maxlength:20}
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
    password: {
        type: String,
        required: true
    },
    refreshToken: String,
    role: { type: String, required: true }
});

//schema to add orderID,status
const order_model = new Schema({
    /*
    orderID: {

    },
    */
    professionalID: {
        type: Number,
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
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
