# Testing Guide

This guide provides comprehensive instructions for testing the SupplierBuyer platform.

## Prerequisites

1. Backend and frontend servers running
2. MongoDB running
3. Database seeded with sample data (optional but recommended)

## Quick Start Testing

### 1. Seed the Database

```bash
cd backend
npm run seed
```

This will create:
- 3 supplier accounts
- 2 buyer accounts
- 10 sample products
- Price data from multiple suppliers

### Test Credentials

**Suppliers:**
- `supplier1@techsupply.com` / `supplier123`
- `supplier2@electronichub.com` / `supplier123`
- `supplier3@globaldist.com` / `supplier123`

**Buyers:**
- `buyer1@example.com` / `buyer123`
- `buyer2@example.com` / `buyer123`

## Manual Testing Checklist

### Authentication Tests

#### Registration
- [ ] Register as a buyer
  - Navigate to `/register`
  - Fill in all fields with "Buyer" role
  - Submit form
  - Verify redirect to buyer dashboard
  - Verify JWT token stored in localStorage

- [ ] Register as a supplier
  - Navigate to `/register`
  - Fill in all fields with "Supplier" role
  - Include company name
  - Submit form
  - Verify redirect to supplier dashboard
  - Verify JWT token stored in localStorage

- [ ] Test validation errors
  - Try registering with existing email
  - Try short password (< 6 characters)
  - Try invalid email format

#### Login
- [ ] Login with buyer account
  - Navigate to `/login`
  - Enter buyer credentials
  - Verify redirect to buyer dashboard
  - Verify user info displayed in header

- [ ] Login with supplier account
  - Navigate to `/login`
  - Enter supplier credentials
  - Verify redirect to supplier dashboard

- [ ] Test invalid credentials
  - Try wrong password
  - Try non-existent email
  - Verify error messages displayed

#### Logout
- [ ] Logout functionality
  - Click logout button
  - Verify redirect to login page
  - Verify token removed from localStorage
  - Try accessing protected route (should redirect to login)

### Supplier Features Tests

#### Dashboard
- [ ] View supplier products
  - Login as supplier
  - Navigate to dashboard
  - Verify product list displays
  - Check current prices shown
  - Check stock status displayed

#### Update Price
- [ ] Update product price
  - Click "Update Price" on a product
  - Enter new price (e.g., 999.99)
  - Select stock status
  - Set minimum order quantity
  - Submit form
  - Verify price updated on dashboard
  - Verify old price deactivated

- [ ] Test validation
  - Try negative price
  - Try empty price
  - Verify error handling

#### Price History
- [ ] View price history
  - Check backend: `GET /api/supplier/price-history`
  - Verify chronological order
  - Verify product information included

### Buyer Features Tests

#### Browse Products
- [ ] View all products
  - Login as buyer
  - Navigate to dashboard
  - Verify products displayed
  - Check lowest price shown for each
  - Check number of suppliers shown

#### Search and Filter
- [ ] Search by text
  - Enter search query (e.g., "laptop")
  - Click "Apply Filters"
  - Verify only matching products shown

- [ ] Filter by category
  - Select a category (e.g., "Electronics")
  - Apply filter
  - Verify only products in that category shown

- [ ] Filter by price range
  - Set min price (e.g., 100)
  - Set max price (e.g., 500)
  - Apply filters
  - Verify products within price range shown

- [ ] Clear filters
  - Click "Clear Filters"
  - Verify all products shown again

#### Product Details
- [ ] View product details
  - Click on a product card
  - Verify product information displayed
  - Check specifications shown
  - Verify price comparison table

- [ ] Price comparison
  - Check lowest/average/supplier count displayed
  - Verify price table shows all suppliers
  - Verify lowest price highlighted
  - Check stock status for each supplier
  - Verify last updated dates

### API Testing with Postman/cURL

#### Test Authentication Endpoints

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "role": "buyer"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'

# Get current user (replace TOKEN with actual token)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

#### Test Product Endpoints

```bash
# Get all products
curl http://localhost:5000/api/products

# Get single product (replace ID)
curl http://localhost:5000/api/products/PRODUCT_ID

# Get categories
curl http://localhost:5000/api/products/categories

# Get price history for product
curl http://localhost:5000/api/products/PRODUCT_ID/price-history
```

