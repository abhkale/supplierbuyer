# Setup Instructions

This guide will help you set up and run the SupplierBuyer E-Commerce Platform on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Git** - Version control

## Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd supplierBuyer
```

**Note:** Replace `<your-repository-url>` with your actual repository URL.

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/supplier-buyer-db
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRE=7d
```

**Important**: Change `JWT_SECRET` to a strong, unique secret key in production.

#### Start MongoDB

Make sure MongoDB is running on your machine:

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod

# Windows
# MongoDB should start automatically as a service
# Or run: net start MongoDB
```

#### Start the Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

The backend server will start on `http://localhost:5000`

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

### 3. Frontend Setup

Open a new terminal window/tab:

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

The default configuration should work:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### Start the Frontend Development Server

```bash
npm start
```

The React development server will start on `http://localhost:3000`

Your browser should automatically open to the application.

## Testing the Application

### 1. Register Users

1. Navigate to `http://localhost:3000`
2. Click "Register" or "Get Started"
3. Create a **Buyer** account:
   - Enter your details
   - Select "Buyer" as role
   - Click Register

4. Create a **Supplier** account:
   - Log out from the buyer account
   - Register again
   - Select "Supplier" as role
   - Enter company name
   - Click Register

### 2. Seed Database (Optional)

To populate the database with sample data, you can create a seed script or manually add products through MongoDB:

```javascript
// Example: Add sample products using MongoDB shell or a seed script
use supplier-buyer-db

db.products.insertMany([
  {
    name: "Laptop Dell XPS 15",
    description: "High-performance laptop with Intel i7 processor",
    category: "Electronics",
    subCategory: "Computers",
    sku: "DELL-XPS-15-001",
    brand: "Dell",
    specifications: {
      "Processor": "Intel Core i7",
      "RAM": "16GB",
      "Storage": "512GB SSD"
    },
    suppliers: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

### 3. Test Supplier Features

1. Log in as a supplier
2. Navigate to Supplier Dashboard
3. Add products to your catalog
4. Update prices for products

### 4. Test Buyer Features

1. Log in as a buyer
2. Navigate to Buyer Dashboard
3. Search and filter products
4. View product details and price comparisons

## Common Issues and Solutions

### MongoDB Connection Error

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**: Make sure MongoDB is running:
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod             # Linux
```

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**: 
- Kill the process using port 5000, or
- Change the PORT in your `.env` file

```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### CORS Issues

If you encounter CORS errors, make sure:
1. Backend is running on `http://localhost:5000`
2. Frontend `.env` has correct `REACT_APP_API_URL`
3. Backend has CORS middleware enabled (already configured)

### React App Not Starting

**Error**: Module not found errors

**Solution**: 
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

## Production Deployment

### Backend Deployment

1. **Environment Variables**: Set production environment variables
2. **Database**: Use a cloud MongoDB service (MongoDB Atlas)
3. **Server**: Deploy to Heroku, AWS, DigitalOcean, etc.

```bash
# Build for production
npm install --production
NODE_ENV=production node server.js
```

### Frontend Deployment

1. **Build**: Create production build
```bash
cd frontend
npm run build
```

2. **Deploy**: Deploy the `build` folder to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Any static hosting service

3. **Update API URL**: Set `REACT_APP_API_URL` to your production backend URL

## Additional Configuration

### MongoDB Indexes

The application automatically creates indexes, but you can manually create them:

```javascript
// In MongoDB shell
use supplier-buyer-db

// Product indexes
db.products.createIndex({ name: "text", description: "text", brand: "text" })
db.products.createIndex({ category: 1, subCategory: 1 })
db.products.createIndex({ sku: 1 })

// Price history indexes
db.pricehistories.createIndex({ product: 1, supplier: 1, isActive: 1 })
db.pricehistories.createIndex({ product: 1, createdAt: -1 })
db.pricehistories.createIndex({ supplier: 1, createdAt: -1 })
```

### Email Configuration (Future Enhancement)

To add email notifications, install and configure nodemailer:

```bash
npm install nodemailer
```

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Backend: Uses `nodemon` (when running `npm run dev`)
- Frontend: Uses React's built-in hot reload

### API Testing

Use tools like:
- **Postman** - API testing
- **Thunder Client** (VS Code extension)
- **curl** - Command line

Example API test:
```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","role":"buyer"}'
```

## Support

If you encounter any issues:

1. Check the console logs (both backend and frontend)
2. Verify environment variables are set correctly
3. Ensure MongoDB is running
4. Check network requests in browser DevTools
5. Create an issue on GitHub

## Next Steps

After setup:

1. Explore the codebase
2. Customize the UI (Tailwind CSS)
3. Add more features
4. Configure production deployment
5. Set up CI/CD pipeline
6. Add comprehensive tests

Happy coding! 🚀
