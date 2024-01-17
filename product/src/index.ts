import dotenv from "dotenv";
dotenv.config();
import connectDatabase from "./database/index";
import express, { Application } from "express";
import { createProduct, getAllProducts, getProduct } from "./controllers/productController";
import upload from "./utils/external-services/multer";
const app: Application = express();

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
    .route('/api/products')
    .get(getAllProducts)
    .post(upload.single('file'), createProduct);

app
    .route('/api/products/:id')
    .get(getProduct);

app.listen(process.env.PORT || 4002, () => {
    console.log(`Product service listening at ${process.env.PORT}`);
})
