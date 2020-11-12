import express from 'express';
import User from '../models/User.js';
import expressAsyncHandler from 'express-async-handler';
import data from '../data/data.js';
const userRouter = express.Router();
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      }
    }
    res.status(401).send({ message: 'Invalid credentials' });
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

// userRouter.get(
//   '/seed',
//   expressAsyncHandler(async (req, res) => {
//     const createdUsers = await User.insertMany(data.users);
//     res.send({ createdUsers });
//   })
// );

export default userRouter;
