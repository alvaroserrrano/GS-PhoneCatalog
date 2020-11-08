import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import data from '../data/data.js';

const productRouter = express.Router();

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

export default productRouter;
