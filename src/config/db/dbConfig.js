import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");    
    // const connection = mongoose.connection;
  } catch (error) {
    console.error("Database connection failed: ", error.message);
    process.exit(1);    
  }
}