import mongoose, { Schema, Types } from "mongoose";

const orderSchema = new Schema({
    user: {
        id: {
            type: Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        }
    },
    products: [
        {
            productId: Types.ObjectId,
            price: Number
        }
    ],
    total: {
        type: Number,
        default: 0
    }
});

export const Order = mongoose.model("orders", orderSchema);