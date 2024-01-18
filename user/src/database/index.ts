import mongoose from "mongoose";
export default async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('User service Database connected');
    } catch (error: any) {
        console.log(error?.message);
        throw new Error("User service Database connection failed!");
    }
}

