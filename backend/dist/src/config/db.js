import mongoose from "mongoose";
export const connectDB = async () => {
    const uri = process.env.MONGODB_URI || "";
    if (!uri) {
        // eslint-disable-next-line no-console
        console.warn("MONGODB_URI not set in environment");
        return;
    }
    try {
        await mongoose.connect(uri);
        // eslint-disable-next-line no-console
        console.log("Connected to MongoDB");
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error("MongoDB connection error", err);
    }
};
