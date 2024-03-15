import {Reviews} from   '../db/schemas.js'

export const getReviews = async(pID) => { 
    try{
        const reviews = Reviews.find({professionalID : pID});
        return reviews;
    }catch(err){
        console.error('Error: Cannot get reviews',err);
        throw(err);
    }
}