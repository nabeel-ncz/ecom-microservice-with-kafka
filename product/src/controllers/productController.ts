import { Request, Response, NextFunction } from "express";
import { Product } from "../database/models/Product";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query?.page) || 1;
        const limit = Number(req.query?.limit) || 5;
        const skip = (page - 1) * limit;
        const products = await Product.find({}).sort({ updatedAt: 'descending' }).skip(skip).limit(limit).lean();
        const totalDocuments = await Product.countDocuments({});
        if (!products || products.length === 0) {
            throw new Error("Products not found!")
        }
        res
            .status(200)
            .json({
                status: "ok",
                data: { products, totalPage: Math.ceil(totalDocuments / limit) }
            });
    } catch (error) {
        next(error);
    }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params?.id;
    try {
        const product = await Product.findOne({ _id: productId });
        if (!product) {
            throw new Error("Product not found!");
        }
        res
            .status(200)
            .json({
                status: "ok",
                data: product
            });
    } catch (error) {
        next(error);
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            throw new Error("Image upload error!");
        }
        const image = req.file;
        const { title, description, stock, price } = req.body;
        const product = await Product.create({
            title,
            description,
            image,
            price,
            stock
        });
        res
            .status(201)
            .json({
                status: "ok",
                data: product
            });
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, title, description, stock, price } = req.body;
        
        const product = await Product.updateOne({ _id: id }, {
            title,
            description,
            price,
            stock
        });

        res
            .status(200)
            .json({
                status: "ok",
                data: product
            });
    } catch (error) {
        next(error);
    }
}