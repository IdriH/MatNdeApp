import {Products} from '../db/schemas.js'




/*
    Retrieve all products 
    no need for authentication everybody can view the products 

*/

export const getProducts = async () => {
    try {
        const products = await Products.find();
        console.log(products)
        return products; // Simply return the products
    } catch (err) {
        console.error('Error: Could not retrieve products', err);
        throw err; // Rethrow the error to be caught in the calling function
    }
};
