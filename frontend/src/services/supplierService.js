import api from './api';

// Get supplier profile
export const getSupplierProfile = async () => {
  const response = await api.get('/supplier/profile');
  return response.data;
};

// Get supplier products
export const getSupplierProducts = async () => {
  const response = await api.get('/supplier/products');
  return response.data;
};

// Update product price
export const updateProductPrice = async (productId, priceData) => {
  const response = await api.post(`/supplier/products/${productId}/price`, priceData);
  return response.data;
};

// Add product to supplier catalog
export const addProductToSupplier = async (productId, priceData) => {
  const response = await api.post(`/supplier/products/${productId}/add`, priceData);
  return response.data;
};

// Get price history
export const getSupplierPriceHistory = async () => {
  const response = await api.get('/supplier/price-history');
  return response.data;
};
