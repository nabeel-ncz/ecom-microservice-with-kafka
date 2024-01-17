import dotenv from "dotenv";
dotenv.config();
import connectDatabase from "./database/index";
import express, { Application } from "express";
import { createOrder } from "./controllers/orderController";
const app: Application = express();

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/api/order').get((req, res) => {
    res.status(200).json({
        message:"Order api working"
    })
})

app.route('/api/order').post(createOrder);

app.listen(process.env.PORT || 4004, () => {
    console.log(`Order service listening at ${process.env.PORT}`);
})
