import express from 'express';
import User from '../models/User.js';
import expressAsyncHandler from 'express-async-handler';
import data from '../data/data.js';
const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

export default userRouter;