#### Test Supplier Endpoints

```bash
# Login as supplier first to get token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"supplier1@techsupply.com","password":"supplier123"}' \
  | jq -r '.token')

# Get supplier products
curl http://localhost:5000/api/supplier/products \
  -H "Authorization: Bearer $TOKEN"

# Update product price
curl -X POST http://localhost:5000/api/supplier/products/PRODUCT_ID/price \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1099.99,
    "stockStatus": "in-stock",
    "minimumOrderQuantity": 1
  }'
```

#### Test Buyer Endpoints

```bash
# Login as buyer first to get token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"buyer1@example.com","password":"buyer123"}' \
  | jq -r '.token')

# Search products
curl "http://localhost:5000/api/buyer/search?query=laptop&category=Electronics" \
  -H "Authorization: Bearer $TOKEN"

# Compare prices for a product
curl http://localhost:5000/api/buyer/products/PRODUCT_ID/compare \
  -H "Authorization: Bearer $TOKEN"
```

## Performance Testing

### Load Testing with Apache Bench

Test API performance:

```bash
# Test product listing endpoint
ab -n 1000 -c 10 http://localhost:5000/api/products

# Test with authentication
ab -n 1000 -c 10 -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/supplier/products
```

### Expected Performance

- Product listing: < 100ms for 20 items
- Single product: < 50ms
- Price comparison: < 200ms (includes aggregation)
- Authentication: < 100ms

## Security Testing

### Authentication Tests
- [ ] Try accessing protected routes without token
- [ ] Try accessing supplier routes as buyer
- [ ] Try accessing buyer routes as supplier
- [ ] Test with expired token
- [ ] Test with invalid token format

### Input Validation Tests
- [ ] SQL injection attempts in search
- [ ] XSS attempts in product descriptions
- [ ] Very long input strings
- [ ] Special characters in fields

## Browser Compatibility

Test on multiple browsers:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

Test responsive design:
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

## Common Issues to Check

### Backend Issues
- [ ] MongoDB connection successful
- [ ] All routes responding
- [ ] CORS configured correctly
- [ ] JWT token generation working
- [ ] Password hashing working
- [ ] Error handling working

### Frontend Issues
- [ ] API URL configured correctly
- [ ] Token storage/retrieval working
- [ ] Protected routes redirecting
- [ ] Forms validating correctly
- [ ] Loading states showing
- [ ] Error messages displaying

### Database Issues
- [ ] Indexes created
- [ ] Relationships working
- [ ] Aggregations performing well
- [ ] Data consistency maintained

## Automated Testing (Future)

### Backend Unit Tests
```javascript
// Example test structure
describe('Auth Controller', () => {
  test('should register a new user', async () => {
    // Test implementation
  });
  
  test('should login user with valid credentials', async () => {
    // Test implementation
  });
});
```

### Frontend Component Tests
```javascript
// Example test structure
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

test('renders product name', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByText(/Product Name/i)).toBeInTheDocument();
});
```

### E2E Tests with Cypress
```javascript
// Example E2E test
describe('Buyer Flow', () => {
  it('should allow buyer to search and view products', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('buyer1@example.com');
    cy.get('input[name="password"]').type('buyer123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/buyer/dashboard');
  });
});
```

## Reporting Issues

When reporting issues, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser/environment details
5. Console errors (if any)
6. Network requests (if relevant)

## Test Data Cleanup

After testing, you can reset the database:

```bash
cd backend
# This will clear all data and reseed
npm run seed
```

Or manually clear:
```javascript
// In MongoDB shell
use supplier-buyer-db
db.dropDatabase()
```

## Success Criteria

The application passes testing if:
- ✅ All authentication flows work correctly
- ✅ Role-based access control enforced
- ✅ Suppliers can update prices
- ✅ Buyers can view and compare prices
- ✅ All API endpoints respond correctly
- ✅ UI is responsive and user-friendly
- ✅ No security vulnerabilities
- ✅ Performance meets expectations
- ✅ Error handling works properly
- ✅ Data integrity maintained

Happy Testing! 🚀
