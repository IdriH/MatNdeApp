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

export const addReview = async(review) =>{  
    try{
        const newReview = Reviews(review);
        newReview.save()
        console.log("Review saved successfully");
    }catch(err){
        console.log("Could not save review");
        throw err;
    }
}


export const deleteReview = async (reviewId) => {
    try {
        const result = await Reviews.deleteOne({ _id: reviewId });
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
