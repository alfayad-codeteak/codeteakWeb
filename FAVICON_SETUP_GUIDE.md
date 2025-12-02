# Favicon Setup Guide

## Current Status

✅ **Favicon Exists**: You already have `/app/favicon.ico` in your project, which Next.js automatically uses.

## Required Favicon Files

For optimal compatibility across all devices and platforms, you should create the following favicon files in your `/public` directory:

### Essential Files

1. **favicon.ico** (16x16, 32x32, 48x48 pixels)
   - Location: `/app/favicon.ico` (already exists) or `/public/favicon.ico`
   - This is the classic favicon that works everywhere

2. **icon-192.png** (192x192 pixels)
   - Location: `/public/icon-192.png`
   - Used for Android home screen icons and PWA

3. **icon-512.png** (512x512 pixels)
   - Location: `/public/icon-512.png`
   - Used for Android home screen icons and PWA (high resolution)

4. **apple-icon.png** (180x180 pixels)
   - Location: `/public/apple-icon.png`
   - Used for iOS home screen icons (Apple Touch Icon)

## Current Configuration

The favicon configuration is already set up in `/lib/metadata.ts`:

```typescript
icons: {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
  apple: [
    { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
  ],
}
```

## How to Create Favicons

### Option 1: Online Favicon Generators (Easiest)

1. **RealFaviconGenerator** (https://realfavicongenerator.net/)
   - Upload your logo/image
   - Generates all required sizes
   - Provides code and files ready to download

2. **Favicon.io** (https://favicon.io/)
   - Generate from text, image, or emoji
   - Download complete favicon package

3. **Favicon Generator** (https://www.favicon-generator.org/)
   - Upload image and generate all formats

### Option 2: Manual Creation

Using design tools like:
- **Figma** - Export at different sizes
- **Photoshop** - Create canvas and export
- **GIMP** - Free alternative

### Option 3: Use Existing Logo

If you have the CodeTeak logo:
1. Use `/public/logo/logo-black.svg` or `/public/logo/logo-white.svg`
2. Convert to PNG at required sizes
3. Save in `/public` directory

## File Specifications

### favicon.ico
- **Format**: ICO (multi-size)
- **Sizes**: 16x16, 32x32, 48x48 pixels
- **Colors**: Can be 256 colors or more
- **Background**: Transparent or solid

### icon-192.png
- **Format**: PNG
- **Size**: 192x192 pixels
- **Background**: Solid color or transparent
- **Purpose**: Android and PWA icons

### icon-512.png
- **Format**: PNG
- **Size**: 512x512 pixels
- **Background**: Solid color or transparent
- **Purpose**: High-resolution Android and PWA icons

### apple-icon.png
- **Format**: PNG
- **Size**: 180x180 pixels
- **Background**: No transparency (iOS requirement)
- **Purpose**: iOS home screen icon

## Design Tips

1. **Keep it Simple**: Favicons are small, so use simple, recognizable designs
2. **High Contrast**: Ensure visibility at small sizes
3. **Brand Consistency**: Use your brand colors (#FC4B01 for CodeTeak)
4. **Square Format**: All favicons should be square
5. **Safe Zone**: Keep important elements away from edges (10% padding)

## Testing

After adding favicons, test them:

1. **Browser Tab**: Check favicon appears in browser tabs
2. **Bookmarks**: Check when bookmarking the site
3. **Mobile**: Test on iOS and Android devices
4. **PWA**: Test as PWA install icon

## Quick Checklist

- [x] `favicon.ico` exists (in `/app` folder)
- [ ] Create `/public/icon-192.png` (192x192)
- [ ] Create `/public/icon-512.png` (512x512)
- [ ] Create `/public/apple-icon.png` (180x180)
- [ ] Test favicons in browser
- [ ] Test on mobile devices
- [ ] Verify PWA icon works

## Next Steps

1. **Generate Favicons**: Use one of the online generators above
2. **Place Files**: Save generated files to `/public` directory
3. **Test**: Verify favicons appear correctly
4. **Optional**: Create additional sizes for better device support

## Additional Resources

- [MDN: Favicon Guide](https://developer.mozilla.org/en-US/docs/Web/Manifest/icons)
- [Web.dev: Add a Web App Manifest](https://web.dev/add-manifest/)
- [Apple: Human Interface Guidelines - Icons](https://developer.apple.com/design/human-interface-guidelines/app-icons)

