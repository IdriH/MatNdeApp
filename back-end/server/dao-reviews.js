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

export const addReview = async (review) => {
    try {
        console.log("-------" + review.professionalID + review.score + review.reviewerName + "" + review.comment);
        console.log("-------" + review);

        const newReview = new Reviews(review);
        await newReview.save();  // Save the review first

        console.log('Review saved successfully');

        // Fetch all reviews for the given professionalID to compute the new average
        const reviews = await Reviews.find({ professionalID: review.professionalID });

        if (reviews.length > 0) {
            // Compute the new average review score only if there are reviews
            const averageScore = reviews.reduce((acc, { score }) => acc + score, 0) / reviews.length;

            // Update the professional's reviewScore with the new average
            await Professionals.findOneAndUpdate(
                { professionalID: review.professionalID },
                { reviewScore: averageScore },
                { new: true } // This option returns the updated document
            );
        }

        console.log('Average review score updated successfully');
    } catch (err) {
        console.error("Could not save review:", err);
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
