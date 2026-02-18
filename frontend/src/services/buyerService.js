import api from './api';

// Compare prices for a product
export const comparePrices = async (productId) => {
  const response = await api.get(`/buyer/products/${productId}/compare`);
  return response.data;
};

// Search products with filters
export const searchProducts = async (params = {}) => {
  const response = await api.get('/buyer/search', { params });
  return response.data;
};
