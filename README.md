# SupplierBuyer E-Commerce Platform

A complete MERN stack e-commerce platform where suppliers can manage product prices and buyers can compare prices from different suppliers in one place.

## 🚀 Features

### For Buyers
- **Price Comparison**: View and compare prices from multiple suppliers for the same product
- **Advanced Search**: Filter products by category, price range, and supplier
- **Price History**: Track price changes over time
- **Real-time Updates**: See the latest prices as suppliers update them
- **User-Friendly Interface**: Clean, responsive design with Tailwind CSS

### For Suppliers
- **Product Management**: Manage your product catalog
- **Price Updates**: Easily update product prices (typically during 5-9am window)
- **Stock Status**: Update stock availability (in-stock, limited, out-of-stock)
- **Price History**: Track your own pricing history
- **Dashboard**: Intuitive dashboard to manage all your products

### Technical Features
- **Authentication**: Secure JWT-based authentication
- **Role-Based Access Control**: Separate interfaces for buyers and suppliers
- **RESTful API**: Well-structured backend API
- **MongoDB Database**: Scalable NoSQL database with proper indexing
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🏗️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## 📦 Project Structure

```
supplierBuyer/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & error handling
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   ├── .env.example     # Environment variables template
│   ├── package.json     # Backend dependencies
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── hooks/       # Custom React hooks
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   ├── .env.example     # Environment variables template
│   ├── package.json     # Frontend dependencies
│   └── tailwind.config.js
│
├── README.md            # This file
└── SETUP.md             # Setup instructions
```

## 🎯 Use Cases

- **B2B Procurement**: Businesses can compare supplier prices before making bulk purchases
- **Price Transparency**: Buyers get real-time price information from multiple sources
- **Supplier Competition**: Healthy competition among suppliers benefits buyers
- **Inventory Management**: Suppliers can manage their product catalog efficiently

## 📊 Scale

- Supports **100,000 users** (Suppliers and Buyers)
- Manages **10,000 products**
- Handles manual price updates (typically 5-9am window)
- Optimized database queries with proper indexing

## 🔐 Security

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Environment variables for sensitive data
- CORS enabled for secure cross-origin requests

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Product Endpoints
- `GET /api/products` - Get all products with prices
- `GET /api/products/:id` - Get single product
- `GET /api/products/:id/price-history` - Get price history
- `GET /api/products/categories` - Get all categories

### Supplier Endpoints (Protected)
- `GET /api/supplier/profile` - Get supplier profile
- `GET /api/supplier/products` - Get supplier's products
- `POST /api/supplier/products/:id/price` - Update product price
- `POST /api/supplier/products/:id/add` - Add product to catalog
- `GET /api/supplier/price-history` - Get supplier price history

### Buyer Endpoints (Protected)
- `GET /api/buyer/search` - Search products with filters
- `GET /api/buyer/products/:id/compare` - Compare prices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Initial development by the SupplierBuyer team

## 🙏 Acknowledgments

- Built with the MERN stack
- Styled with Tailwind CSS
- Inspired by the need for transparent B2B pricing