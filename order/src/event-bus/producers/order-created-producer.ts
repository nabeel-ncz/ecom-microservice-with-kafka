import { producer } from "..";
import { Types } from "mongoose";

export const produceOrderPlaceEvent = async (orderId: Types.ObjectId, userId: string, products : {
    productId: string,
    price: number
}[]) => {
    try {
        await producer.connect();
        await producer.send({
            topic: "order-service-events",
            messages: [
                {
                    value: JSON.stringify({
                        eventType:'order-placed',
                        orderId,
                        userId,
                        products
                    })
                }
            ],
        });
    } catch (error) {
        throw new Error("Order place event producer failed!");
    } finally{
        await producer.disconnect()
    }
}