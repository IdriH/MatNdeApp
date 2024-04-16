import {Reviews,Professionals} from   '../db/schemas.js'

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
        console.log("-------" + review.professionalID + review.score + review.reviewerName+ ""+ review.comment)
        const newReview = Reviews(review);
       
         // Fetch all reviews for the given professionalID to compute the new average
         const reviews = await Reviews.find({ professionalID: review.professionalID });

         // Compute the new average review score
         const averageScore = reviews.reduce((acc, { score }) => acc + score, 0) / reviews.length;
 
         // Update the professional's reviewScore with the new average
         await Professionals.findOneAndUpdate(
             { professionalID: review.professionalID },
             { reviewScore: averageScore },
             { new: true } // This option returns the updated document
         );
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
