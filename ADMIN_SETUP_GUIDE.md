# SF Learners Hub - Admin Setup & Search Fix Guide

## What Was Fixed

### 1. Search Functionality ✅
- **Problem**: Frontend was using mock data instead of calling the real backend API
- **Solution**: Changed `USE_MOCK_DATA` from `true` to `false` in `frontend/lib/config.ts`
- **Result**: Search now calls the actual backend `/api/search` endpoint

### 2. Admin Panel Access ✅
- **Problem**: No way to create admin users - all new users got `role = "reader"` 
- **Solution**: Added two new backend endpoints:
  - `/api/auth/create-admin` - Create a new admin user directly
  - `/api/auth/promote-admin/{user_id}` - Promote existing user to admin
- **Result**: You can now create admin accounts and login to the admin panel

---

## How to Create Your First Admin Account

### Option A: Using the Python Script (Recommended for development)

1. Open a terminal in the backend directory:
```bash
cd e:\SFlearnershub\backend
```

2. Create an admin user:
```bash
python create_admin.py admin@sflearnershub.com admin_user MySecurePassword "Admin User"
```

**Example output:**
```
✅ Admin user created successfully!
   Email: admin@sflearnershub.com
   Username: admin_user
   Full Name: Admin User
   Role: admin
   Status: active
```

### Option B: Using the API Endpoint Directly

1. Make a POST request to `http://localhost:8000/api/auth/create-admin`:

```bash
curl -X POST "http://localhost:8000/api/auth/create-admin" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@sflearnershub.com",
    "username": "admin_user",
    "password": "MySecurePassword",
    "full_name": "Admin User"
  }'
```

---

## How to Test the Admin Panel

### 1. Start the Backend
```bash
cd e:\SFlearnershub\backend
python -m uvicorn app.main:app --reload --port 8000
```

The API will be available at: `http://localhost:8000`
Swagger docs: `http://localhost:8000/api/docs`

### 2. Start the Frontend
```bash
cd e:\SFlearnershub\frontend
npm run dev
```

The frontend will be available at: `http://localhost:3000`

### 3. Login to Admin Panel
1. Go to: `http://localhost:3000/auth/login`
2. Enter your admin credentials (created in step above)
3. You'll be redirected to `/admin` dashboard
4. You should see:
   - ✅ Admin stats (Published posts, Draft posts, Categories, Tags, Views)
   - ✅ List of all blog posts
   - ✅ Options to create, edit, delete posts
   - ✅ Manage categories and tags

---

## How to Test the Search Functionality

### 1. Visit the Search Page
- Go to: `http://localhost:3000/search`

### 2. Test Search Options
- **Text Search**: Type a keyword in the search box and press Enter
  - Try searching for: "Salesforce", "API", "Cloud", etc.
  - The backend will perform full-text search using PostgreSQL

- **Filter by Category**: Select a category from the dropdown
  - Should filter posts by selected category

- **Filter by Difficulty**: Choose difficulty level
  - Beginner, Intermediate, Advanced

- **Pagination**: Navigate through pages using pagination controls

### 3. Expected Results
- Search results should display matching blog posts
- Each result shows:
  - Post title and excerpt
  - Featured image
  - Difficulty level
  - Reading time
  - Published date
  - View count

---

## Database Configuration

Your backend is connected to PostgreSQL:
```
Database: postgres (Supabase)
Host: db.ytieuntfceegfnoghpug.supabase.co
Port: 5432
User: postgres
```

✅ The database already has the necessary tables and blog data.

---

## API Endpoints Reference

### Auth Endpoints
```
POST   /api/auth/login              - Login user
POST   /api/auth/register           - Register new user
POST   /api/auth/create-admin       - Create admin user
POST   /api/auth/promote-admin/{id} - Promote user to admin
```

### Search Endpoint
```
GET    /api/search?q=<query>&page=1&per_page=12
       ?category=<slug>
       ?difficulty=<beginner|intermediate|advanced>
```

### Admin Endpoints (Protected)
```
GET    /api/admin/stats    - Get dashboard statistics
GET    /api/admin/posts    - List all posts (paginated)
```

### Blog Endpoints
```
GET    /api/blogs                    - List published blogs
GET    /api/blogs/featured           - Get featured blogs
GET    /api/blogs/<slug>             - Get single blog post
POST   /api/blogs                    - Create blog (admin only)
PUT    /api/blogs/<slug>             - Update blog (admin only)
DELETE /api/blogs/<slug>             - Delete blog (admin only)
```

---

## Troubleshooting

### "Invalid credentials" error when logging in
- Make sure you created the admin user correctly
- Verify the database connection is working
- Check backend logs for errors

### Search returns no results
- Make sure `USE_MOCK_DATA = false` in `frontend/lib/config.ts`
- Verify backend is running on correct port (8000)
- Check browser console for API errors
- Ensure database has blog posts in the `posts` table

### Admin stats not loading
- Check that you're logged in with a user that has `role = "admin"`
- Verify the JWT token is stored in localStorage
- Check backend logs for 403 Forbidden errors

### CORS errors
- Backend CORS is set to accept all origins (`"*"`)
- If you see CORS errors, check backend logs

---

## Next Steps

1. ✅ Create your admin account
2. ✅ Login to admin panel
3. ✅ Test search functionality
4. 📝 Create/publish some blog posts
5. 📝 Set up categories and tags
6. 📝 Deploy to production

---

## Files Modified

1. `frontend/lib/config.ts` - Disabled mock data
2. `backend/app/api/routes/auth.py` - Added create-admin and promote-admin endpoints
3. `backend/create_admin.py` - New script to create admin users from CLI

---

**Support**: If you encounter any issues, check the backend logs and browser console for error messages.
