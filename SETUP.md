# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is ready, go to **SQL Editor**
3. Copy the contents of `supabase/schema.sql` and run it
4. **NEW**: Run the feedback migration: Copy and run `supabase/add_general_feedback.sql`
5. Go to **Settings** → **API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

## Step 3: Set Up Tilil (for SMS)

1. Create an account at [tililtech.com](https://tililtech.com)
2. Get your API key from the Tilil dashboard
3. Note your Sender ID (or use the default "SIMUHUB")

## Step 4: Configure Environment Variables

### Environment Variables (.env.local)
Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

TILIL_API_KEY=your_tilil_api_key
TILIL_SMS_URL=https://api.tililtech.com/v1/sms/send
TILIL_SENDER_ID=SIMUHUB

SHOP_NAME=Simu Hub
SHOP_PHONE=+1234567890
SHOP_ADDRESS=123 Main Street, City, Country
SHOP_HOURS=Mon-Sat: 9AM-6PM

JWT_SECRET=your_random_secret_key_here
```

**Note**: This is a monolithic Next.js application where API routes and frontend are in the same codebase.

## Step 5: Create Admin User

Run this in your Supabase SQL Editor (replace with your desired username and hashed password):

```sql
-- Generate password hash using Node.js:
-- const bcrypt = require('bcryptjs');
-- console.log(bcrypt.hashSync('your_password', 10));

INSERT INTO admins (username, password_hash, role)
VALUES ('admin', '$2a$10$YourHashedPasswordHere', 'owner');
```

Or use this Node.js script:
```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your_password', 10);
console.log('Hash:', hash);
// Then use this hash in the SQL INSERT above
```

## Step 6: Add Sample Products

Add some products to test with. You can do this via Supabase dashboard or SQL:

```sql
INSERT INTO products (brand, model, price, storage_capacity, ram, has_5g, color, image_url)
VALUES 
  ('Samsung', 'Galaxy S23', 799.99, '128GB', '8GB', true, 'Black', 'https://example.com/image.jpg'),
  ('Apple', 'iPhone 14', 899.99, '128GB', '6GB', true, 'Blue', 'https://example.com/image.jpg'),
  ('Xiaomi', 'Redmi Note 12', 299.99, '64GB', '4GB', false, 'White', 'https://example.com/image.jpg');
```

## Step 7: Run the Application

### Development Mode

```bash
npm run dev
```

- **Application**: http://localhost:3000
- **API Endpoints**: http://localhost:3000/api/*

### Production Mode

```bash
# Build the application
npm run build

# Start the production server
npm start
```

- **Application**: http://localhost:3000

## Step 8: Access the Application

- **Customer Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login
- **API Endpoints**: http://localhost:3000/api/*

Use the admin credentials you created in Step 5 to login.

## Troubleshooting

### Backend won't start
- Check all environment variables are set correctly
- Ensure port 3000 is not in use
- Verify Supabase credentials

### Frontend can't connect to backend
- Ensure backend is running on port 3000
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

### SMS not working
- Verify Tilil credentials
- Check Tilil account has credits
- Review backend logs for SMS errors

### Database errors
- Ensure schema.sql was run successfully
- Check Supabase project is active
- Verify API keys have correct permissions

## Next Steps

1. Customize shop information in backend `.env`
2. Add your product catalog
3. Test the order flow
4. Configure SMS templates if needed
5. Set up production deployment
