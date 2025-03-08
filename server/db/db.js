import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionString = `${process.env.MONGODB_URI}`;
    const connectionInstance = await mongoose.connect(connectionString);
    console.log(`mongodb connected!! DB HOST: ${connectionInstance.connection.host}`);
    
  } catch (error) {
    console.log("mongo db connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;