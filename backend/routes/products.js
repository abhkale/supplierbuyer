const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getPriceHistory,
  getCategories,
} = require('../controllers/productController');
const { apiLimiter } = require('../middleware/rateLimiter');

// Apply rate limiting to all product routes
router.use(apiLimiter);

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);
router.get('/:id/price-history', getPriceHistory);

module.exports = router;
