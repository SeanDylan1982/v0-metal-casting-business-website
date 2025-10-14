# Neon Database Setup Guide

## Quick Setup

Your Neon database is configured and ready. Follow these steps to set up the database schema:

### Step 1: Run the SQL Scripts

You need to execute two SQL scripts in your Neon database console:

1. **Go to Neon Console**: https://console.neon.tech
2. **Select your project**: `ep-bold-firefly-adgs8h8p`
3. **Open SQL Editor**
4. **Run the scripts in order**:

#### Script 1: Create Tables (001_create_tables.sql)

Copy and paste the contents of `scripts/001_create_tables.sql` into the SQL editor and execute it.

This will create:
- `categories` table
- `products` table
- `product_images` table
- `gallery` table
- `inquiries` table

#### Script 2: Seed Data (002_seed_data.sql)

Copy and paste the contents of `scripts/002_seed_data.sql` into the SQL editor and execute it.

This will populate:
- 7 product categories
- 6 sample products with your images
- 6 gallery items

### Step 2: Verify the Setup

Run this query to verify everything is set up correctly:

\`\`\`sql
SELECT 
  (SELECT COUNT(*) FROM categories) as categories_count,
  (SELECT COUNT(*) FROM products) as products_count,
  (SELECT COUNT(*) FROM gallery) as gallery_count;
\`\`\`

You should see:
- 7 categories
- 6 products
- 6 gallery items

### Step 3: Create Admin User in Supabase

Since authentication is handled by Supabase:

1. Go to: https://supabase.com/dashboard/project/oaphicfoiasurpczdlyz
2. Navigate to: **Authentication** → **Users**
3. Click **Add User** → **Create new user**
4. Enter:
   - Email: `francismagoro@gmail.com`
   - Password: Choose a secure password
   - Auto Confirm User: ✓ (checked)
5. Click **Create user**

### Step 4: Access Your Website

- **Public Website**: Your preview URL
- **Admin Login**: `/login`
- **Admin Dashboard**: `/admin` (after login)

## Database Connection Details

Your environment is configured with:

\`\`\`
DATABASE_URL=process.env.DATABASE_URL
\`\`\`

## Architecture

- **Neon**: Stores all application data (products, categories, gallery, inquiries)
- **Supabase**: Handles user authentication only
- **Next.js Server Actions**: Bridge between frontend and Neon database

## Troubleshooting

If you see "relation does not exist" errors:
- Make sure you ran both SQL scripts in order
- Check that you're connected to the correct database (`neondb`)
- Verify the scripts completed without errors

If you can't log in:
- Verify you created a user in Supabase
- Check that the email matches what you're trying to log in with
- Make sure "Auto Confirm User" was checked when creating the user
