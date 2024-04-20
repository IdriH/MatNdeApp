import { Orders } from "../db/schemas.js";

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
        console.log("^^^^^^^^^^^^^^^^^^" + pID)
       

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
    try{
        const newOrder = Orders(order);
        newOrder.save();
        return newOrder;
    }catch(err){
        console.error("Could not make order");
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