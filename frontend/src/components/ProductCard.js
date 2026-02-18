import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { prices = [], lowestPrice } = product;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6">
      <div className="mb-4">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-48 object-cover rounded"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {product.description}
      </p>

      <div className="mb-3">
        <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
          {product.category}
        </span>
        {product.brand && (
          <span className="ml-2 text-sm text-gray-500">
            Brand: {product.brand}
          </span>
        )}
      </div>

      {lowestPrice !== null && lowestPrice !== undefined ? (
        <div className="mb-4">
          <span className="text-sm text-gray-600">Starting from</span>
          <p className="text-2xl font-bold text-primary-600">
            ${lowestPrice.toFixed(2)}
          </p>
          <span className="text-xs text-gray-500">
            {prices.length} supplier{prices.length !== 1 ? 's' : ''}
          </span>
        </div>
      ) : (
        <p className="text-gray-500 mb-4">No prices available</p>
      )}

      <Link
        to={`/products/${product._id}`}
        className="block w-full text-center bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
