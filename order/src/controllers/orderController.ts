import { Request, Response, NextFunction } from "express"
import { Order } from "../database/models/Order"
import { produceOrderPlaceEvent } from "../event-bus/producers/order-created-producer";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, name, address, products } = req.body;
        const total = products?.reduce((a: number, b: { productId: string, price: number }) => a + b.price, 0);
        const order = await Order.create({
            user: {
                id: userId,
                name: name,
                address: address
            },
            products: products,
            total: total
        });
        await produceOrderPlaceEvent(order._id, userId, products);
        res
            .status(201)
            .json({
                success: true,
                message: "Order created successfully!"
            });
    } catch (error) {
        next(error);
    }
}