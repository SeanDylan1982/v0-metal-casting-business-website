[![Netlify Status](https://api.netlify.com/api/v1/badges/08c603c2-1e26-4dfd-af1f-f467013804e0/deploy-status)](https://app.netlify.com/projects/frafiks/deploys)

[Preview](https://frafiks.netlify.app/)

# Frafiks Melting & Casting - Business Website

Professional business website for Frafiks Melting and Casting Pty Ltd, a South African metal casting company specializing in custom molded metal products.

## Features

### Public Website
- **Hero Section**: Eye-catching introduction with call-to-action
- **About Section**: Company story and capabilities
- **Product Showcase**: Featured products with category filtering
- **Process Overview**: Visual explanation of the metal casting process
- **Gallery**: Image gallery showcasing products and production
- **Contact Form**: Customer inquiry form with retail/wholesale options
- **Live Chat**: WhatsApp integration for instant communication

### Admin Dashboard
- **Product Management**: Add, edit, and delete products
- **Category Management**: Organize products into categories
- **Gallery Management**: Upload and manage gallery images
- **Inquiry Management**: View and respond to customer inquiries
- **Secure Authentication**: Protected admin routes with Supabase Auth

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **TypeScript**: Full type safety

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ installed
- Supabase account and project created
- Vercel account (for deployment)

### 2. Environment Variables

The following environment variables are already configured in your v0 project:

\`\`\`env
POSTGRES_URL=your_postgres_url
POSTGRES_PRISMA_URL=your_prisma_url
POSTGRES_URL_NON_POOLING=your_non_pooling_url
POSTGRES_PASSWORD=your_password
\`\`\`

You also need to add these Supabase-specific variables:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 3. Database Setup

Run the SQL scripts in order to set up your database:

1. **Create Tables**: Run `scripts/001_create_tables.sql`
   - Creates all necessary tables (categories, products, gallery, inquiries)
   - Sets up Row Level Security policies
   - Configures public read access and admin write access

2. **Seed Data**: Run `scripts/002_seed_data.sql`
   - Inserts default product categories
   - Adds sample products with your provided images
   - Populates gallery with production photos

3. **Create Admin User**: Run `scripts/003_create_admin.sql`
   - Creates an admin user account
   - Default credentials: admin@frafiks.co.za / Admin123!
   - **IMPORTANT**: Change this password immediately after first login

### 4. Running the Scripts

In v0, you can run these scripts directly:
1. Click the "Run Script" button next to each script file
2. Scripts will execute in your connected Supabase database
3. Check the console for success/error messages

### 5. First Login

1. Navigate to `/login`
2. Use the default admin credentials:
   - Email: ``
   - Password: `!`
3. You'll be redirected to the admin dashboard at `/admin`
4. **Change your password immediately** in Supabase dashboard

### 6. Admin Dashboard Usage

#### Managing Products
- Navigate to **Products** in the admin menu
- Click **Add Product** to create new products
- Edit or delete existing products
- Toggle featured status to show products on homepage
- Upload product images (stored in Supabase Storage)

#### Managing Gallery
- Navigate to **Gallery** in the admin menu
- Upload new images with titles and descriptions
- Reorder images by changing display order
- Toggle visibility to show/hide images on public site

#### Managing Inquiries
- Navigate to **Inquiries** in the admin menu
- View all customer inquiries with contact details
- Update inquiry status (New → Read → Responded)
- Filter by inquiry type (Retail vs Wholesale)

## Business Information

- **Company**: Frafiks Melting and Casting Pty Ltd
- **Email**: francismagoro@gmail.com
- **Phone**: 072 718 3114
- **Location**: South Africa

## Product Categories

1. **Potjie Pots**: Traditional South African cooking pots
2. **Religious Art**: Metal crosses and decorative pieces
3. **Jewelry**: Custom cast metal jewelry
4. **Home Decor**: Decorative metal pieces
5. **Garden Ornaments**: Outdoor metal decorations
6. **Camping & Survival**: Practical outdoor gear
7. **Custom Orders**: Bespoke metal casting services

## Live Chat

The website includes a WhatsApp live chat widget that connects directly to the business phone number (072 718 3114). Customers can click the chat button to start a conversation on WhatsApp.

## Deployment

### Deploy to Vercel

1. Click the **Publish** button in v0
2. Connect your GitHub repository
3. Vercel will automatically deploy your site
4. Environment variables are already configured
5. Your site will be live at your Vercel URL

### Custom Domain

1. Go to your Vercel project settings
2. Navigate to **Domains**
3. Add your custom domain (e.g., frafiks.co.za)
4. Update DNS records as instructed by Vercel

## Support

For technical support with v0, visit [vercel.com/help](https://vercel.com/help)

## Security Notes

- All admin routes are protected by Supabase authentication
- Row Level Security (RLS) is enabled on all database tables
- Public users can only read products/gallery and submit inquiries
- Only authenticated users can modify content
- Change default admin password immediately after setup

## Future Enhancements

- Product inventory tracking
- Order management system
- Payment integration (Stripe)
- Email notifications for inquiries
- Multi-language support (English/Afrikaans)
- Customer testimonials section
- Blog for company updates
