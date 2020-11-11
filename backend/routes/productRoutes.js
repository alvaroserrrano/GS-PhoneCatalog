import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import data from '../data/data.js';

const productRouter = express.Router();

//Get all products
productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

//Get product by id
productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  })
);

// productRouter.get(
//   '/seed',
//   expressAsyncHandler(async (req, res) => {
//     const createdProducts = await Product.insertMany(data.products);
//     res.send({ createdProducts });
//   })
// );

export default productRouter;
