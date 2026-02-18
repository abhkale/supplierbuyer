import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to SupplierBuyer
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your one-stop platform for comparing prices from multiple suppliers
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* For Buyers */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-4">For Buyers</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Compare prices from multiple suppliers at once</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Search and filter products by category, price, and supplier</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>View price history and trends</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Make informed purchasing decisions</span>
              </li>
            </ul>
            <Link
              to="/register"
              className="mt-6 block text-center bg-primary-100 text-primary-700 px-6 py-2 rounded hover:bg-primary-200 transition"
            >
              Register as Buyer
            </Link>
          </div>

          {/* For Suppliers */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">🏭</div>
            <h2 className="text-2xl font-bold mb-4">For Suppliers</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Manage your product catalog efficiently</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Update prices and stock status in real-time</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Track your pricing history</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Reach thousands of buyers</span>
              </li>
            </ul>
            <Link
              to="/register"
              className="mt-6 block text-center bg-primary-100 text-primary-700 px-6 py-2 rounded hover:bg-primary-200 transition"
            >
              Register as Supplier
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold mb-2">Fast & Efficient</h4>
              <p className="text-sm text-gray-600">
                Quick price comparisons to save you time and money
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-semibold mb-2">Secure & Reliable</h4>
              <p className="text-sm text-gray-600">
                Your data is safe with our secure authentication system
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-semibold mb-2">Real-time Updates</h4>
              <p className="text-sm text-gray-600">
                Get the latest prices from suppliers as they update
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
