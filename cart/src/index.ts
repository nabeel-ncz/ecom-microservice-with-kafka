import dotenv from "dotenv";
dotenv.config();
import connectDatabase from "./database/index";
import express, { Application } from "express";
const app: Application = express();
connectDatabase();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/cart', (req, res) => {
    res.status(200).json({
        message:"Cart api working!"
    })
})

app.listen(process.env.PORT || 4003, () => {
    console.log('Cart service listening at 4003');
})
