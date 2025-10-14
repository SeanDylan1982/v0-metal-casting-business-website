# Quick Setup Instructions for Frafiks Melting & Casting Website

## ⚠️ Important: Environment Variables Required

Your website is ready, but you need to add environment variables to make it work.

## Step 1: Add Environment Variables to Vercel

1. **Open the Vars section** in the in-chat sidebar (left side of your screen)
2. **Add these two variables:**

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://oaphicfoiasurpczdlyz.supabase.co`

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hcGhpY2ZvaWFzdXJwY3pkbHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODIwODAsImV4cCI6MjA3NTk1ODA4MH0.39-Iiz7UHeh6QVr4xH21XWMiO7fwcB7daeTpsQhfMbg`

3. **Save** and your app will automatically redeploy

## Step 2: Setup Database Tables

1. Go to your [Supabase SQL Editor](https://supabase.com/dashboard/project/oaphicfoiasurpczdlyz/sql/new)
2. Run the scripts in order:
   - First: `scripts/001_create_tables.sql`
   - Second: `scripts/002_seed_data.sql`

## Step 3: Create Admin User

1. Go to [Supabase Authentication](https://supabase.com/dashboard/project/oaphicfoiasurpczdlyz/auth/users)
2. Click **"Add User"** → **"Create new user"**
3. Enter:
   - Email: `francismagoro@gmail.com`
   - Password: (choose a secure password)
   - ✅ Enable "Auto Confirm User"
4. Click **"Create user"**

## Step 4: Access Your Website

Once the environment variables are added and the app redeploys:

- **Homepage:** `/` - Your public website
- **Setup Guide:** `/setup` - Detailed setup instructions
- **Admin Login:** `/login` - Login with your email and password
- **Admin Dashboard:** `/admin` - Manage products, gallery, and inquiries

## Troubleshooting

If you see "Failed to fetch" errors:
- Make sure both environment variables are added in the Vars section
- Wait for the automatic redeployment to complete
- Refresh your browser

If you can't login:
- Verify you created the admin user in Supabase
- Make sure you enabled "Auto Confirm User"
- Check that you're using the correct email and password

## Need Help?

Visit `/setup` in your deployed app for a detailed interactive setup guide.
