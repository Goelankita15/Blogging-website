import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const ConnectDB = async () => {
    // If already connected, return the existing connection
    if (cached.conn) {
        return cached.conn;
    }

    // If no promise exists, create a new connection
    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        // Check if MONGODB_URI exists
        if (!process.env.MONGODB_URI) {
            throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
        }

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
            console.log("MongoDB connected successfully");
            return mongoose;
        }).catch((error) => {
            console.error("MongoDB connection error:", error);
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
}