const Product = require('../models/Product');
const PriceHistory = require('../models/PriceHistory');
const Supplier = require('../models/Supplier');

// @desc    Get supplier profile
// @route   GET /api/supplier/profile
// @access  Private (Supplier only)
const getSupplierProfile = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.user.supplierId).populate('productsSupplied');

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier profile not found' });
    }

    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products supplied by this supplier
// @route   GET /api/supplier/products
// @access  Private (Supplier only)
const getSupplierProducts = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.user.supplierId);

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const products = await Product.find({
      _id: { $in: supplier.productsSupplied },
    });

    // Get current prices for each product
    const productsWithPrices = await Promise.all(
      products.map(async (product) => {
        const currentPrice = await PriceHistory.getLatestPrice(
          product._id,
          supplier._id
        );
        return {
          ...product.toObject(),
          currentPrice: currentPrice ? currentPrice.price : null,
          stockStatus: currentPrice ? currentPrice.stockStatus : 'out-of-stock',
          priceId: currentPrice ? currentPrice._id : null,
        };
      })
    );

    res.json(productsWithPrices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update price for a product
// @route   POST /api/supplier/products/:productId/price
// @access  Private (Supplier only)
const updateProductPrice = async (req, res) => {
  try {
    const { price, stockStatus, minimumOrderQuantity } = req.body;
    const { productId } = req.params;

    const supplier = await Supplier.findById(req.user.supplierId);

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if supplier supplies this product
    if (!supplier.productsSupplied.includes(productId)) {
      return res.status(403).json({ message: 'You do not supply this product' });
    }

    // Deactivate old price
    await PriceHistory.updateMany(
      { product: productId, supplier: supplier._id, isActive: true },
      { isActive: false }
    );

    // Create new price entry
    const priceHistory = await PriceHistory.create({
      product: productId,
      supplier: supplier._id,
      price,
      stockStatus: stockStatus || 'in-stock',
      minimumOrderQuantity: minimumOrderQuantity || 1,
      updatedBy: req.user._id,
      isActive: true,
    });

    res.status(201).json(priceHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get price update history for supplier
// @route   GET /api/supplier/price-history
// @access  Private (Supplier only)
const getSupplierPriceHistory = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.user.supplierId);

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const priceHistory = await PriceHistory.find({ supplier: supplier._id })
      .sort({ createdAt: -1 })
      .limit(100)
      .populate('product', 'name sku');

    res.json(priceHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a product to supplier's catalog
// @route   POST /api/supplier/products/:productId/add
// @access  Private (Supplier only)
const addProductToSupplier = async (req, res) => {
  try {
    const { productId } = req.params;
    const { price, stockStatus, minimumOrderQuantity } = req.body;

    const supplier = await Supplier.findById(req.user.supplierId);

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add product to supplier's list
    if (!supplier.productsSupplied.includes(productId)) {
      supplier.productsSupplied.push(productId);
      await supplier.save();
    }

    // Add supplier to product's supplier list
    if (!product.suppliers.includes(supplier._id)) {
      product.suppliers.push(supplier._id);
      await product.save();
    }

    // Create initial price entry
    const priceHistory = await PriceHistory.create({
      product: productId,
      supplier: supplier._id,
      price,
      stockStatus: stockStatus || 'in-stock',
      minimumOrderQuantity: minimumOrderQuantity || 1,
      updatedBy: req.user._id,
      isActive: true,
    });

    res.status(201).json({
      message: 'Product added to supplier catalog',
      priceHistory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSupplierProfile,
  getSupplierProducts,
  updateProductPrice,
  getSupplierPriceHistory,
  addProductToSupplier,
};
