import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`db connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("db connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
