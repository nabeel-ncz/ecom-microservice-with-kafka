import { Request, Response, NextFunction } from "express";
import { Cart } from "../database/models/Cart";

export const addItemToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, productId, price } = req.body;
        const cartExist = await Cart.findOne({ userId });

        if (cartExist) {
            await cartExist.updateOne({ $pull: { products: { productId, price } } })
            await cartExist.save();
        } else {
            await Cart.create({
                userId,
                products: [{
                    productId,
                    price
                }],
                total: price
            });
        }

        res.status(201).json({
            success: false,
            data: {}
        });
    } catch (error) {
        next(error);
    }
}

export const getCartItems = async (req: Request, res: Response, next: NextFunction) => {
    
}