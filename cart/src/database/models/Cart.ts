import mongoose, { Schema, Types } from "mongoose";

const cartSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
    },
    products: [
        {
            productId: {
                type: Types.ObjectId,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        default: 0,
    }
});

export const Cart = mongoose.model("carts", cartSchema);