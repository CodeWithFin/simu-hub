# Simu Hub - Mobile Phone Store Platform

A streamlined mobile phone e-commerce platform built with Next.js, React, and Supabase. Enables customers to browse and order phones by brand and specifications, while providing shop owners with an efficient order management dashboard and automated SMS communication system.

## 🚀 Features

### Customer Features
- **Landing Page**: Beautiful hero section with call-to-action
- **Product Browsing**: Filter products by brand, price, storage, RAM, 5G capability, and more
- **Order Placement**: Simple checkout flow with delivery method selection
- **SMS Notifications**: Receive updates about order status
- **Feedback System**: Share your experience via dedicated feedback page
- **Customer Testimonials**: View real feedback from other customers on the homepage
- **Easy Navigation**: Access feedback page from any page via main menu

### Admin Features
- **Dashboard**: Real-time order statistics and management
- **Order Management**: Update order status (Pending → Dispatched/Ready → Completed)
- **SMS Automation**: Automatic SMS notifications to customers
- **Feedback Collection**: Request and view customer feedback
- **General Feedback Dashboard**: View and manage homepage feedback submissions
- **Search & Filters**: Find orders quickly by status, date, or customer info
- **CSV Export**: Export feedback data for analysis

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **SMS**: Tilil
- **Authentication**: JWT
- **Architecture**: Monolithic Next.js application

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Tilil account (for SMS functionality)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd simu-hub
```

### 2. Set up Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase/schema.sql`
3. Note your project URL and API keys

### 3. Install Dependencies

```bash
npm install
```

### 4. Set up Environment Variables

Create a `.env.local` file in the root directory:

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
SHOP_ADDRESS=Your Shop Address
SHOP_HOURS=Mon-Sat: 9AM-6PM

JWT_SECRET=your_jwt_secret_key_here
```

### 5. Create Admin User

You'll need to create an admin user in the Supabase database. Run this SQL in Supabase SQL Editor:

```sql
-- Replace 'your_username' and 'your_password_hash' with your desired credentials
-- Use bcrypt to hash your password (you can use an online bcrypt generator)
INSERT INTO admins (username, password_hash, role)
VALUES ('admin', '$2a$10$YourHashedPasswordHere', 'owner');
```

To generate a password hash, you can use Node.js:

```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your_password', 10);
console.log(hash);
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

- Next.js development server with hot reload
- API routes at `/api/*`
- Frontend pages at root routes

### Production Mode

1. **Build the application**:
```bash
npm run build
```

2. **Start the production server**:
```bash
npm start
```

The application will be available at **http://localhost:3000**

- Optimized production build
- API routes at `/api/*`
- Server-side rendering and static generation

## 📁 Project Structure

```
simu-hub/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   │   ├── products/     # Product endpoints
│   │   ├── orders/       # Order endpoints
│   │   ├── feedback/     # Feedback endpoints
│   │   └── admin/        # Admin endpoints
│   ├── admin/            # Admin pages
│   ├── products/         # Products page
│   ├── checkout/         # Checkout page
│   ├── feedback/         # Feedback page
│   ├── lib/              # Utility libraries (Supabase, SMS, Auth)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── supabase/
│   └── schema.sql       # Database schema
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── package.json
```

**Note**: This is a monolithic Next.js application where API routes and frontend pages are in the same codebase.

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/brands` - Get all brands
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (with filters)
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id/status` - Update order status

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback
- `GET /api/feedback/order/:orderId` - Get feedback by order ID

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/stats` - Get dashboard statistics

## 🗄️ Database Schema

The database includes the following tables:
- `products` - Product catalog
- `customers` - Customer information
- `orders` - Order records
- `feedback` - Customer feedback
- `admins` - Admin users
- `sms_logs` - SMS notification logs

See `supabase/schema.sql` for complete schema definition.

## 🔐 Security

- Input validation using express-validator
- Rate limiting on API endpoints
- Helmet.js for security headers
- JWT authentication for admin routes
- SQL injection prevention via Supabase client
- CORS configuration

## 📱 SMS Integration

The application uses Tilil for SMS notifications. SMS is sent for:
- New order notifications to shop owner
- Order dispatched notifications to customers
- Ready for pickup notifications
- Feedback request messages

## 🧪 Testing

To test the application:

1. Add some products to the database via Supabase dashboard
2. Visit http://localhost:5173
3. Browse products and place an order
4. Login to admin dashboard at http://localhost:5173/admin/login
5. Manage orders and test SMS notifications

## 📝 Environment Variables

### Environment Variables (.env.local)
- `NEXT_PUBLIC_APP_URL` - Application URL (for SMS links)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `TILIL_API_KEY` - Tilil API key
- `TILIL_SMS_URL` - Tilil SMS API endpoint URL
- `TILIL_SENDER_ID` - Tilil sender ID
- `SHOP_NAME` - Shop name for SMS templates
- `SHOP_PHONE` - Shop phone number
- `SHOP_ADDRESS` - Shop address
- `SHOP_HOURS` - Shop operating hours
- `JWT_SECRET` - Secret key for JWT tokens

## 🐛 Troubleshooting

### Application won't start
- Check that all environment variables are set in `.env.local`
- Ensure Supabase credentials are correct
- Verify port 3000 is not in use
- Run `npm install` to ensure all dependencies are installed

### API routes not working
- Check that environment variables are properly set
- Verify Supabase connection
- Check browser console and server logs for errors
- Ensure API routes are in the `app/api/` directory

### SMS not sending
- Verify Tilil credentials are correct
- Check Tilil account balance
- Review SMS logs in database

### Database errors
- Ensure schema.sql has been run in Supabase
- Check Supabase project is active
- Verify API keys have correct permissions

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the repository.

---

**Built with ❤️ for Simu Hub**
# simu-hub
