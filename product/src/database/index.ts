import mongoose from "mongoose";
export default async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('Product service Database connected');
    } catch (error: any) {
        console.log(error?.message);
        throw new Error("Product service Database connection failed!");
    }
}

