const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    stockStatus: {
      type: String,
      enum: ['in-stock', 'out-of-stock', 'limited'],
      default: 'in-stock',
    },
    minimumOrderQuantity: {
      type: Number,
      default: 1,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound indexes for efficient queries
priceHistorySchema.index({ product: 1, supplier: 1, isActive: 1 });
priceHistorySchema.index({ product: 1, createdAt: -1 });
priceHistorySchema.index({ supplier: 1, createdAt: -1 });

// Get latest price for a product from a supplier
priceHistorySchema.statics.getLatestPrice = async function (productId, supplierId) {
  return await this.findOne({
    product: productId,
    supplier: supplierId,
    isActive: true,
  }).sort({ createdAt: -1 });
};

// Get all active prices for a product from all suppliers
priceHistorySchema.statics.getAllPricesForProduct = async function (productId) {
  return await this.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(productId),
        isActive: true,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: '$supplier',
        latestPrice: { $first: '$$ROOT' },
      },
    },
    {
      $replaceRoot: { newRoot: '$latestPrice' },
    },
    {
      $lookup: {
        from: 'suppliers',
        localField: 'supplier',
        foreignField: '_id',
        as: 'supplierInfo',
      },
    },
    {
      $unwind: '$supplierInfo',
    },
  ]);
};

module.exports = mongoose.model('PriceHistory', priceHistorySchema);
