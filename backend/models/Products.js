const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [String],

  variants: [{
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    discountPrice: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
  }],

  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);