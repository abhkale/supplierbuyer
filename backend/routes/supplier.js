const express = require('express');
const router = express.Router();
const {
  getSupplierProfile,
  getSupplierProducts,
  updateProductPrice,
  getSupplierPriceHistory,
  addProductToSupplier,
} = require('../controllers/supplierController');
const { protect, authorize } = require('../middleware/auth');
const { apiLimiter, priceUpdateLimiter } = require('../middleware/rateLimiter');

// All routes require authentication and supplier role
router.use(protect);
router.use(authorize('supplier'));

router.get('/profile', apiLimiter, getSupplierProfile);
router.get('/products', apiLimiter, getSupplierProducts);
router.post('/products/:productId/price', priceUpdateLimiter, updateProductPrice);
router.post('/products/:productId/add', priceUpdateLimiter, addProductToSupplier);
router.get('/price-history', apiLimiter, getSupplierPriceHistory);

module.exports = router;
