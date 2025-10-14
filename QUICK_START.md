# Quick Start Guide - Frafiks Melting & Casting Website

## Environment Variables Already Configured ✓

Your Supabase credentials are now set up:
- **Project URL**: https://oaphicfoiasurpczdlyz.supabase.co
- **Anon Key**: Configured
- **Database URL**: Configured

## Next Steps

### 1. Run Database Scripts

Execute these scripts in your Supabase SQL Editor (https://supabase.com/dashboard/project/oaphicfoiasurpczdlyz/sql):

**Script 1: Create Tables** (`scripts/001_create_tables.sql`)
- Creates categories, products, gallery_items, and inquiries tables
- Sets up Row Level Security (RLS) policies

**Script 2: Seed Initial Data** (`scripts/002_seed_data.sql`)
- Adds product categories (Potjie Pots, Religious Art, Jewelry, etc.)
- Adds your initial products with images
- Populates gallery with your provided images

### 2. Create Admin User

In Supabase Dashboard → Authentication → Users:
1. Click "Add User" → "Create new user"
2. Email: `francismagoro@gmail.com` (or your preferred admin email)
3. Password: Choose a secure password
4. Auto Confirm User: ✓ (check this box)
5. Click "Create user"

### 3. Access Your Website

**Public Website**: `/`
- View products, gallery, contact form
- WhatsApp chat widget (072 718 3114)

**Admin Dashboard**: `/login`
- Log in with your admin credentials
- Manage products, gallery, and inquiries

## Admin Dashboard Features

Once logged in at `/admin`:
- **Dashboard**: Overview of products, gallery items, and inquiries
- **Products**: Add, edit, delete products with images
- **Gallery**: Manage gallery images and videos
- **Inquiries**: View and respond to customer inquiries

## Contact Information

- **Business**: Frafiks Melting and Casting Pty Ltd
- **Email**: francismagoro@gmail.com
- **Phone**: 072 718 3114
- **WhatsApp**: Integrated on website

## Troubleshooting

If you see authentication errors:
1. Ensure database scripts have been run
2. Verify admin user is created in Supabase
3. Check that email is confirmed in Supabase dashboard

For database connection issues:
1. Verify environment variables in Vercel dashboard
2. Check Supabase project is active
3. Ensure RLS policies are enabled
