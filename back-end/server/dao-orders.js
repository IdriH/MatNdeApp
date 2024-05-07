import { Orders,Professionals,Products } from "../db/schemas.js";
import mongoose from "mongoose";

export const getOrders = async () =>{
    try{
        const orders = await Orders.find();
        return orders;
    }catch(err){
        console.error("Error:Could not retrieve Orders",err)
        throw err;
    }
}

export const getOrdersForProfessional = async(pID) => {
    try {
        //console.log("^^^^^^^^^^^^^^^^^^" + pID)
       

        const orders = await Orders.find({ professionalID: pID });
        return orders;

    } catch (err) {
        console.error("Could not retrieve orders for professional", err);
        throw err;
    }
}

export const getOrderForProfessional = async(pId,OId) => { 
    try{
        const order = await Orders.find({professionalID:pId,_id : OId})
        return order;
    }catch(err){
        console.error("Could not retrieve the specific order")
        throw err;
    }
}

export const addOrder = async(order) => {
    try {
        // Find the professional by ID to get the fullName
        const professional = await Professionals.findOne({ professionalID: order.professionalID });
        //console.log(professional);
        if (!professional) {
            throw new Error('Professional not found');
        }

        // Attach professional's fullName to the order
        const orderWithProfessionalName = {
            ...order,
            professionalName: professional.fullName
        };

        //console.log(orderWithProfessionalName)

        // Create a new order with the fullName and other details
        const newOrder = new Orders(orderWithProfessionalName);

        // Validate and save the new order
        await newOrder.save();

        return newOrder;
    } catch (err) {
        console.error("Could not make order", err);
        throw err;
    }
}

export const deleteOrder = async (orderID) => {
    try {
        await Orders.findByIdAndDelete(orderID);
    } catch (err) {
        console.error("Could not delete order");
        throw err;
    }
}

export const modifyOrder = async (orderID, products) => {
    try {
        const order = await Orders.findById(orderID);
        if (!order) throw new Error("Order not found");

        // Update products and quantities
        products.forEach(({ name, quantity }) => {
            const existingProductIndex = order.products.findIndex(p => p.name === name);
            if (existingProductIndex !== -1) {
                // Update quantity if product already exists
                order.products[existingProductIndex].quantity += quantity;
            } else {
                // Add new product if it doesn't exist
                order.products.push({ name, quantity });
            }
        });

        // Save the modified order
        await order.save();
        return order;
    } catch (err) {
        console.error("Could not modify order");
        throw err;
    }
}

// Function to get a specific order by ID
export const getOrderById = async (orderID) => {
    try {
        const order = await Orders.findById(orderID);

        return order;
    } catch (error) {
        console.error('Error retrieving order by ID:', error);
        throw error;
    }
};
/*
// Function to accept an order by ID
export const acceptOrder = async (orderID, accepted) => {
    try {
        await Orders.findByIdAndUpdate(orderID, { accepted: accepted });
    } catch (error) {
        console.error('Error accepting order:', error);
        throw error;
    }
};
*/

/*
// Function to update order status
export const updateOrderStatus = async (orderId, status) => {
    try {
        const updatedOrder = await Orders.findByIdAndUpdate(
            orderId,
            { $set: { status: status } },
            { new: true }
        );
        if (!updatedOrder) {
            throw new Error('Order not found');
        }
        return updatedOrder;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};
*/
export const updateOrderStatus = async (orderId, status) => {
    try {
        const order = await Orders.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }

        if (status === 'accepted') {
            // Check inventory for each product before updating order status
            for (const product of order.products) {
                const existingProduct = await Products.findOne({ name: product.name });
                if (!existingProduct) {
                    throw new Error(`Product not found: ${product.name}`);
                }
                if (existingProduct.quantity < product.quantity) {
                    throw new Error(`Not enough quantity for product: ${product.name}`);
                }
            }

            // If inventory is sufficient, update the quantity for each product
            for (const product of order.products) {
                const existingProduct = await Products.findOne({ name: product.name });
                const newQuantity = existingProduct.quantity - product.quantity;
                await Products.updateOne({ name: product.name }, { $set: { quantity: newQuantity } });
            }
        }

        // Update order status only if all checks pass
        const updatedOrder = await Orders.findByIdAndUpdate(orderId, { $set: { status: status } }, { new: true });
        return updatedOrder;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error; // Rethrow the error to be caught and handled by the route
    }
};