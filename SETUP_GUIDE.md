# Quick Setup Guide for Frafiks Website

## Step-by-Step Setup

### Step 1: Run Database Scripts ✅

In v0, click the "Run Script" button for each of these files in order:

1. **scripts/001_create_tables.sql** - Creates database tables
2. **scripts/002_seed_data.sql** - Adds sample products and categories

### Step 2: Create Admin User 👤

Since Supabase Auth users can't be created via SQL, follow these steps:

1. Open your Supabase Dashboard: https://app.supabase.com
2. Select your project: `oaphicfoiasurpczdlyz`
3. Go to **Authentication** → **Users** (in left sidebar)
4. Click **"Add User"** button (top right)
5. Fill in the form:
   - **Email**: `admin@frafiks.co.za`
   - **Password**: `Admin123!`
   - **Auto Confirm User**: ✅ Check this box
6. Click **"Create User"**

### Step 3: Test Your Login 🔐

1. In v0 preview, navigate to `/login`
2. Enter credentials:
   - Email: `admin@frafiks.co.za`
   - Password: `Admin123!`
3. Click **Sign In**
4. You should be redirected to `/admin` dashboard

### Step 4: Change Default Password 🔒

**IMPORTANT**: Change the default password immediately!

1. In Supabase Dashboard, go to **Authentication** → **Users**
2. Find the admin user you just created
3. Click the **"..."** menu → **"Reset Password"**
4. Set a strong, unique password
5. Save the new password securely

### Step 5: Start Managing Content 📝

You can now:

- **Add Products**: Go to Admin → Products → Add Product
- **Upload Gallery Images**: Go to Admin → Gallery
- **View Inquiries**: Go to Admin → Inquiries
- **Manage Categories**: Products are organized by the 7 default categories

### Step 6: Deploy to Production 🚀

1. Click **"Publish"** button in v0 (top right)
2. Connect to GitHub (if not already connected)
3. Vercel will automatically deploy your site
4. Your site will be live at your Vercel URL

### Step 7: Add Custom Domain (Optional) 🌐

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Domains**
4. Add your domain (e.g., `frafiks.co.za`)
5. Update DNS records as instructed

## Troubleshooting

### Can't log in?
- Verify admin user was created in Supabase Dashboard
- Check that "Auto Confirm User" was enabled
- Verify email and password are correct
- Check browser console for errors

### Products not showing?
- Verify scripts ran successfully
- Check Supabase Dashboard → Table Editor → products
- Ensure `is_featured` is true for products you want on homepage

### Images not loading?
- Images are using Vercel Blob URLs from your uploads
- Check that image URLs in database are valid
- Verify Supabase Storage is configured (if using new uploads)

### Admin dashboard not accessible?
- Check that middleware.ts exists
- Verify you're logged in (check `/login`)
- Check browser console for authentication errors

## Need Help?

- **v0 Support**: https://vercel.com/help
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

## Business Contact

- **Email**: francismagoro@gmail.com
- **Phone**: 072 718 3114
- **WhatsApp**: Click the chat widget on the website
