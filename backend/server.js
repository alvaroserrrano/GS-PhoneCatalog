import express from 'express';
import data from './data/data.js';

const app = express();
const PORT = process.env.PORT || 5000;

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
