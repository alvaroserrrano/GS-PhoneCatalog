import express from 'express';
import data from './data/data.js';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import productRouter from './routes/productRoutes.js';
import config from './config.js';

const PORT = process.env.PORT || 5000;
const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log('Connected to DB'))
  .catch((error) => console.log(error.reason));

const app = express();

app.use(express.json());
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);

app.get('/api/v1/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID || 'sb');
});

app.get('/api/v1/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/v1/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x._id == productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.get('/', (req, res) => {
  res.send('Server running');
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
