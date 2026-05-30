# Render Deployment Guide

## Problem: Database Connection Error on Render

When deploying to Render, you may see this error:

```
asyncpg.exceptions.InternalServerError: (ENOTFOUND) tenant/user postgres.ytieuntfceegfnoghpug not found
```

This happens because **the `DATABASE_URL` environment variable is not set on Render**. The `.env` file in your repository is ignored by Git and won't be deployed.

## Solution: Set Environment Variables on Render

### Step 1: Get Your Database Connection String

If using **Supabase**:
1. Go to your Supabase project dashboard
2. Click on "Settings" → "Database"
3. Under "Connection string", select "URI" tab
4. Copy the connection string (should look like: `postgresql+asyncpg://postgres:[PASSWORD]@[REGION].supabase.co:5432/postgres`)

If using another PostgreSQL provider:
- Get your connection string from your database provider's dashboard
- Ensure it uses the `postgresql+asyncpg://` scheme for async support

### Step 2: Add Environment Variables in Render Dashboard

1. **Go to your Render service**
   - Log in to [render.com](https://render.com)
   - Find your backend service (e.g., "sflearnershub-api")

2. **Navigate to Environment variables**
   - In the service page, click on the "Environment" tab
   - Scroll to "Environment Variables"

3. **Add the DATABASE_URL**
   - Click "+ Add Environment Variable"
   - **Key:** `DATABASE_URL`
   - **Value:** Paste your PostgreSQL connection string (the full `postgresql+asyncpg://...` URL)
   - Click "Save"

4. **Add other required variables** (if needed)
   - **SECRET_KEY:** A secure 256-bit random string
     - Generate one using: `python -c "import secrets; print(secrets.token_hex(32))"`
   - **CORS_ORIGINS:** Your frontend URL(s) as a JSON array
     - Example: `["https://yourfrontend.vercel.app"]`

### Step 3: Deploy

Once environment variables are set:
1. **Trigger a redeploy** by pushing a commit, or
2. Go to the service dashboard and click "Manual Deploy" or "Trigger Redeploy"
3. Render will restart your application with the new environment variables

## Verification

After deployment, check the logs to confirm:
- ✅ `INFO: Started server process [PID]`
- ✅ `INFO: Uvicorn running on 0.0.0.0:PORT`
- ❌ NOT seeing the `asyncpg.exceptions.InternalServerError` error

## Important Security Notes

⚠️ **Never commit sensitive values**:
- Don't hardcode database URLs, passwords, or API keys in code
- Always use environment variables
- Keep `.env` files in `.gitignore`

## Common Issues

### Issue: "ENOTFOUND" Error
**Cause:** DATABASE_URL environment variable not set
**Fix:** Make sure you've added it to Render's Environment tab (not in render.yaml if you have one)

### Issue: Connection Timeout
**Cause:** Incorrect host, port, or credentials
**Fix:** Verify your connection string from your database provider

### Issue: Auth Failed "Password Authentication Failed"
**Cause:** Wrong password in connection string
**Fix:** Double-check your database password in the connection URL

### Issue: Database Doesn't Exist
**Cause:** Pointing to wrong database name
**Fix:** Ensure the database name in the connection string matches what you created

## Need Help?

1. Check Render's service logs: Dashboard → Logs tab
2. Verify database is accessible: `psql "your-connection-string"`
3. Test locally with the same connection string in your `.env` file
