import mongoose from "mongoose"

const url = 'mongodb://localhost:27017/MatNdeFani';


const connectDb = async () => {
    try {
      await mongoose.connect(url);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit the process with an error code
    }
  };
  
  export default connectDb;
