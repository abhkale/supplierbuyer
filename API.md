# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
**POST** `/auth/register`

Register a new user (buyer or supplier).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "buyer",
  "phone": "1234567890",
  "companyName": "John's Company"
}
```

**Response:**
```json
{
  "_id": "64abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "buyer",
  "supplierId": null,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
**POST** `/auth/login`

Authenticate user and get token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "64abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "buyer",
  "supplierId": null,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Current User
**GET** `/auth/me`

Get current authenticated user profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "_id": "64abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "buyer",
  "phone": "1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Product Endpoints

### Get All Products
**GET** `/products`

Get all products with price comparisons.

**Query Parameters:**
- `category` (optional) - Filter by category
- `search` (optional) - Search in name, description, brand
- `minPrice` (optional) - Minimum price filter
- `maxPrice` (optional) - Maximum price filter
- `supplier` (optional) - Filter by supplier ID
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Items per page

**Response:**
```json
{
  "products": [
    {
      "_id": "64abc456...",
      "name": "Laptop Dell XPS 15",
      "description": "High-performance laptop",
      "category": "Electronics",
      "sku": "DELL-XPS-15-001",
      "prices": [
        {
          "_id": "64abc789...",
          "price": 1299.99,
          "stockStatus": "in-stock",
          "supplierInfo": {
            "name": "Tech Supplier",
            "companyName": "Tech Supply Co"
          }
        }
      ],
      "lowestPrice": 1299.99
    }
  ],
  "page": 1,
  "pages": 5,
  "total": 100
}
```

### Get Product by ID
**GET** `/products/:id`

Get single product with all supplier prices.

**Response:**
```json
{
  "_id": "64abc456...",
  "name": "Laptop Dell XPS 15",
  "description": "High-performance laptop",
  "category": "Electronics",
  "subCategory": "Computers",
  "brand": "Dell",
  "sku": "DELL-XPS-15-001",
  "specifications": {
    "Processor": "Intel Core i7",
    "RAM": "16GB",
    "Storage": "512GB SSD"
  },
  "prices": [
    {
      "_id": "64abc789...",
      "product": "64abc456...",
      "supplier": "64abc321...",
      "price": 1299.99,
      "stockStatus": "in-stock",
      "minimumOrderQuantity": 1,
      "supplierInfo": {
        "name": "Tech Supplier",
        "companyName": "Tech Supply Co",
        "rating": 4.5
      },
      "createdAt": "2024-01-01T08:00:00.000Z"
    }
  ]
}
```

### Get Price History
**GET** `/products/:id/price-history`

Get price history for a product.

**Query Parameters:**
- `supplier` (optional) - Filter by supplier ID

**Response:**
```json
[
  {
    "_id": "64abc789...",
    "product": "64abc456...",
    "supplier": {
      "name": "Tech Supplier",
      "companyName": "Tech Supply Co"
    },
    "price": 1299.99,
    "stockStatus": "in-stock",
    "createdAt": "2024-01-01T08:00:00.000Z"
  }
]
```

### Get Categories
**GET** `/products/categories`

Get all product categories.

**Response:**
```json
["Electronics", "Clothing", "Food", "Books", "Home", "Sports", "Other"]
```

---

## Supplier Endpoints

**All supplier endpoints require authentication and supplier role.**

### Get Supplier Profile
**GET** `/supplier/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "_id": "64abc321...",
  "name": "Tech Supplier",
  "companyName": "Tech Supply Co",
  "email": "supplier@techsupply.com",
  "phone": "1234567890",
  "verified": true,
  "rating": 4.5,
  "productsSupplied": ["64abc456..."]
}
```

### Get Supplier Products
**GET** `/supplier/products`

Get all products supplied by this supplier with current prices.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "64abc456...",
    "name": "Laptop Dell XPS 15",
    "description": "High-performance laptop",
    "category": "Electronics",
    "sku": "DELL-XPS-15-001",
    "currentPrice": 1299.99,
    "stockStatus": "in-stock",
    "priceId": "64abc789..."
  }
]
```

### Update Product Price
**POST** `/supplier/products/:productId/price`

Update price for a product.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "price": 1199.99,
  "stockStatus": "in-stock",
  "minimumOrderQuantity": 1
}
```

