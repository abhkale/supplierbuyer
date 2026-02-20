# Quick Start: Testing Your PWA

This guide will help you test the PWA functionality locally and deploy it for iOS testing.

## Local Testing (Development Mode)

### 1. Start the Application

```bash
# Terminal 1: Start Backend
cd backend
npm install
npm start

# Terminal 2: Start Frontend
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

### 2. Test Service Worker (Production Build Only)

Service Workers only work in production mode or on HTTPS. To test locally:

```bash
cd frontend
npm run build
npx serve -s build -p 3000
```

Open `http://localhost:3000` and check:
- Open DevTools (F12)
- Go to Application tab
- Check "Service Workers" - should show active worker
- Check "Manifest" - should show all PWA details
- Check "Cache Storage" - should show cached files

### 3. Test Offline Functionality

With the production build running:
1. Open the app in Chrome
2. Open DevTools > Network tab
3. Check "Offline" checkbox
4. Refresh the page - app should still work!
5. Navigate between pages - cached pages work offline

## Testing on Android Device

### Option 1: Local Network (Quick Testing)

1. Find your computer's local IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` or `ip addr`

2. Build and serve:
   ```bash
   cd frontend
   npm run build
   npx serve -s build -p 3000
   ```

3. On your Android device (same WiFi):
   - Open Chrome
   - Visit `http://YOUR_IP:3000`
   - **Note:** Service workers require HTTPS, so some features won't work

### Option 2: Deploy to Testing Server (Recommended)

Deploy to a free hosting service with HTTPS:

**Netlify (Recommended for Frontend):**

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod
   ```

3. Follow prompts and get your URL

**Vercel Alternative:**
```bash
npm install -g vercel
cd frontend
vercel --prod
```

4. Test on Android:
   - Open the deployment URL in Chrome
   - Look for "Add to Home screen" prompt
   - Install and test

## Testing on iOS Device

**IMPORTANT:** iOS PWAs ONLY work on Safari with HTTPS!

### Requirements:
- ✅ Safari browser (not Chrome or Firefox)
- ✅ HTTPS enabled website
- ✅ Deployed to a server (not localhost)

### Step 1: Deploy to Production

Use Netlify, Vercel, or any HTTPS hosting:

```bash
# Example with Netlify
cd frontend
npm run build
netlify deploy --prod
```

### Step 2: Test on iPhone/iPad

1. Open Safari on your iOS device
2. Navigate to your deployed URL (must be HTTPS)
3. Tap the **Share button** (📤) at the bottom
4. Scroll down and tap **"Add to Home Screen"**
5. Customize the name if desired
6. Tap **"Add"**

### Step 3: Test PWA Features

After adding to home screen:

1. **Launch the App**
   - Tap the new icon on your home screen
   - App opens in standalone mode (no Safari UI)

2. **Test Offline**
   - Open the app
   - Turn on Airplane Mode
   - Navigate through cached pages
   - Should work offline!

3. **Test Return to App**
   - Close the app
   - Reopen from home screen
   - Should remember your state

## iOS PWA Checklist

Test these features on iOS:

- [ ] App appears on home screen with custom icon
- [ ] Opens in standalone mode (no Safari UI)
- [ ] Status bar matches theme color
- [ ] Splash screen appears on launch
- [ ] Works offline after first visit
- [ ] Navigates without Safari appearing
- [ ] Can take photos/access features
- [ ] Updates when new version deployed

## Common Issues & Solutions

### Issue: "Add to Home Screen" not showing on iOS
**Solution:**
- Ensure you're using Safari (not Chrome)
- Verify site is HTTPS
- Clear Safari cache and try again
- Make sure manifest.json is accessible

### Issue: Service Worker not registering on iOS
**Solution:**
- Check Safari Console for errors
- Verify service-worker.js is in public folder
- Ensure HTTPS is enabled
- Check that file has correct MIME type

### Issue: Icons not displaying correctly
**Solution:**
- Replace SVG placeholders with PNG icons
- Use recommended sizes: 180x180, 192x192, 512x512
- Ensure icons are in public folder
- Clear cache and reinstall

### Issue: App not working offline
**Solution:**
- Check service worker is registered
- Verify caching strategies in service-worker.js
- Test network in DevTools first
- Clear all caches and test fresh install

## Using Chrome DevTools for PWA Testing

### Lighthouse Audit

1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Progressive Web App"
4. Click "Generate report"
5. Aim for score 90+

### Application Panel

Check these sections:
- **Manifest:** All fields populated correctly
- **Service Workers:** Active and running
- **Cache Storage:** Files being cached
- **Offline:** Test with checkbox

### Network Panel

Test caching:
1. Load page with Network panel open
2. Refressh page
3. Check "Size" column - should show "(ServiceWorker)"

## Deployment Configurations

### For Netlify (frontend/netlify.toml):

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/service-worker.js"
  to = "/service-worker.js"
  status = 200
  force = true
  headers = {Cache-Control = "no-cache, no-store, must-revalidate"}

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### For Vercel (vercel.json):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    {
      "src": "/service-worker.js",
      "headers": { "cache-control": "no-cache, no-store, must-revalidate" },
      "dest": "/service-worker.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Performance Tips

1. **Cache Strategies:**
   - Static assets: Cache-first
   - API calls: Network-first with cache fallback
   - Images: Cache-first with network update

2. **Update Strategy:**
   - Service worker auto-updates on page load
   - Show notification when update available
   - Prompt user to refresh

3. **iOS Optimization:**
   - Keep icons under 1MB each
   - Optimize images for mobile
   - Test on older iOS devices (iOS 12+)
   - Minimize service worker file size

## Next Steps

After successful testing:

1. **Replace Placeholder Icons**
   - Create professional logo
   - Generate all required sizes
   - Test on both platforms

2. **Configure Environment**
   - Update API URLs for production
   - Set up environment variables
   - Configure CORS properly

3. **Enable Advanced Features**
   - Push notifications
   - Background sync
   - Offline form submissions

4. **Monitor Performance**
   - Set up analytics
   - Track installation rates
   - Monitor error rates

## Resources

- [Can I Use - PWA Features](https://caniuse.com/?search=service%20worker)
- [iOS Safari PWA Support](https://developer.apple.com/documentation/safari-release-notes)
- [PWA Testing Checklist](https://web.dev/pwa-checklist/)
- [Service Worker Cookbook](https://serviceworke.rs/)

## Getting Help

If you encounter issues:
1. Check browser console for errors
2. Verify all files are in correct locations  
3. Test on multiple devices
4. Check PWA_SETUP.md for detailed documentation

Good luck with your PWA! 🚀
