import React, { useState, useEffect } from 'react';
import { getSupplierProducts, updateProductPrice } from '../services/supplierService';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const SupplierDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateModal, setUpdateModal] = useState(null);
  const [priceData, setPriceData] = useState({
    price: '',
    stockStatus: 'in-stock',
    minimumOrderQuantity: 1,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getSupplierProducts();
      setProducts(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrice = async (e) => {
    e.preventDefault();
    try {
      await updateProductPrice(updateModal._id, priceData);
      setUpdateModal(null);
      setPriceData({ price: '', stockStatus: 'in-stock', minimumOrderQuantity: 1 });
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update price');
    }
  };

  const openUpdateModal = (product) => {
    setUpdateModal(product);
    setPriceData({
      price: product.currentPrice || '',
      stockStatus: product.stockStatus || 'in-stock',
      minimumOrderQuantity: 1,
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Supplier Dashboard</h1>

      {error && <ErrorMessage message={error} />}

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">You don't have any products yet.</p>
          <p className="text-sm text-gray-500 mt-2">
            Contact admin to add products to your catalog.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                    <span className="text-sm text-gray-500">Category: {product.category}</span>
                  </div>
                </div>
                <div className="text-right ml-6">
                  {product.currentPrice ? (
                    <>
                      <p className="text-sm text-gray-600">Current Price</p>
                      <p className="text-3xl font-bold text-primary-600">
                        ${product.currentPrice.toFixed(2)}
                      </p>
                      <span
                        className={`mt-2 inline-block px-2 py-1 text-xs rounded ${
                          product.stockStatus === 'in-stock'
                            ? 'bg-green-100 text-green-800'
                            : product.stockStatus === 'limited'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stockStatus}
                      </span>
                    </>
                  ) : (
                    <p className="text-gray-500">No price set</p>
                  )}
                  <button
                    onClick={() => openUpdateModal(product)}
                    className="mt-4 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
                  >
                    Update Price
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Price Modal */}
      {updateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Update Price for {updateModal.name}</h3>
            <form onSubmit={handleUpdatePrice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={priceData.price}
                  onChange={(e) => setPriceData({ ...priceData, price: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={priceData.stockStatus}
                  onChange={(e) =>
                    setPriceData({ ...priceData, stockStatus: e.target.value })
                  }
                >
                  <option value="in-stock">In Stock</option>
                  <option value="limited">Limited Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Order Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={priceData.minimumOrderQuantity}
                  onChange={(e) =>
                    setPriceData({ ...priceData, minimumOrderQuantity: e.target.value })
                  }
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setUpdateModal(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierDashboard;
