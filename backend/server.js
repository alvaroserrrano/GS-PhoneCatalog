import express from 'express';
import data from './data/data.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/', (req, res) => {
  res.send('Server running');
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
