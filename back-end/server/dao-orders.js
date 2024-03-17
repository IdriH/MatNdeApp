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

export const getOrdersForProfessional = async(pID) =>{
    try{
        const orders = await Orders.find({professionalID : pID});
        return orders ;

    }catch(err){
        console.error("Could not retrieve orders for professional");
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
