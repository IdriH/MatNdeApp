import { Professionals } from "../db/schemas.js";

export const getProfessionals = async () => {
    try{
        const professionals = await Professionals.find();
        return professionals;

    }catch(err){
        console.error('Error:Could not recieve professionals',err)
        throw err;
    }
}

export const getProfessional = async(pID) => {
    try{
        const professional = await Professionals.findOne({professionalID : pID});
        return professional;
    }catch(err){
        console.error("Error:Could not recieve professional",err);
        throw err;
    }
}

export const toggleStatus = async(pID) => {
    try {
        const professional = await Professionals.findOne({ professionalID: pID });
        if (!professional) {
            throw new Error("Professional not found");
        }
        
        // Toggle the availability status
        professional.available = !professional.available;

        // Save the updated professional document
        await professional.save();
        
        return professional;
    } catch (err) {
        console.error("Error toggling professional status:", err);
        throw err;
    }
}