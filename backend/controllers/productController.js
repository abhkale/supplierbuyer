const Product = require('../models/Product');
const PriceHistory = require('../models/PriceHistory');
const Supplier = require('../models/Supplier');

// @desc    Get all products with price comparisons
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, supplier } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Get products
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .populate('suppliers');

    // Get prices for each product
    const productsWithPrices = await Promise.all(
      products.map(async (product) => {
        let prices = await PriceHistory.getAllPricesForProduct(product._id);

        // Apply price filters
        if (minPrice || maxPrice || supplier) {
          prices = prices.filter((priceObj) => {
            let include = true;
            if (minPrice && priceObj.price < parseFloat(minPrice)) include = false;
            if (maxPrice && priceObj.price > parseFloat(maxPrice)) include = false;
            if (supplier && priceObj.supplier.toString() !== supplier) include = false;
            return include;
          });
        }

        return {
          ...product.toObject(),
          prices,
        };
      })
    );

    const total = await Product.countDocuments(query);

    res.json({
      products: productsWithPrices,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product with all supplier prices
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('suppliers');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Get all prices from different suppliers
    const prices = await PriceHistory.getAllPricesForProduct(product._id);

    res.json({
      ...product.toObject(),
      prices,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get price history for a product
// @route   GET /api/products/:id/price-history
// @access  Public
const getPriceHistory = async (req, res) => {
  try {
    const { supplier } = req.query;
    const query = { product: req.params.id };

    if (supplier) {
      query.supplier = supplier;
    }

    const priceHistory = await PriceHistory.find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('supplier', 'name companyName');

    res.json(priceHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getPriceHistory,
  getCategories,
};
