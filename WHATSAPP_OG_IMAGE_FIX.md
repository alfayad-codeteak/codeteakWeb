# WhatsApp OG Image Fix Guide

## Problem
OG images not showing when sharing links on WhatsApp.

## Solution Implemented

### 1. Absolute URLs
✅ **Fixed**: OG image URLs now always use absolute HTTPS URLs
- WhatsApp requires absolute URLs, not relative paths
- All images now use full URL format: `https://codeteak.com/og-image.jpg`

### 2. Explicit Meta Tags
✅ **Added**: Additional meta tags specifically for WhatsApp:
- `og:image:secure_url` - HTTPS URL for the image
- `og:image:type` - Image MIME type (image/jpeg)
- `og:image:width` - Image width (1200)
- `og:image:height` - Image height (630)
- `og:image:alt` - Alt text for accessibility

### 3. Image Configuration
✅ **Verified**: 
- Image exists: `/public/og-image.jpg`
- Image size: 1200x630 pixels (perfect for WhatsApp)
- Image format: JPEG (WhatsApp preferred format)

## Important: WhatsApp Cache

⚠️ **CRITICAL**: WhatsApp caches OG data very aggressively. Even after fixing the code, WhatsApp may still show old cached data.

### How to Clear WhatsApp Cache

#### Method 1: Use WhatsApp Debug Tool
1. Visit: https://developers.facebook.com/tools/debug/
2. Enter your website URL (e.g., `https://codeteak.com`)
3. Click "Debug" button
4. Scroll down and click "Scrape Again" button
5. Wait for it to fetch fresh data
6. Check the preview to see if OG image appears
7. Try sharing the link again in WhatsApp

#### Method 2: Add Cache Buster Parameter
You can temporarily add a query parameter to force WhatsApp to fetch fresh data:
```
https://codeteak.com/?v=2
https://codeteak.com/?cache_bust=1234567890
```

After confirming it works, you can remove the parameter.

#### Method 3: Wait for Cache Expiry
WhatsApp cache expires after:
- **First scrape**: 7 days
- **After manual refresh**: Varies (usually hours to days)

## Testing Your OG Image

### Step 1: Verify Image is Accessible
Test if the image loads directly:
```
https://codeteak.com/og-image.jpg
```

Should return a 200 OK response and display the image.

### Step 2: Check Meta Tags
View page source and verify these tags exist in `<head>`:
```html
<meta property="og:image" content="https://codeteak.com/og-image.jpg" />
<meta property="og:image:secure_url" content="https://codeteak.com/og-image.jpg" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Your Page Title" />
```

### Step 3: Test with Online Tools

#### Facebook Sharing Debugger
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter your URL
3. Click "Debug"
4. Check the preview shows your image

#### LinkedIn Post Inspector
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter your URL
3. Check preview

#### Twitter Card Validator
1. Go to: https://cards-dev.twitter.com/validator
2. Enter your URL
3. Check preview

### Step 4: Test in WhatsApp
1. Open WhatsApp Web or Mobile
2. Send the link to yourself or a test chat
3. Wait a few seconds for WhatsApp to fetch preview
4. Check if image appears

## Common Issues & Solutions

### Issue 1: Image Still Not Showing
**Possible Causes:**
- WhatsApp cache hasn't expired
- Image URL not accessible (404 error)
- Image size too large (should be under 8MB)
- Image format not supported

**Solutions:**
1. Clear WhatsApp cache using Facebook Debug tool
2. Verify image is accessible: `curl -I https://codeteak.com/og-image.jpg`
3. Check image file size: Should be under 1MB ideally
4. Ensure image is JPEG or PNG format

### Issue 2: Old Image Still Showing
**Solution:** WhatsApp cache - use Facebook Debug tool to refresh

### Issue 3: Image Shows in Facebook but Not WhatsApp
**Solution:** WhatsApp uses its own cache system. Clear it separately using the debug tool.

### Issue 4: Image Shows on Desktop but Not Mobile
**Solution:** 
- Check if image is HTTPS (required)
- Verify image is publicly accessible
- Check mobile network restrictions

## Image Requirements for WhatsApp

- **Format**: JPEG or PNG
- **Size**: Minimum 200x200px, Recommended 1200x630px
- **Aspect Ratio**: 1.91:1 (1200x630) is ideal
- **File Size**: Under 8MB (but under 1MB is better)
- **Protocol**: Must be HTTPS
- **Access**: Must be publicly accessible (no authentication)
- **URL**: Must be absolute (full URL, not relative)

## Verification Checklist

- [ ] Image exists at `/public/og-image.jpg`
- [ ] Image is 1200x630 pixels
- [ ] Image file size is under 1MB
- [ ] Image is accessible via HTTPS: `https://codeteak.com/og-image.jpg`
- [ ] Meta tags include absolute URL
- [ ] Meta tags include `og:image:secure_url`
- [ ] Meta tags include image dimensions
- [ ] Tested with Facebook Debug tool
- [ ] Cleared WhatsApp cache
- [ ] Tested sharing in WhatsApp

## Code Changes Made

### File: `/lib/metadata.ts`
1. ✅ Added absolute URL conversion for OG images
2. ✅ Added `og:image:secure_url` meta tag
3. ✅ Added explicit image type, width, height
4. ✅ Ensured all image URLs are absolute HTTPS

### Testing
After deployment:
1. Clear WhatsApp cache using Facebook Debug tool
2. Wait 5-10 minutes
3. Test sharing link in WhatsApp
4. If still not working, check image accessibility and meta tags

## Next Steps

1. **Deploy Changes**: Push the updated code to production
2. **Clear Cache**: Use Facebook Debug tool to clear WhatsApp cache
3. **Test**: Share link in WhatsApp and verify image appears
4. **Monitor**: Check if image loads consistently

## Additional Notes

- WhatsApp preview cards may take a few seconds to load
- WhatsApp caches previews for several days
- Always test with Facebook Debug tool first before testing in WhatsApp
- If image works in Facebook Debug tool but not WhatsApp, it's likely a cache issue

## Support

If issues persist after:
1. Clearing WhatsApp cache
2. Verifying image is accessible
3. Confirming meta tags are correct

Check:
- Server logs for any 404 errors on the image
- CDN/cloudflare settings that might block image access
- SSL certificate validity (must be valid HTTPS)
- Image serving configuration

