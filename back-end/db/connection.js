

import mongoose from "mongoose"
const url = 'secret';



const connectDb = async () => {
  try{
   await mongoose.connect(url, {dbName : "MatNdeFani"})
   console.log('MongoDB connected to:', mongoose.connection.db.databaseName);
  }
  catch(err){
  console.error('MongoDB connection error:', err);
};
}
export default connectDb;

/*
const connectDb = async () => {
    try {
      await mongoose.connect(url);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit the process with an error code
    }
  };
  */
  //export default connectDb;

/*
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = 'secret';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
const connectDb = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch(err){
    console.log(err)
  }
}
//connectDb().catch(console.dir);
export default connectDb;
*/
/*
  import { MongoClient } from "mongodb";
  // Replace the uri string with your connection string.
  //const uri = '';
  const uri = ""
  const client = new MongoClient(uri);
  async function run() {
    try {
      const database = client.db('MatNdeFani');
      const products = database.collection('products');
      // Query for a movie that has the title 'Back to the Future'
      
      const products1 = await products.findOne();
      console.log(products1);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  */
