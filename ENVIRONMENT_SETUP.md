# Environment Variables Setup

## Required Environment Variables

To run this application, you need to set up the following environment variables. These should be added in your Vercel project settings or in a `.env.local` file for local development.

### Supabase Configuration

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Your Supabase project URL
   - Format: `https://xxxxx.supabase.co`
   - Find it: Supabase Dashboard → Project Settings → API → Project URL
   - Example: `https://oaphicfoiasurpczdlyz.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Your Supabase anonymous/public API key
   - Find it: Supabase Dashboard → Project Settings → API → Project API keys → `anon` `public`
   - This is safe to use in the browser

3. **DATABASE_URL** (Optional - for direct database access)
   - Your PostgreSQL connection string
   - Format: `postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres`
   - You already have: `postgresql://postgres:LYd9pygRCGaIzTK5@db.oaphicfoiasurpczdlyz.supabase.co:5432/postgres`

### Business Information (Optional)

These are hardcoded in the app but can be made configurable:

- `NEXT_PUBLIC_BUSINESS_NAME=Frafiks Melting and Casting Pty Ltd`
- `NEXT_PUBLIC_BUSINESS_EMAIL=francismagoro@gmail.com`
- `NEXT_PUBLIC_BUSINESS_PHONE=072 718 3114`

## Setup Instructions

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with its value
4. Redeploy your application

### For Local Development

1. Create a `.env.local` file in the root of your project
2. Copy the contents from `.env.local.example`
3. Fill in your actual values
4. Restart your development server

## Finding Your Supabase Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `oaphicfoiasurpczdlyz`
3. Click on the Settings icon (⚙️) in the sidebar
4. Go to **API** section
5. Copy the following:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Security Notes

- Never commit `.env.local` to version control
- The `NEXT_PUBLIC_` prefix makes variables available in the browser
- Keep your `service_role` key secret (not used in this app)
- The `anon` key is safe to expose as it respects Row Level Security (RLS)
