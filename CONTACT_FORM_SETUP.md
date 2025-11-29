# Contact Form Setup Guide

This guide explains how to set up the contact form with email notifications and database storage.

## Features Implemented

✅ **Form Submission Handling** - Both home page and contact page forms are functional
✅ **Email Notifications** - Using Resend API for sending emails
✅ **Auto-Reply Emails** - Automatic confirmation emails to users
✅ **Database Storage** - MongoDB support for storing submissions
✅ **In-Memory Fallback** - Works without database for development

## Setup Instructions

### 1. Email Notifications (Resend)

1. **Sign up for Resend** at [https://resend.com](https://resend.com)

2. **Get your API key** from the Resend dashboard

3. **Add to `.env.local`**:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_TO_EMAIL=hello@codeteak.com
```

4. **Verify your domain** in Resend dashboard (required for production)

### 2. Database Storage (MongoDB - Optional)

#### Option A: MongoDB Atlas (Cloud - Recommended)

1. **Sign up** at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a cluster** (free tier available)

3. **Get connection string** from Atlas dashboard

4. **Add to `.env.local`**:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codeteak
```

#### Option B: Local MongoDB

1. **Install MongoDB** locally

2. **Add to `.env.local`**:
```env
MONGODB_URI=mongodb://localhost:27017/codeteak
```

**Note:** If MongoDB is not configured, submissions will be stored in-memory (lost on server restart).

### 3. Admin API Key (Optional - for retrieving submissions)

1. **Generate a secure random string**:
```bash
openssl rand -base64 32
```

2. **Add to `.env.local`**:
```env
ADMIN_API_KEY=your-generated-secure-key-here
```

## How It Works

### Form Submission Flow

1. User fills out the contact form
2. Form data is validated
3. Submission is stored (database or in-memory)
4. Email notification sent to admin (if Resend configured)
5. Auto-reply email sent to user (if Resend configured)
6. Success message shown to user

### Retrieving Submissions

To retrieve all submissions, make a GET request to `/api/contact`:

```bash
curl -H "Authorization: Bearer YOUR_ADMIN_API_KEY" http://localhost:3000/api/contact
```

## Environment Variables Summary

```env
# Required for email notifications
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_TO_EMAIL=hello@codeteak.com

# Optional - for database storage
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codeteak

# Optional - for admin API access
ADMIN_API_KEY=your-secure-admin-api-key-here
```

## Testing

1. **Without Resend**: Form will work but no emails will be sent
2. **Without MongoDB**: Submissions stored in-memory (temporary)
3. **With both**: Full functionality with email notifications and persistent storage

## Production Checklist

- [ ] Set up Resend account and verify domain
- [ ] Configure MongoDB Atlas or your database
- [ ] Add all environment variables to production environment
- [ ] Test form submission end-to-end
- [ ] Set up proper authentication for admin API (replace simple Bearer token)
- [ ] Consider rate limiting for form submissions
- [ ] Set up monitoring/alerting for failed submissions

## Troubleshooting

### Emails not sending?
- Check Resend API key is correct
- Verify domain is verified in Resend
- Check server logs for error messages

### Database not working?
- Verify MongoDB connection string
- Check network connectivity
- Ensure MongoDB is running (if local)

### Form not submitting?
- Check browser console for errors
- Verify API route is accessible
- Check server logs for errors

