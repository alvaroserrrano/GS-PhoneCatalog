import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/Order';
import { isAuth } from '../utils';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAUth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'There are no products in your cart' });
    } else {
      //create order
      const order = new Order({
        orderItems: req.body.orderItems,
        // user: req.user._id,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: 'New order created', order: createdOrder });
    }
  })
);

export default orderRouter;
