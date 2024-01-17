import { Request, Response } from "express";
import { produceEvent } from "../event-bus";

export const sendMessageToKafka = async (req: Request, res: Response) => {
    try {
        const { message }: { message: string } = req.body;
        const messages= [{ value: message }];

        produceEvent("test-topic", messages);

        res.status(200).json({
            message:"Event produced successfully!"
        })
    } catch (error) {
        res.status(400).json({
            message:"Something went wrong!"
        })
    }
}