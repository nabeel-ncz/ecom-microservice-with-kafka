import mongoose from "mongoose";
export default async () => {
    try {
        await mongoose.connect(String(process.env.MONGO_URI));
        console.log('Database connected');
    } catch (error: any) {
        console.log(error?.message);
        throw new Error("Database connection failed!");
    }
}

