#!/bin/bash

# SupplierBuyer Platform - Quick Start Script
# This script helps you set up the development environment quickly

echo "========================================="
echo "SupplierBuyer Platform - Quick Setup"
echo "========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) found${NC}"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}⚠ MongoDB not found in PATH${NC}"
    echo "Please make sure MongoDB is installed and running"
    echo "Visit: https://www.mongodb.com/try/download/community"
else
    echo -e "${GREEN}✓ MongoDB found${NC}"
fi

echo ""
echo "========================================="
echo "Setting up Backend..."
echo "========================================="

# Setup backend
cd backend || exit

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${YELLOW}⚠ Please update .env with your settings before starting${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install backend dependencies${NC}"
    exit 1
fi

cd ..

echo ""
echo "========================================="
echo "Setting up Frontend..."
echo "========================================="

# Setup frontend
cd frontend || exit

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install frontend dependencies${NC}"
    exit 1
fi

cd ..

echo ""
echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Make sure MongoDB is running:"
echo "   - macOS: brew services start mongodb-community"
echo "   - Linux: sudo systemctl start mongod"
echo "   - Windows: MongoDB should start as a service"
echo ""
echo "2. (Optional) Seed the database with sample data:"
echo "   cd backend && npm run seed"
echo ""
echo "3. Start the backend server:"
echo "   cd backend && npm run dev"
echo "   (Server will run on http://localhost:5000)"
echo ""
echo "4. In a new terminal, start the frontend:"
echo "   cd frontend && npm start"
echo "   (App will open on http://localhost:3000)"
echo ""
echo "Test credentials (after seeding):"
echo "  Supplier: supplier1@techsupply.com / supplier123"
echo "  Buyer: buyer1@example.com / buyer123"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo ""
