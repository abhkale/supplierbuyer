import api from './api';

// Get all products
export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

// Get single product
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Get price history
export const getPriceHistory = async (id, supplierId) => {
  const response = await api.get(`/products/${id}/price-history`, {
    params: { supplier: supplierId },
  });
  return response.data;
};

// Get categories
export const getCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};
