require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const PriceHistory = require('../models/PriceHistory');
const { generateProducts } = require('./productData');

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Supplier.deleteMany({});
    await Product.deleteMany({});
    await PriceHistory.deleteMany({});

    // Create suppliers
    console.log('Creating suppliers...');
    const supplier1 = await Supplier.create({
      name: 'Tech Supply Inc',
      companyName: 'Tech Supply Inc',
      email: 'contact@techsupply.com',
      phone: '555-0101',
      address: {
        street: '123 Tech Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA'
      },
      verified: true,
      rating: 4.5
    });

    const supplier2 = await Supplier.create({
      name: 'Electronics Hub',
      companyName: 'Electronics Hub Ltd',
      email: 'info@electronichub.com',
      phone: '555-0102',
      address: {
        street: '456 Electronics Ave',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA'
      },
      verified: true,
      rating: 4.3
    });

    const supplier3 = await Supplier.create({
      name: 'Global Distributors',
      companyName: 'Global Distributors LLC',
      email: 'sales@globaldist.com',
      phone: '555-0103',
      address: {
        street: '789 Distribution Blvd',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701',
        country: 'USA'
      },
      verified: true,
      rating: 4.7
    });

    // Create users
    console.log('Creating users...');
    const supplierUser1 = await User.create({
      name: 'Tech Supply Manager',
      email: 'supplier1@techsupply.com',
      password: 'supplier123',
      role: 'supplier',
      phone: '555-0101',
      supplierId: supplier1._id
    });

    const supplierUser2 = await User.create({
      name: 'Electronics Hub Manager',
      email: 'supplier2@electronichub.com',
      password: 'supplier123',
      role: 'supplier',
      phone: '555-0102',
      supplierId: supplier2._id
    });

    const supplierUser3 = await User.create({
      name: 'Global Dist Manager',
      email: 'supplier3@globaldist.com',
      password: 'supplier123',
      role: 'supplier',
      phone: '555-0103',
      supplierId: supplier3._id
    });

    const buyerUser1 = await User.create({
      name: 'John Buyer',
      email: 'buyer1@example.com',
      password: 'buyer123',
      role: 'buyer',
      phone: '555-0201'
    });

    const buyerUser2 = await User.create({
      name: 'Jane Smith',
      email: 'buyer2@example.com',
      password: 'buyer123',
      role: 'buyer',
      phone: '555-0202'
    });

    // Generate 200 products
    console.log('Creating 200 products...');
    const sampleProducts = generateProducts();
    const createdProducts = [];
    
    for (const productData of sampleProducts) {
      const product = await Product.create(productData);
      createdProducts.push(product);
    }

    // Assign products to suppliers and create prices
    console.log('Creating price entries...');
    
    // Distribute products among suppliers with some overlap
    // Supplier 1: First 70 products
    for (let i = 0; i < 70; i++) {
      const product = createdProducts[i];
      supplier1.productsSupplied.push(product._id);
      product.suppliers.push(supplier1._id);
      await product.save();

      const basePrice = 50 + (i * 10);
      await PriceHistory.create({
        product: product._id,
        supplier: supplier1._id,
        price: basePrice + Math.random() * 50,
        stockStatus: ['in-stock', 'in-stock', 'limited'][i % 3],
        minimumOrderQuantity: [1, 1, 5, 10][i % 4],
        updatedBy: supplierUser1._id,
        isActive: true
      });
    }
    await supplier1.save();

    // Supplier 2: Products 50-150 (overlap with supplier 1 and 3)
    for (let i = 50; i < 150; i++) {
      const product = createdProducts[i];
      supplier2.productsSupplied.push(product._id);
      if (!product.suppliers.includes(supplier2._id)) {
        product.suppliers.push(supplier2._id);
      }
      await product.save();

      const basePrice = 50 + (i * 10);
      await PriceHistory.create({
        product: product._id,
        supplier: supplier2._id,
        price: basePrice + 20 + Math.random() * 50,
        stockStatus: ['in-stock', 'in-stock', 'limited', 'out-of-stock'][i % 4],
        minimumOrderQuantity: [1, 1, 5, 10][i % 4],
        updatedBy: supplierUser2._id,
        isActive: true
      });
    }
    await supplier2.save();

    // Supplier 3: Last 100 products
    for (let i = 100; i < 200; i++) {
      const product = createdProducts[i];
      supplier3.productsSupplied.push(product._id);
      if (!product.suppliers.includes(supplier3._id)) {
        product.suppliers.push(supplier3._id);
      }
      await product.save();

      const basePrice = 50 + (i * 10);
      await PriceHistory.create({
        product: product._id,
        supplier: supplier3._id,
        price: basePrice - 10 + Math.random() * 50,
        stockStatus: ['in-stock', 'in-stock', 'in-stock', 'limited'][i % 4],
        minimumOrderQuantity: [1, 1, 5, 10, 20][i % 5],
        updatedBy: supplierUser3._id,
        isActive: true
      });
    }
    await supplier3.save();

    console.log('\n========================================');
    console.log('Database seeded successfully!');
    console.log('========================================\n');
    console.log('Test Users:');
    console.log('-------------------');
    console.log('Suppliers:');
    console.log('  Email: supplier1@techsupply.com     | Password: supplier123');
    console.log('  Email: supplier2@electronichub.com  | Password: supplier123');
    console.log('  Email: supplier3@globaldist.com     | Password: supplier123');
    console.log('\nBuyers:');
    console.log('  Email: buyer1@example.com           | Password: buyer123');
    console.log('  Email: buyer2@example.com           | Password: buyer123');
    console.log('\n========================================');
    console.log(`Created ${createdProducts.length} products`);
    console.log('Created 3 suppliers with price data');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
