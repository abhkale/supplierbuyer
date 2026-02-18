require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const PriceHistory = require('../models/PriceHistory');

// Sample data
const sampleProducts = [
  {
    name: 'Laptop Dell XPS 15',
    description: 'High-performance laptop with Intel Core i7, 16GB RAM, and 512GB SSD',
    category: 'Electronics',
    subCategory: 'Computers',
    sku: 'DELL-XPS-15-001',
    brand: 'Dell',
    specifications: {
      'Processor': 'Intel Core i7',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Display': '15.6" FHD',
      'Graphics': 'Intel Iris Xe'
    },
    unit: 'piece'
  },
  {
    name: 'iPhone 14 Pro',
    description: 'Latest iPhone with A16 Bionic chip and advanced camera system',
    category: 'Electronics',
    subCategory: 'Phones',
    sku: 'APPLE-IP14PRO-001',
    brand: 'Apple',
    specifications: {
      'Processor': 'A16 Bionic',
      'Storage': '256GB',
      'Display': '6.1" Super Retina XDR',
      'Camera': '48MP + 12MP + 12MP'
    },
    unit: 'piece'
  },
  {
    name: 'Samsung 55" 4K Smart TV',
    description: 'Crystal UHD 4K Smart TV with HDR support',
    category: 'Electronics',
    subCategory: 'TVs',
    sku: 'SAMSUNG-TV55-001',
    brand: 'Samsung',
    specifications: {
      'Screen Size': '55 inches',
      'Resolution': '4K UHD (3840x2160)',
      'HDR': 'Yes',
      'Smart TV': 'Yes'
    },
    unit: 'piece'
  },
  {
    name: 'Sony WH-1000XM4 Headphones',
    description: 'Premium noise-canceling wireless headphones',
    category: 'Electronics',
    subCategory: 'Audio',
    sku: 'SONY-WH1000XM4-001',
    brand: 'Sony',
    specifications: {
      'Type': 'Over-ear',
      'Noise Cancellation': 'Yes',
      'Battery Life': '30 hours',
      'Bluetooth': '5.0'
    },
    unit: 'piece'
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic chair with lumbar support',
    category: 'Home',
    subCategory: 'Furniture',
    sku: 'CHAIR-ERG-001',
    brand: 'ErgoMax',
    specifications: {
      'Material': 'Mesh and Fabric',
      'Adjustable': 'Yes',
      'Weight Capacity': '300 lbs'
    },
    unit: 'piece'
  },
  {
    name: 'Standing Desk Adjustable',
    description: 'Electric height-adjustable standing desk',
    category: 'Home',
    subCategory: 'Furniture',
    sku: 'DESK-STAND-001',
    brand: 'DeskPro',
    specifications: {
      'Size': '60" x 30"',
      'Height Range': '28" - 48"',
      'Motor': 'Dual Motor'
    },
    unit: 'piece'
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with RGB lighting',
    category: 'Electronics',
    subCategory: 'Accessories',
    sku: 'MOUSE-GAME-001',
    brand: 'Logitech',
    specifications: {
      'DPI': '16000',
      'Buttons': '6',
      'Battery Life': '70 hours'
    },
    unit: 'piece'
  },
  {
    name: 'Mechanical Keyboard RGB',
    description: 'Mechanical gaming keyboard with Cherry MX switches',
    category: 'Electronics',
    subCategory: 'Accessories',
    sku: 'KB-MECH-001',
    brand: 'Corsair',
    specifications: {
      'Switch Type': 'Cherry MX Red',
      'Backlight': 'RGB',
      'Connection': 'USB'
    },
    unit: 'piece'
  },
  {
    name: 'Portable SSD 1TB',
    description: 'Ultra-fast portable SSD with USB-C',
    category: 'Electronics',
    subCategory: 'Storage',
    sku: 'SSD-PORT-1TB-001',
    brand: 'Samsung',
    specifications: {
      'Capacity': '1TB',
      'Interface': 'USB 3.2 Gen 2',
      'Speed': 'Up to 1050 MB/s'
    },
    unit: 'piece'
  },
  {
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad for smartphones',
    category: 'Electronics',
    subCategory: 'Accessories',
    sku: 'CHARGE-WIRE-001',
    brand: 'Anker',
    specifications: {
      'Power': '15W',
      'Compatible': 'Qi-enabled devices',
      'Cable': 'USB-C included'
    },
    unit: 'piece'
  }
];

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

    // Create products
    console.log('Creating products...');
    const createdProducts = [];
    for (const productData of sampleProducts) {
      const product = await Product.create(productData);
      createdProducts.push(product);
    }

    // Assign products to suppliers and create prices
    console.log('Creating price entries...');
    
    // Supplier 1: First 5 products
    for (let i = 0; i < 5; i++) {
      const product = createdProducts[i];
      supplier1.productsSupplied.push(product._id);
      product.suppliers.push(supplier1._id);
      await product.save();

      const basePrice = 100 + (i * 200);
      await PriceHistory.create({
        product: product._id,
        supplier: supplier1._id,
        price: basePrice + Math.random() * 100,
        stockStatus: 'in-stock',
        minimumOrderQuantity: 1,
        updatedBy: supplierUser1._id,
        isActive: true
      });
    }
    await supplier1.save();

    // Supplier 2: Products 3-8 (overlap with supplier 1)
    for (let i = 2; i < 8; i++) {
      const product = createdProducts[i];
      supplier2.productsSupplied.push(product._id);
      if (!product.suppliers.includes(supplier2._id)) {
        product.suppliers.push(supplier2._id);
      }
      await product.save();

      const basePrice = 100 + (i * 200);
      await PriceHistory.create({
        product: product._id,
        supplier: supplier2._id,
        price: basePrice + 50 + Math.random() * 100,
        stockStatus: i % 3 === 0 ? 'limited' : 'in-stock',
        minimumOrderQuantity: 1,
        updatedBy: supplierUser2._id,
        isActive: true
      });
    }
    await supplier2.save();

    // Supplier 3: Last 6 products
    for (let i = 4; i < 10; i++) {
      const product = createdProducts[i];
      supplier3.productsSupplied.push(product._id);
      if (!product.suppliers.includes(supplier3._id)) {
        product.suppliers.push(supplier3._id);
      }
      await product.save();

      const basePrice = 100 + (i * 200);
      await PriceHistory.create({
        product: product._id,
        supplier: supplier3._id,
        price: basePrice - 20 + Math.random() * 100,
        stockStatus: 'in-stock',
        minimumOrderQuantity: 1,
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
