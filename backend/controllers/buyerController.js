const Product = require('../models/Product');
const PriceHistory = require('../models/PriceHistory');

// @desc    Compare prices across suppliers for a product
// @route   GET /api/buyer/products/:id/compare
// @access  Private (Buyer only)
const comparePrices = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('suppliers');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const prices = await PriceHistory.getAllPricesForProduct(product._id);

    // Sort by price
    const sortedPrices = prices.sort((a, b) => a.price - b.price);

    res.json({
      product,
      priceComparison: sortedPrices,
      lowestPrice: sortedPrices[0],
      highestPrice: sortedPrices[sortedPrices.length - 1],
      averagePrice:
        sortedPrices.reduce((sum, p) => sum + p.price, 0) / sortedPrices.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search products with filters
// @route   GET /api/buyer/search
// @access  Private (Buyer only)
const searchProducts = async (req, res) => {
  try {
    const {
      query,
      category,
      minPrice,
      maxPrice,
      supplier,
      sortBy = 'price',
    } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build search query
    let searchQuery = {};

    if (query) {
      searchQuery.$text = { $search: query };
    }

    if (category) {
      searchQuery.category = category;
    }

    const products = await Product.find(searchQuery).skip(skip).limit(limit);

    // Helper function to get lowest price
    const getLowestPrice = (prices) => {
      return prices.length > 0 ? Math.min(...prices.map(p => p.price)) : null;
    };

    // Get prices and apply filters
    const productsWithPrices = await Promise.all(
      products.map(async (product) => {
        let prices = await PriceHistory.getAllPricesForProduct(product._id);

        // Apply filters
        if (minPrice || maxPrice || supplier) {
          prices = prices.filter((priceObj) => {
            let include = true;
            if (minPrice && priceObj.price < parseFloat(minPrice)) include = false;
            if (maxPrice && priceObj.price > parseFloat(maxPrice)) include = false;
            if (supplier && priceObj.supplier.toString() !== supplier)
              include = false;
            return include;
          });
        }

        return {
          ...product.toObject(),
          prices,
          lowestPrice: getLowestPrice(prices),
        };
      })
    );

    // Sort results
    if (sortBy === 'price') {
      productsWithPrices.sort((a, b) => {
        const priceA = a.lowestPrice ?? Infinity;
        const priceB = b.lowestPrice ?? Infinity;
        return priceA - priceB;
      });
    }

    const total = await Product.countDocuments(searchQuery);

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

module.exports = {
  comparePrices,
  searchProducts,
};
