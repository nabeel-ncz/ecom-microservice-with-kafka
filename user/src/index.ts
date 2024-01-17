import dotenv from "dotenv";
dotenv.config();
import connectDatabase from "./database/index";
import express, { Application } from "express";
const app: Application = express();

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/users', (req, res) => {
    res.status(200).json({message:"User service working!"});
})

app.listen(process.env.PORT || 4001, () => {
    console.log(`User service listening at ${process.env.PORT}`);
})