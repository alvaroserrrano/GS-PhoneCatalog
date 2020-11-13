import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageFileName: { type: String, required: true },
  manufacturer: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  ram: { type: Number, required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  reviews: [reviewSchema],
  screen: { type: String, required: false },
  color: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