**Response:**
```json
{
  "_id": "64abc999...",
  "product": "64abc456...",
  "supplier": "64abc321...",
  "price": 1199.99,
  "stockStatus": "in-stock",
  "minimumOrderQuantity": 1,
  "isActive": true,
  "createdAt": "2024-01-02T08:00:00.000Z"
}
```

### Add Product to Supplier Catalog
**POST** `/supplier/products/:productId/add`

Add a product to supplier's catalog with initial price.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "price": 1299.99,
  "stockStatus": "in-stock",
  "minimumOrderQuantity": 1
}
```

**Response:**
```json
{
  "message": "Product added to supplier catalog",
  "priceHistory": {
    "_id": "64abc999...",
    "product": "64abc456...",
    "supplier": "64abc321...",
    "price": 1299.99
  }
}
```

### Create New Product
**POST** `/supplier/products`

Create a new product and add it to supplier's catalog.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "New Product Name",
  "description": "Detailed product description",
  "category": "Electronics",
  "subCategory": "Computers",
  "sku": "UNIQUE-SKU-001",
  "brand": "Brand Name",
  "unit": "piece",
  "price": 999.99,
  "stockStatus": "in-stock",
  "minimumOrderQuantity": 1,
  "specifications": {
    "key1": "value1",
    "key2": "value2"
  }
}
```

**Response:**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "64abc123...",
    "name": "New Product Name",
    "description": "Detailed product description",
    "category": "Electronics",
    "sku": "UNIQUE-SKU-001",
    "currentPrice": 999.99,
    "stockStatus": "in-stock"
  },
  "priceHistory": {
    "_id": "64abc999...",
    "product": "64abc123...",
    "supplier": "64abc321...",
    "price": 999.99
  }
}
```

### Get Supplier Price History
**GET** `/supplier/price-history`

Get price update history for this supplier.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "64abc999...",
    "product": {
      "name": "Laptop Dell XPS 15",
      "sku": "DELL-XPS-15-001"
    },
    "price": 1299.99,
    "stockStatus": "in-stock",
    "isActive": true,
    "createdAt": "2024-01-02T08:00:00.000Z"
  }
]
```

---

## Buyer Endpoints

**All buyer endpoints require authentication and buyer role.**

### Search Products
**GET** `/buyer/search`

Search products with advanced filters.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `query` (optional) - Search text
- `category` (optional) - Filter by category
- `minPrice` (optional) - Minimum price
- `maxPrice` (optional) - Maximum price
- `supplier` (optional) - Filter by supplier ID
- `sortBy` (optional, default: 'price') - Sort field
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Items per page

**Response:**
```json
{
  "products": [
    {
      "_id": "64abc456...",
      "name": "Laptop Dell XPS 15",
      "prices": [...],
      "lowestPrice": 1199.99
    }
  ],
  "page": 1,
  "pages": 3,
  "total": 50
}
```

### Compare Prices
**GET** `/buyer/products/:id/compare`

Get detailed price comparison for a product.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "product": {
    "_id": "64abc456...",
    "name": "Laptop Dell XPS 15",
    "description": "High-performance laptop"
  },
  "priceComparison": [
    {
      "supplier": "64abc321...",
      "price": 1199.99,
      "stockStatus": "in-stock"
    },
    {
      "supplier": "64abc654...",
      "price": 1299.99,
      "stockStatus": "in-stock"
    }
  ],
  "lowestPrice": {
    "supplier": "64abc321...",
    "price": 1199.99
  },
  "highestPrice": {
    "supplier": "64abc654...",
    "price": 1299.99
  },
  "averagePrice": 1249.99
}
```

---

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in or invalid token)
- `403` - Forbidden (not authorized for this role)
- `404` - Not Found
- `500` - Server Error

---

## Authentication Flow

1. **Register**: User registers with email, password, and role (buyer/supplier)
2. **Login**: User logs in and receives JWT token
3. **Store Token**: Frontend stores token in localStorage
4. **Make Requests**: Include token in Authorization header for protected routes
5. **Logout**: Frontend removes token from localStorage

---

## Rate Limiting

Currently no rate limiting is implemented. In production, consider adding:
- Rate limiting middleware (express-rate-limit)
- API key authentication for higher limits
- Caching for frequently accessed data

---

## Pagination

All list endpoints support pagination:
- Default page size: 20 items
- Maximum page size: 100 items
- Page numbers start from 1

Example:
```
GET /api/products?page=2&limit=50
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","role":"buyer"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Get Products (with token)
```bash
curl http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
