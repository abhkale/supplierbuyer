const fs = require('fs');
const path = require('path');

// Icon generator using Canvas (if available) or simple SVG placeholders
// This creates placeholder icons for testing PWA functionality

const PUBLIC_DIR = path.join(__dirname, 'public');

// Icon configurations
const icons = [
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'apple-touch-icon-152x152.png', size: 152 },
  { name: 'apple-touch-icon-167x167.png', size: 167 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-16x16.png', size: 16 }
];

// Create SVG icon as placeholder
function createSVGIcon(size, text = 'SB') {
  const fontSize = Math.floor(size * 0.5);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#3b82f6"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
        font-size="${fontSize}" font-family="Arial, sans-serif" 
        font-weight="bold" fill="white">${text}</text>
</svg>`;
}

// Check if we can use canvas (requires canvas npm package)
let canvasAvailable = false;
try {
  const { createCanvas } = require('canvas');
  canvasAvailable = true;
} catch (e) {
  console.log('Canvas not available, will create SVG placeholders');
  console.log('For PNG icons, install canvas: npm install canvas');
}

// Generate icons
function generateIcons() {
  console.log('Generating PWA icons...');

  // Ensure public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error('Public directory not found:', PUBLIC_DIR);
    process.exit(1);
  }

  if (canvasAvailable) {
    const { createCanvas } = require('canvas');
    
    icons.forEach(({ name, size }) => {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');

      // Blue background
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(0, 0, size, size);

      // White text
      ctx.fillStyle = 'white';
      ctx.font = `bold ${Math.floor(size * 0.5)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SB', size / 2, size / 2);

      // Save as PNG
      const buffer = canvas.toBuffer('image/png');
      const filePath = path.join(PUBLIC_DIR, name);
      fs.writeFileSync(filePath, buffer);
      console.log(`✓ Created ${name}`);
    });
  } else {
    // Create SVG files as fallback
    icons.forEach(({ name, size }) => {
      const svgName = name.replace('.png', '.svg');
      const svg = createSVGIcon(size);
      const filePath = path.join(PUBLIC_DIR, svgName);
      fs.writeFileSync(filePath, svg);
      console.log(`✓ Created ${svgName} (SVG placeholder)`);
    });
    
    console.log('\n⚠️  Note: Created SVG placeholders instead of PNG files.');
    console.log('For production, please:');
    console.log('1. Install canvas: npm install canvas');
    console.log('2. Re-run this script to generate PNG icons');
    console.log('3. Or use an online icon generator like https://www.pwabuilder.com/imageGenerator');
  }

  // Create a simple favicon.ico placeholder
  const faviconPath = path.join(PUBLIC_DIR, 'favicon.ico');
  if (!fs.existsSync(faviconPath)) {
    // Create a simple ICO file (this is just a placeholder, use a real ICO for production)
    console.log('\n⚠️  Note: favicon.ico not created (requires special ICO format)');
    console.log('Use an online converter to create favicon.ico from your logo');
  }

  console.log('\n✓ Icon generation complete!');
  console.log('\nNext steps:');
  console.log('1. Replace placeholder icons with your actual logo/branding');
  console.log('2. Generate iOS splash screens (optional)');
  console.log('3. Test the PWA on mobile devices');
}

// Run the generator
try {
  generateIcons();
} catch (error) {
  console.error('Error generating icons:', error);
  process.exit(1);
}
