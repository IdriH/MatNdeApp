import { Bookings } from "../db/schemas.js";

export const getBookings = async (rpID) => {
    try{
        const bookings = await Bookings.find({professionalID : rpID});
        return bookings;
    }catch(err){
        console.error("Error:Could not retrieve bookings",err);
        throw err;
    }
}   