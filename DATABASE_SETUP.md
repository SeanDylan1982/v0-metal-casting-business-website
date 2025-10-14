# Database Setup Guide

This project uses **Neon** as the primary database for storing products, gallery items, and customer inquiries, while **Supabase** is used for authentication.

## Architecture

- **Neon Database**: Stores all application data (products, categories, gallery, inquiries)
- **Supabase Auth**: Handles user authentication and admin access

## Setup Steps

### 1. Run Database Scripts in Neon

You need to execute the SQL scripts in your Neon database to create the necessary tables:

1. Go to your Neon Console: https://console.neon.tech/
2. Select your project: `ep-bold-firefly-adgs8h8p`
3. Navigate to the SQL Editor
4. Run the following scripts in order:

#### Script 1: Create Tables (`scripts/001_create_tables.sql`)
\`\`\`sql
-- Creates: categories, products, gallery, inquiries tables
-- Run this first
\`\`\`

#### Script 2: Seed Initial Data (`scripts/002_seed_data.sql`)
\`\`\`sql
-- Adds initial categories and sample products
-- Run this second
\`\`\`

### 2. Create Admin User in Supabase

Since authentication is handled by Supabase, you need to create an admin user there:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/oaphicfoiasurpczdlyz
2. Navigate to **Authentication** → **Users**
3. Click **Add User** → **Create new user**
4. Enter:
   - **Email**: `francismagoro@gmail.com` (or your preferred admin email)
   - **Password**: Create a secure password
   - **Auto Confirm User**: ✅ Check this box
5. Click **Create User**

### 3. Environment Variables

The following environment variables are already configured in `.env.local`:

<!-- **Supabase (Authentication):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Neon (Database):**
- `DATABASE_URL` (pooled connection)
- `POSTGRES_URL` (pooled connection)
- `POSTGRES_URL_NON_POOLING` (direct connection) -->


For production deployment, add these same variables to your Vercel project settings.

### 4. Test the Setup

1. Visit your website homepage to see the public site
2. Go to `/login` to access the admin dashboard
3. Log in with the admin credentials you created in Supabase
4. You should now be able to manage products, gallery, and view inquiries

## Database Schema

### Categories Table
- `id`: UUID (primary key)
- `name`: Text (unique)
- `slug`: Text (unique)
- `description`: Text
- `created_at`: Timestamp

### Products Table
- `id`: UUID (primary key)
- `name`: Text
- `description`: Text
- `category_id`: UUID (foreign key)
- `price`: Decimal
- `image_url`: Text
- `is_featured`: Boolean
- `created_at`: Timestamp

### Gallery Table
- `id`: UUID (primary key)
- `title`: Text
- `image_url`: Text
- `description`: Text
- `created_at`: Timestamp

### Inquiries Table
- `id`: UUID (primary key)
- `name`: Text
- `email`: Text
- `phone`: Text
- `company`: Text
- `message`: Text
- `inquiry_type`: Text (retail/wholesale)
- `status`: Text (new/contacted/completed)
- `created_at`: Timestamp

## Troubleshooting

### "Failed to fetch" error
- Ensure Supabase environment variables are set correctly
- Check that the Supabase URL doesn't have typos
- Verify the anon key is correct

### Database connection errors
- Verify Neon credentials are correct
- Check that the database exists in Neon
- Ensure SSL mode is enabled (`?sslmode=require`)

### Can't log in
- Verify you created a user in Supabase Authentication
- Check that the user's email is confirmed
- Try resetting the password in Supabase dashboard
