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

// Function to add a professional
export const addProfessional = async (professional) => {
    try {
        const newProfessional = Professionals(professional);
        await newProfessional.save();

        console.log('Professional added successfully');
    } catch (error) {
        console.error('Error adding professional:', error);
        throw error;
    }
};

// Function to modify a professional
export const modifyProfessional = async (professionalID, updatedFields) => {
    try {
        await Professionals.updateOne({ professionalID: professionalID }, updatedFields);

        console.log('Professional modified successfully');
    } catch (error) {
        console.error('Error modifying professional:', error);
        throw error;
    }
};

// Function to delete a professional
export const deleteProfessional = async (professionalID) => {
    try {
        await Professionals.deleteOne({ professionalID: professionalID });

        console.log('Professional deleted successfully');
    } catch (error) {
        console.error('Error deleting professional:', error);
        throw error;
    }
};
