const express = require('express');
const router = express.Router();
const {
  getSupplierProfile,
  getSupplierProducts,
  updateProductPrice,
  getSupplierPriceHistory,
  addProductToSupplier,
  createProduct,
} = require('../controllers/supplierController');
const { protect, authorize } = require('../middleware/auth');
const { apiLimiter, priceUpdateLimiter } = require('../middleware/rateLimiter');

// All routes require authentication and supplier role
// Apply rate limiting first
router.use(apiLimiter);
router.use(protect);
router.use(authorize('supplier'));

router.get('/profile', getSupplierProfile);
router.get('/products', getSupplierProducts);
router.post('/products', priceUpdateLimiter, createProduct);
router.post('/products/:productId/price', priceUpdateLimiter, updateProductPrice);
router.post('/products/:productId/add', priceUpdateLimiter, addProductToSupplier);
router.get('/price-history', getSupplierPriceHistory);

module.exports = router;
