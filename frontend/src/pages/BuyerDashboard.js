import React, { useState, useEffect, useRef } from 'react';
import { searchProducts } from '../services/buyerService';
import { getCategories } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters, setFilters] = useState({
    query: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });
  const observerTarget = useRef(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts({}, 1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const fetchProducts = async (searchFilters = filters, pageNum = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      const params = {
        ...searchFilters,
        page: pageNum,
        limit: 20,
      };
      
      const data = await searchProducts(params);
      
      if (append) {
        setProducts(prev => [...prev, ...data.products]);
      } else {
        setProducts(data.products);
      }
      
      setTotalProducts(data.total);
      setPage(pageNum);
      setHasMore(data.products.length === 20 && data.page < data.pages);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(filters, 1, false);
  };

  const clearFilters = () => {
    const emptyFilters = {
      query: '',
      category: '',
      minPrice: '',
      maxPrice: '',
    };
    setFilters(emptyFilters);
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(emptyFilters, 1, false);
  };

  // Load more products when scrolling near bottom
  useEffect(() => {
    const loadMore = () => {
      if (!loadingMore && !loading && hasMore) {
        fetchProducts(filters, page + 1, true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadingMore, loading, hasMore, filters, page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Products</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                name="query"
                placeholder="Search products..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={filters.query}
                onChange={handleFilterChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Price ($)
              </label>
              <input
                type="number"
                name="minPrice"
                step="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price ($)
              </label>
              <input
                type="number"
                name="maxPrice"
                step="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700 transition"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
            >
              Clear Filters
            </button>
          </div>
        </form>
      </div>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found.</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-4">
            Showing {products.length} of {totalProducts} products
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          {/* Intersection Observer Target */}
          <div ref={observerTarget} className="h-20 flex items-center justify-center">
            {loadingMore && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <p className="text-gray-600 mt-2">Loading more products...</p>
              </div>
            )}
            {!hasMore && products.length > 0 && (
              <p className="text-gray-500 text-center py-4">
                You've reached the end of the products list
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BuyerDashboard;
