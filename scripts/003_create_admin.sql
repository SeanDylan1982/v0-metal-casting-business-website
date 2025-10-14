-- Create admin user
-- This will create a user in Supabase Auth
-- You'll need to run this in the Supabase SQL Editor

-- Note: Supabase Auth users are created via the Auth API, not SQL
-- This script provides the SQL to manually create a user if needed
-- However, the recommended approach is to use the Supabase Dashboard

-- RECOMMENDED APPROACH:
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to Authentication > Users
-- 3. Click "Add User"
-- 4. Enter email: admin@frafiks.co.za
-- 5. Enter password: Admin123! (change this immediately after first login)
-- 6. Click "Create User"

-- ALTERNATIVE: If you want to create via SQL, you can use this function
-- But it's better to use the dashboard for the first admin user

-- Create a function to help with user creation (optional)
CREATE OR REPLACE FUNCTION create_admin_user(
  user_email TEXT,
  user_password TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This is a helper function
  -- Actual user creation should be done via Supabase Dashboard or Auth API
  RETURN 'Please create admin user via Supabase Dashboard: Authentication > Users > Add User';
END;
$$;

-- Instructions for manual setup:
-- 1. Go to Supabase Dashboard: https://app.supabase.com
-- 2. Select your project
-- 3. Go to Authentication > Users
-- 4. Click "Add User" button
-- 5. Email: admin@frafiks.co.za
-- 6. Password: Admin123!
-- 7. Auto Confirm User: YES (check this box)
-- 8. Click "Create User"
-- 9. IMPORTANT: Change password after first login!

COMMENT ON FUNCTION create_admin_user IS 'Helper function - actual admin user should be created via Supabase Dashboard';
