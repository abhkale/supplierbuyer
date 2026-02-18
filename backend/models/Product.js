const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Home', 'Sports', 'Other'],
    },
    subCategory: {
      type: String,
    },
    specifications: {
      type: Map,
      of: String,
    },
    images: [{
      url: String,
      alt: String,
    }],
    thumbnail: {
      type: String,
    },
    unit: {
      type: String,
      default: 'piece',
    },
    brand: {
      type: String,
    },
    sku: {
      type: String,
      unique: true,
      required: [true, 'Please add a SKU'],
    },
    suppliers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
    }],
  },
  {
    timestamps: true,
  }
);

// Create indexes for searching and filtering
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1, subCategory: 1 });
productSchema.index({ sku: 1 });

module.exports = mongoose.model('Product', productSchema);
