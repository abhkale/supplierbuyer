import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import PriceComparisonTable from '../components/PriceComparisonTable';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full rounded-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xl">No Image Available</span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="mb-4">
              <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded">
                {product.category}
              </span>
              {product.subCategory && (
                <span className="ml-2 text-gray-600">/ {product.subCategory}</span>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            {product.brand && (
              <div className="mb-4">
                <span className="font-semibold">Brand:</span>{' '}
                <span className="text-gray-700">{product.brand}</span>
              </div>
            )}

            <div className="mb-4">
              <span className="font-semibold">SKU:</span>{' '}
              <span className="text-gray-700">{product.sku}</span>
            </div>

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Specifications</h3>
                <div className="bg-gray-50 rounded p-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                      <span className="font-medium text-gray-700">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Price Comparison */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Price Comparison</h2>
        
        {product.prices && product.prices.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 rounded p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Lowest Price</p>
                <p className="text-2xl font-bold text-green-600">
                  ${Math.min(...product.prices.map(p => p.price)).toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-50 rounded p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Average Price</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${(product.prices.reduce((sum, p) => sum + p.price, 0) / product.prices.length).toFixed(2)}
                </p>
              </div>
              <div className="bg-orange-50 rounded p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Suppliers</p>
                <p className="text-2xl font-bold text-orange-600">
                  {product.prices.length}
                </p>
              </div>
            </div>
            
            <PriceComparisonTable prices={product.prices} />
          </>
        ) : (
          <p className="text-center text-gray-500 py-8">
            No prices available from suppliers yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
