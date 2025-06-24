import mongoose from "mongoose";
export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://ankita:ankita123@cluster0.izwawhx.mongodb.net/blog-app');
    console.log("MongoDB connected successfully");
}