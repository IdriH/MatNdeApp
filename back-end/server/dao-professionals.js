import { Professionals , Users } from "../db/schemas.js";
import bcrypt from 'bcrypt'
import mongoose from "mongoose";

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
/*
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
*/
/*
// Function to add a professional and simultaneously create a user
export const addProfessionalWithUser = async function(professionalData) {
    const session = await mongoose.startSession();
    console.log(professionalData)

    if (!professionalData.password) {
        throw new Error("Password is required");
    }

    try {
        session.startTransaction();
        
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hash = await bcrypt.hash(professionalData.password, salt); // Hash the password with the salt

        const newUser = new Users({
            username: professionalData.fullName,  // Ensure this data is provided
            role: 'professional',
            hash: hash,          // Hash should be computed beforehand
            salt: salt,         // Salt should be computed beforehand
        });
        const savedUser = await newUser.save({ session });

        const newProfessional = new Professionals({
            professionalID: savedUser._id,
            fullName: professionalData.fullName,
            dateOfBirth : professionalData.dateOfBirth,
            ShortDescription : professionalData.ShortDescription,
            reviewScore : 0,
            phoneNumber : professionalData.phoneNumber,
        });

        await newProfessional.save({ session });
        await session.commitTransaction();

        console.log('Professional and user added successfully');
        return { user: savedUser, professional: newProfessional };
    } catch (error) {
        await session.abortTransaction();
        console.error('Error adding professional and user:', error);
        throw error;
    } finally {
        session.endSession();
    }
};
*/
// Function to add a professional without using transactions
export const addProfessionalWithUser = async function(professionalData) {
    try {

        console.log(professionalData.profilePicture)
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hash = await bcrypt.hash(professionalData.password, salt); // Hash the password with the salt

        const newUser = new Users({
            username: professionalData.fullName,
            role: 'professional',
            hash: hash,
            salt: salt,
        });
        const savedUser = await newUser.save();

        const newProfessional = new Professionals({
            professionalID: savedUser._id,
            category : professionalData.category,
            fullName: professionalData.fullName,
            ShortDescription: professionalData.shortDescription,
            reviewScore: 0,
            phoneNumber: professionalData.phoneNumber,
            profilePicture: professionalData.profilePicture,
        });
        console.log(newProfessional.image + "DPDPDPDPDPDPDDPDPDPCDP")
        await newProfessional.save();

        console.log('Professional and user added successfully');
        return { user: savedUser, professional: newProfessional };
    } catch (error) {
        console.error('Error adding professional and user:', error);
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
        await Users.findByIdAndDelete(professionalID);

        console.log('Professional deleted successfully');
    } catch (error) {
        console.error('Error deleting professional:', error);
        throw error;
    }
};
