# Open Graph (OG) Images Guide

## Overview
Open Graph images are used when your website is shared on social media platforms (Facebook, LinkedIn, Twitter, etc.). They make your links more attractive and increase click-through rates.

## Current Status

✅ **OG Image Already Created**: You have `og-image.jpg` and `og-image.png` in the `/public` folder, which is automatically used as the default OG image for all pages.

## Image Specifications

### Recommended Dimensions
- **Standard OG Image**: 1200 x 630 pixels (1.91:1 aspect ratio)
- **Minimum Size**: 600 x 315 pixels
- **Maximum Size**: 1200 x 1200 pixels
- **File Format**: JPG or PNG
- **File Size**: Keep under 300KB for faster loading

### Current OG Image
- Location: `/public/og-image.jpg` and `/public/og-image.png`
- These are used as default for all pages via the metadata configuration

## Creating Page-Specific OG Images

You can create unique OG images for different pages to improve engagement. Here's how:

### Option 1: Create Individual OG Images

Create specific OG images for key pages:
- `/public/og-home.jpg` - Home page
- `/public/og-services.jpg` - Services page
- `/public/og-products.jpg` - Products page
- `/public/og-yaadro.jpg` - Yaadro product page
- `/public/og-lens.jpg` - Lens product page

Then update the metadata in each layout file or page to use the specific image.

### Option 2: Dynamic OG Image Generation

For dynamic OG images, you can:
1. Use a service like Vercel OG Image Generation
2. Create API routes that generate OG images on-the-fly
3. Use a tool like `@vercel/og` package

## Tools for Creating OG Images

1. **Online Tools**:
   - [Canva](https://www.canva.com/) - Easy drag-and-drop design
   - [Figma](https://www.figma.com/) - Professional design tool
   - [Bannerbear](https://www.bannerbear.com/) - Automated OG image generation

2. **Design Templates**:
   - Include your logo
   - Add page title
   - Include key value proposition
   - Use brand colors (#FC4B01 for CodeTeak)

## Current Implementation

The OG images are configured in `/lib/metadata.ts`:
```typescript
const defaultImage = `${baseUrl}/og-image.jpg`;
```

This image is automatically used for all pages unless overridden in page-specific metadata.

## Testing OG Images

### Facebook Sharing Debugger
1. Visit: https://developers.facebook.com/tools/debug/
2. Enter your page URL
3. Click "Scrape Again" to refresh cached data
4. View how your image appears

### Twitter Card Validator
1. Visit: https://cards-dev.twitter.com/validator
2. Enter your page URL
3. Preview how it appears on Twitter

### LinkedIn Post Inspector
1. Visit: https://www.linkedin.com/post-inspector/
2. Enter your page URL
3. Preview LinkedIn sharing appearance

## Best Practices

1. **Text on Images**: Keep text minimal and readable
2. **Brand Consistency**: Use consistent branding across all OG images
3. **Mobile Preview**: Check how images look on mobile devices
4. **File Size**: Optimize images for fast loading
5. **Update Regularly**: Refresh OG images periodically to stay current

## Quick Checklist

- [x] Default OG image exists (`/public/og-image.jpg`)
- [ ] Create page-specific OG images (optional)
- [ ] Test OG images on social platforms
- [ ] Verify images load correctly
- [ ] Check image dimensions and file size
- [ ] Ensure brand consistency

## Next Steps

1. **Test Current OG Image**: Use the social media debuggers above to see how your current `og-image.jpg` appears
2. **Create Page-Specific Images** (optional): If you want unique images for different pages
3. **Update Metadata** (if creating custom images): Modify page layouts to reference specific OG images

For example, to add a custom OG image for the services page, update `/app/services/layout.tsx`:
```typescript
export const metadata: Metadata = generateSEOMetadata({
  // ... other metadata
  image: `${baseUrl}/og-services.jpg`,
});
```

