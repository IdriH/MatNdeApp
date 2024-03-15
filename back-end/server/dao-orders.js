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