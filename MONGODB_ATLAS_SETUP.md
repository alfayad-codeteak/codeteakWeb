# MongoDB Atlas Setup Guide for Vercel Deployment

## Issue: MongoDB Connection Fails on Vercel

If you're seeing this error:
```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. 
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

This means your MongoDB Atlas cluster is blocking connections from Vercel's servers.

## Solution: Whitelist IP Addresses in MongoDB Atlas

### Step 1: Access Network Access Settings

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your project/cluster
3. Click on **"Network Access"** in the left sidebar (under Security)

### Step 2: Add IP Whitelist Entry

**Option A: Allow All IPs (Easiest for Vercel)**

1. Click **"Add IP Address"**
2. Click **"Allow Access from Anywhere"** button
3. This will add `0.0.0.0/0` to your whitelist
4. Click **"Confirm"**

**Note:** This allows connections from any IP address. For production, consider restricting this after testing.

**Option B: Allow Only Vercel IPs (More Secure)**

Vercel uses dynamic IP addresses, so the best approach is to use Option A. However, if you want to be more restrictive:

1. Go to [Vercel's IP ranges documentation](https://vercel.com/docs/concepts/edge-network/regions)
2. Add each IP range to your MongoDB Atlas whitelist

### Step 3: Wait for Changes to Take Effect

- MongoDB Atlas updates the IP whitelist within **1-2 minutes**
- You may need to wait a bit before the changes propagate

### Step 4: Verify Your Connection String

Make sure your `MONGODB_URI` environment variable in Vercel is correctly formatted:

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

**Important:**
- Replace `<username>` with your MongoDB Atlas username
- Replace `<password>` with your MongoDB Atlas password (URL-encoded if it contains special characters)
- Replace `<cluster>` with your cluster address
- Replace `<database>` with your database name

### Step 5: Check Database User Permissions

1. In MongoDB Atlas, go to **"Database Access"** (under Security)
2. Make sure your database user has:
   - **Atlas admin** role, OR
   - **Read and write to any database** permissions

### Step 6: Verify Environment Variable in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Verify `MONGODB_URI` is set correctly
4. Make sure it's added to **Production**, **Preview**, and **Development** environments
5. **Redeploy** your application after adding/updating the variable

## Quick Checklist

- [ ] MongoDB Atlas Network Access allows `0.0.0.0/0` (all IPs)
- [ ] Database user has proper read/write permissions
- [ ] `MONGODB_URI` environment variable is set in Vercel
- [ ] Connection string format is correct
- [ ] Password is URL-encoded if it contains special characters
- [ ] Application has been redeployed after setting environment variables

## Testing the Connection

After making these changes:

1. **Wait 1-2 minutes** for MongoDB Atlas changes to propagate
2. **Redeploy** your Vercel application
3. Try submitting a contact form
4. Check Vercel function logs to see if connection succeeds
5. Visit `/admin/user/message` to see if messages are retrieved

## Troubleshooting

### Still getting connection errors?

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Look at logs for `/api/contact` endpoint
   - Check for specific error messages

2. **Test Connection String Locally:**
   - Copy your `MONGODB_URI` from Vercel
   - Test it in a local MongoDB client or Node.js script
   - If it works locally but not on Vercel, it's likely an IP whitelist issue

3. **Verify Network Access:**
   - Double-check MongoDB Atlas Network Access settings
   - Make sure `0.0.0.0/0` is in the list
   - Check if there are any conflicting rules

4. **Check Database User:**
   - Verify the user exists and is active
   - Check if password has special characters that need URL encoding
   - Try resetting the password if needed

## Security Note

Allowing `0.0.0.0/0` (all IPs) is convenient but less secure. For production:

1. Use strong database passwords
2. Limit database user permissions to only what's needed
3. Consider using MongoDB Atlas private endpoints if available
4. Monitor your database access logs regularly

## Additional Resources

- [MongoDB Atlas Network Access Documentation](https://www.mongodb.com/docs/atlas/security-whitelist/)
- [Vercel Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [MongoDB Connection String Guide](https://www.mongodb.com/docs/manual/reference/connection-string/)


