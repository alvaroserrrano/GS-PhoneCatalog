import config from './config.js';
import jwt from 'jsonwebtoken';
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

//auth middleware to authorize protected routes
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer
    //verify jwt token
    jwt.verify(token, config.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token' });
      } else {
        req.user = decode;
        next();
        return;
      }
    });
  } else {
    res.status(401).send({ message: 'No token' });
  }
};
