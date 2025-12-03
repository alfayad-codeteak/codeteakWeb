# Splash Screen Testing Guide

## Issue Fixed
The splash screen wasn't showing because:
1. SessionStorage was preventing it from showing if you had already visited the site
2. The component needed better mounting logic

## How to Test

### Method 1: Clear Session Storage (Recommended)
1. Open your browser's Developer Console (F12 or Right-click → Inspect)
2. Go to the **Console** tab
3. Type: `sessionStorage.removeItem("splashShown")`
4. Press Enter
5. Refresh the page (F5 or Ctrl+R)
6. The splash screen should now appear!

### Method 2: Use Incognito/Private Window
1. Open a new Incognito/Private browsing window
2. Navigate to your website
3. The splash screen should appear (since there's no sessionStorage in a new session)

### Method 3: Clear All Site Data
1. Open Developer Tools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Clear site data** or **Clear storage**
4. Refresh the page

## What to Expect

1. **White Background**: Full-screen white background
2. **Centered Video**: Video from `/public/videos/splash.mp4` centered on screen
3. **Auto-Play**: Video starts playing automatically (muted)
4. **Auto-Hide**: Splash screen fades out when video ends
5. **One-Time**: Shows only once per browser session

## Troubleshooting

### Splash Screen Still Not Showing?

1. **Check Browser Console**:
   - Open Developer Tools (F12)
   - Look for any errors in the Console tab
   - Check if you see "Splash video loaded successfully" message

2. **Verify Video File**:
   - Make sure `/public/videos/splash.mp4` exists
   - Check file size (should be accessible)
   - Try accessing directly: `http://localhost:3000/videos/splash.mp4` (or your domain)

3. **Check Network Tab**:
   - Open Developer Tools → Network tab
   - Refresh the page
   - Look for `splash.mp4` request
   - Check if it returns 200 OK status

4. **Check Component Rendering**:
   - The splash screen has `z-index: 9999`
   - It should appear above all other content
   - Check if there are any CSS conflicts

### Video Not Playing?

1. **Check Video Format**:
   - Ensure video is MP4 format
   - Check video codec compatibility

2. **Check Browser Support**:
   - Modern browsers support MP4
   - Try in different browsers

3. **Check Console Errors**:
   - Look for video-related errors
   - Check if autoplay is blocked (some browsers block autoplay)

### Splash Shows But Video Doesn't Load?

1. **Check File Path**:
   - Verify `/public/videos/splash.mp4` exists
   - Path should be `/videos/splash.mp4` (without `/public`)

2. **Check File Permissions**:
   - Ensure file is readable
   - Check server configuration

## Code Changes Made

1. ✅ Fixed mounting logic to prevent hydration issues
2. ✅ Added proper sessionStorage checking
3. ✅ Added loading spinner while video loads
4. ✅ Added error handling for video loading
5. ✅ Added `preload="auto"` for better video loading
6. ✅ Added `onCanPlay` handler to ensure video plays

## Temporary Testing Mode

To always show the splash screen (for testing), you can temporarily modify the component:

In `/app/components/SplashScreen.tsx`, uncomment this line in the `useEffect`:
```typescript
// sessionStorage.removeItem("splashShown");
```

This will clear the sessionStorage every time, allowing you to test the splash screen repeatedly.

## Production Behavior

- Shows once per browser session
- Hides automatically when video ends
- Won't show again until browser session is closed
- Uses sessionStorage (not localStorage) so it resets when you close the browser

