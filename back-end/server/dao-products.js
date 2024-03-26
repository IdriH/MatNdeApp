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

export const addProduct = async (productData) => {
    try {
        const newProduct = new Products(productData);
        await newProduct.save();
        return newProduct;
    } catch (err) {
        console.error("Could not add product:", err);
        throw err;
    }
};

// Function to update product quantity
export const updateProductQuantity = async (productName, newQuantity) => {
    try {
        const product = await Products.findOne({ name: productName });

        if (!product) {
            throw new Error('Product not found');
        }

        product.quantity = newQuantity;
        await product.save();

        console.log('Product     updated successfully');
    } catch (error) {
        console.error('Error updating product quantity:', error);
        throw error;
    }
};

// Function to delete a product
export const deleteProduct = async (productName) => {
    try {
        const product = await Products.findOneAndDelete({ name: productName });

        if (!product) {
            throw new Error('Product not found');
        }

        console.log('Product deleted successfully');
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// Function to update product inventory
export const updateProductInventory = async (products) => {
    try {
        for (const product of products) {
            const existingProduct = await Products.findOne({ name: product.name });
            if (!existingProduct) {
                throw new Error(`Product ${product.name} not found`);
            }

            // Check if there are enough products in inventory
            if (existingProduct.quantity < product.quantity) {
                throw new Error(`Insufficient quantity for product ${product.name}`);
            }

            // Update product quantity
            existingProduct.quantity -= product.quantity;
            await existingProduct.save();
        }
    } catch (error) {
        console.error('Error updating product inventory:', error);
        throw error;
    }
};


