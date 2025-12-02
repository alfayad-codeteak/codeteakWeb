# Vercel Deployment Troubleshooting Guide

## Issue: Messages Not Retrieving from Database on Vercel

If messages are not showing up on your Vercel deployment, follow these steps:

### 1. Check Environment Variables in Vercel

**In your Vercel dashboard:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Ensure `MONGODB_URI` is set correctly with the value:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```

**Important:** 
- Make sure the variable is added to **all environments** (Production, Preview, Development)
- After adding/updating environment variables, **redeploy** your application

### 2. Verify MongoDB Connection String Format

Your MongoDB URI should be in this format:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

**Common issues:**
- ❌ Password contains special characters that aren't URL-encoded (use `%40` for `@`, `%23` for `#`, etc.)
- ❌ Missing database name in the URI
- ❌ Incorrect cluster URL

### 3. Check MongoDB Network Access

**In MongoDB Atlas:**
1. Go to "Network Access" in your Atlas dashboard
2. Ensure Vercel's IP addresses are allowed (or use `0.0.0.0/0` to allow all IPs)
3. Click "Add IP Address" if needed

**For testing:** You can temporarily allow all IPs (`0.0.0.0/0`) - remember to restrict later for security.

### 4. Check MongoDB Database User Permissions

**In MongoDB Atlas:**
1. Go to "Database Access"
2. Ensure your database user has read/write permissions
3. Verify the username and password match your connection string

### 5. Check Vercel Logs

**In Vercel Dashboard:**
1. Go to your deployment
2. Click on "Functions" tab
3. Look at the logs for `/api/contact` endpoint
4. Check for error messages like:
   - "MONGODB_URI is not set"
   - Connection timeout errors
   - Authentication errors

**Common log messages to look for:**
- `"MongoDB connection error: ..."`
- `"Database error: ..."`
- `"Failed to fetch submissions from database"`

### 6. Test the API Endpoint Directly

You can test the API endpoint directly using curl or a tool like Postman:

```bash
curl -X GET https://your-domain.vercel.app/api/contact \
  -H "Authorization: Bearer 5374"
```

Expected response:
```json
{
  "success": true,
  "submissions": [...],
  "count": 0,
  "totalCount": 0,
  "page": 1,
  "limit": 100,
  "totalPages": 0,
  "mongoConfigured": true
}
```

**Check the response for:**
- `mongoConfigured: true` - confirms MongoDB URI is set
- `success: true` - confirms the endpoint is working
- If `mongoConfigured: false`, the environment variable is not set correctly

### 7. Verify Data is Being Saved

Check if submissions are actually being saved:
1. Submit a test message through your contact form
2. Check Vercel function logs for the POST request
3. Look for: `"Submission saved to database: ..."` in logs
4. Verify in MongoDB Atlas that the document was created

### 8. Common Vercel-Specific Issues

**Issue: Environment variables not loading**
- Solution: Redeploy after adding environment variables
- Vercel caches environment variables, so changes require a new deployment

**Issue: Cold start delays**
- First request after inactivity may take longer
- Subsequent requests should be faster due to connection caching

**Issue: Serverless function timeout**
- Default timeout is 10 seconds on Hobby plan
- Consider upgrading if you have many messages

### 9. Debug Steps

If still not working, check the browser console on the admin page:
1. Open `/admin/user/message` page
2. Open browser DevTools (F12)
3. Check Console tab for error messages
4. Check Network tab for the `/api/contact` request
5. Look at the response - it should show error details

### 10. Quick Fix Checklist

- [ ] `MONGODB_URI` is set in Vercel environment variables
- [ ] Environment variable is added to Production environment
- [ ] Application has been redeployed after adding environment variable
- [ ] MongoDB Atlas Network Access allows connections from anywhere (0.0.0.0/0)
- [ ] MongoDB database user has read/write permissions
- [ ] Connection string format is correct (includes database name)
- [ ] Password is URL-encoded if it contains special characters
- [ ] Test messages are being saved (check MongoDB Atlas directly)

### Getting Help

If issues persist, check the Vercel function logs for detailed error messages. The improved error handling will now show:
- Whether MongoDB URI is configured
- Specific database connection errors
- Query execution errors

All errors are logged to Vercel's function logs, which you can access in the Vercel dashboard.


