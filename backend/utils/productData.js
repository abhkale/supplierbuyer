// Helper function to generate product data
const generateProducts = () => {
  const products = [];
  
  // Electronics - Computers (30 products)
  const laptopBrands = ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus', 'Acer'];
  const processors = ['Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'Apple M1', 'Apple M2'];
  const ramSizes = ['8GB', '16GB', '32GB', '64GB'];
  const storageSizes = ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD'];
  
  for (let i = 0; i < 30; i++) {
    const brand = laptopBrands[i % laptopBrands.length];
    const processor = processors[i % processors.length];
    const ram = ramSizes[i % ramSizes.length];
    const storage = storageSizes[i % storageSizes.length];
    
    products.push({
      name: `${brand} Laptop ${processor.split(' ')[2] || 'Pro'} ${i + 1}`,
      description: `Professional laptop with ${processor}, ${ram} RAM, and ${storage}`,
      category: 'Electronics',
      subCategory: 'Computers',
      sku: `LAPTOP-${brand.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      brand: brand,
      specifications: {
        'Processor': processor,
        'RAM': ram,
        'Storage': storage,
        'Display': ['13.3"', '14"', '15.6"', '17"'][i % 4],
        'Graphics': ['Intel Iris Xe', 'NVIDIA GTX 1650', 'NVIDIA RTX 3050', 'Integrated'][i % 4]
      },
      unit: 'piece'
    });
  }
  
  // Electronics - Phones (25 products)
  const phoneBrands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi'];
  const phoneModels = ['Pro Max', 'Pro', 'Standard', 'Plus', 'Ultra'];
  
  for (let i = 0; i < 25; i++) {
    const brand = phoneBrands[i % phoneBrands.length];
    const model = phoneModels[i % phoneModels.length];
    
    products.push({
      name: `${brand} ${model} Phone ${i + 1}`,
      description: `Latest smartphone with advanced features and 5G connectivity`,
      category: 'Electronics',
      subCategory: 'Phones',
      sku: `PHONE-${brand.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      brand: brand,
      specifications: {
        'Display': ['6.1"', '6.4"', '6.7"'][i % 3],
        'Storage': ['128GB', '256GB', '512GB', '1TB'][i % 4],
        'Camera': ['48MP', '50MP', '64MP', '108MP'][i % 4],
        'Battery': ['4000mAh', '4500mAh', '5000mAh'][i % 3]
      },
      unit: 'piece'
    });
  }
  
  // Electronics - TVs (20 products)
  const tvBrands = ['Samsung', 'LG', 'Sony', 'TCL', 'Vizio'];
  const tvSizes = ['43"', '50"', '55"', '65"', '75"', '85"'];
  
  for (let i = 0; i < 20; i++) {
    const brand = tvBrands[i % tvBrands.length];
    const size = tvSizes[i % tvSizes.length];
    
    products.push({
      name: `${brand} ${size} ${['4K', '8K', 'QLED', 'OLED'][i % 4]} Smart TV`,
      description: `Smart TV with premium picture quality and streaming capabilities`,
      category: 'Electronics',
      subCategory: 'TVs',
      sku: `TV-${brand.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      brand: brand,
      specifications: {
        'Screen Size': size,
        'Resolution': ['4K UHD', '8K UHD', 'QHD'][i % 3],
        'HDR': 'Yes',
        'Smart TV': 'Yes',
        'Refresh Rate': ['60Hz', '120Hz'][i % 2]
      },
      unit: 'piece'
    });
  }
  
  // Electronics - Audio (20 products)
  const audioBrands = ['Sony', 'Bose', 'JBL', 'Sennheiser', 'Audio-Technica'];
  const audioTypes = ['Headphones', 'Earbuds', 'Speakers', 'Soundbar'];
  
  for (let i = 0; i < 20; i++) {
    const brand = audioBrands[i % audioBrands.length];
    const type = audioTypes[i % audioTypes.length];
    
    products.push({
      name: `${brand} ${type} Premium ${i + 1}`,
      description: `High-quality ${type.toLowerCase()} with excellent sound`,
      category: 'Electronics',
      subCategory: 'Audio',
      sku: `AUDIO-${brand.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      brand: brand,
      specifications: {
        'Type': type,
        'Noise Cancellation': ['Yes', 'No'][i % 2],
        'Wireless': 'Yes',
        'Battery Life': ['20 hours', '30 hours', '40 hours'][i % 3]
      },
      unit: 'piece'
    });
  }
  
  // Electronics - Accessories (15 products)
  const accessoryTypes = [
    { name: 'Wireless Mouse', brand: 'Logitech' },
    { name: 'Mechanical Keyboard', brand: 'Corsair' },
    { name: 'USB-C Hub', brand: 'Anker' },
    { name: 'Webcam', brand: 'Logitech' },
    { name: 'External SSD', brand: 'Samsung' }
  ];
  
  for (let i = 0; i < 15; i++) {
    const accessory = accessoryTypes[i % accessoryTypes.length];
    
    products.push({
      name: `${accessory.brand} ${accessory.name} ${i + 1}`,
      description: `Professional ${accessory.name.toLowerCase()} for enhanced productivity`,
      category: 'Electronics',
      subCategory: 'Accessories',
      sku: `ACC-${accessory.brand.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      brand: accessory.brand,
      specifications: {
        'Type': accessory.name,
        'Connectivity': ['Wireless', 'USB', 'USB-C'][i % 3],
        'Compatibility': 'Universal'
      },
      unit: 'piece'
    });
  }
  
  // Clothing (30 products)
  const clothingTypes = ['T-Shirt', 'Jeans', 'Jacket', 'Sweater', 'Dress', 'Shorts'];
  const clothingBrands = ['Nike', 'Adidas', 'Levi\'s', 'H&M', 'Zara'];
  const sizes = ['S', 'M', 'L', 'XL'];
  
  for (let i = 0; i < 30; i++) {
    const type = clothingTypes[i % clothingTypes.length];
    const brand = clothingBrands[i % clothingBrands.length];
    
    products.push({
      name: `${brand} ${type} ${['Classic', 'Sport', 'Casual', 'Premium'][i % 4]}`,
      description: `Comfortable ${type.toLowerCase()} perfect for everyday wear`,
      category: 'Clothing',
      subCategory: ['Men', 'Women', 'Unisex'][i % 3],
      sku: `CLOTH-${brand.toUpperCase().replace(/'/g, '')}-${String(i + 1).padStart(3, '0')}`,
      brand: brand,
      specifications: {
        'Material': ['Cotton', '100% Cotton', 'Polyester Blend', 'Denim'][i % 4],
        'Available Sizes': sizes.join(', '),
        'Color Options': 'Multiple'
      },
      unit: 'piece'
    });
  }
  
  // Food (15 products)
  const foodTypes = [
    { name: 'Organic Coffee Beans', brand: 'Starbucks', unit: 'kg' },
    { name: 'Whole Grain Pasta', brand: 'Barilla', unit: 'kg' },
    { name: 'Olive Oil Extra Virgin', brand: 'Bertolli', unit: 'liter' },
    { name: 'Organic Honey', brand: 'Nature Nate', unit: 'kg' },
    { name: 'Green Tea', brand: 'Twinings', unit: 'box' }
  ];
  
  for (let i = 0; i < 15; i++) {
    const food = foodTypes[i % foodTypes.length];
    
    products.push({
      name: `${food.brand} ${food.name} ${i + 1}`,
      description: `Premium quality ${food.name.toLowerCase()}`,
      category: 'Food',
      subCategory: ['Beverages', 'Pantry', 'Organic'][i % 3],
      sku: `FOOD-${food.brand.toUpperCase().replace(/\s/g, '')}-${String(i + 1).padStart(3, '0')}`,
      brand: food.brand,
      specifications: {
        'Type': food.name,
        'Organic': ['Yes', 'No'][i % 2],
        'Packaging': ['Bag', 'Bottle', 'Box'][i % 3]
      },
      unit: food.unit
    });
  }
  
  // Books (15 products)
  const bookGenres = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Technology'];
  const publishers = ['Penguin', 'HarperCollins', 'Simon & Schuster', 'Random House', 'O\'Reilly'];
  
  for (let i = 0; i < 15; i++) {
    const genre = bookGenres[i % bookGenres.length];
    const publisher = publishers[i % publishers.length];
    
    products.push({
      name: `${genre} Book Collection ${i + 1}`,
      description: `Bestselling ${genre.toLowerCase()} book`,
      category: 'Books',
      subCategory: genre,
      sku: `BOOK-${genre.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      brand: publisher,
      specifications: {
        'Genre': genre,
        'Publisher': publisher,
        'Format': ['Hardcover', 'Paperback', 'eBook'][i % 3],
        'Pages': String(200 + (i * 20))
      },
      unit: 'piece'
    });
  }
  
  // Home (25 products)
  const homeTypes = [
    { name: 'Office Chair', brand: 'ErgoMax', subCategory: 'Furniture' },
    { name: 'Standing Desk', brand: 'FlexiSpot', subCategory: 'Furniture' },
    { name: 'LED Desk Lamp', brand: 'Philips', subCategory: 'Lighting' },
    { name: 'Area Rug', brand: 'IKEA', subCategory: 'Decor' },
    { name: 'Storage Cabinet', brand: 'HomeDepot', subCategory: 'Furniture' }
  ];
  
  for (let i = 0; i < 25; i++) {
    const item = homeTypes[i % homeTypes.length];
    
    products.push({
      name: `${item.brand} ${item.name} ${['Classic', 'Modern', 'Premium', 'Deluxe'][i % 4]}`,
      description: `High-quality ${item.name.toLowerCase()} for your home or office`,
      category: 'Home',
      subCategory: item.subCategory,
      sku: `HOME-${item.brand.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      brand: item.brand,
      specifications: {
        'Type': item.name,
        'Material': ['Wood', 'Metal', 'Plastic', 'Fabric'][i % 4],
        'Color Options': 'Multiple'
      },
      unit: 'piece'
    });
  }
  
  // Sports (15 products)
  const sportsBrands = ['Nike', 'Adidas', 'Under Armour', 'Puma', 'Reebok'];
  const sportsItems = ['Running Shoes', 'Yoga Mat', 'Dumbbell Set', 'Resistance Bands', 'Sports Bottle'];
  
  for (let i = 0; i < 15; i++) {
    const brand = sportsBrands[i % sportsBrands.length];
    const item = sportsItems[i % sportsItems.length];
    
    products.push({
      name: `${brand} ${item} Pro`,
      description: `Professional ${item.toLowerCase()} for athletes and fitness enthusiasts`,
      category: 'Sports',
      subCategory: ['Fitness', 'Training', 'Outdoor'][i % 3],
      sku: `SPORTS-${brand.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      brand: brand,
      specifications: {
        'Type': item,
        'Durability': 'High',
        'Suitable For': ['Men', 'Women', 'Unisex'][i % 3]
      },
      unit: item.includes('Set') || item.includes('Bands') ? 'set' : 'piece'
    });
  }
  
  // Other category (5 products)
  const otherItems = [
    { name: 'Smart Watch', brand: 'Fitbit', subCategory: 'Wearables' },
    { name: 'Backpack', brand: 'Samsonite', subCategory: 'Bags' },
    { name: 'Water Purifier', brand: 'Aquaguard', subCategory: 'Appliances' },
    { name: 'Air Purifier', brand: 'Dyson', subCategory: 'Appliances' },
    { name: 'Electric Kettle', brand: 'Hamilton Beach', subCategory: 'Kitchen' }
  ];
  
  for (let i = 0; i < 5; i++) {
    const item = otherItems[i];
    
    products.push({
      name: `${item.brand} ${item.name} ${i + 1}`,
      description: `Quality ${item.name.toLowerCase()} with modern features`,
      category: 'Other',
      subCategory: item.subCategory,
      sku: `OTHER-${item.brand.toUpperCase().replace(/\s/g, '')}-${String(i + 1).padStart(3, '0')}`,
      brand: item.brand,
      specifications: {
        'Type': item.name,
        'Warranty': '1 Year'
      },
      unit: 'piece'
    });
  }
  
  return products;
};

module.exports = { generateProducts };
