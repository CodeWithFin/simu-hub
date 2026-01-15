# Feedback System Setup Guide

This guide explains the feedback system implementation in Simu Hub.

## Overview

The Simu Hub now has **two types of feedback systems**:

1. **Order-Based Feedback** - Customers provide feedback after completing an order
2. **General Feedback** - Any visitor can submit feedback directly from the homepage

---

## Database Migration

To enable the general feedback feature, you need to add the `general_feedback` table to your database.

### Using Supabase Dashboard

1. Log into your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the migration script: `supabase/add_general_feedback.sql`

### Using Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db push
```

### Manual SQL Execution

Connect to your database and run:

```sql
-- General feedback table (for homepage feedback)
CREATE TABLE IF NOT EXISTS general_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for better query performance
CREATE INDEX IF NOT EXISTS idx_general_feedback_created_at ON general_feedback(created_at);
```

---

## Features

### Customer-Facing Features

#### General Feedback Form
- Accessible at `/feedback` page
- Available in main navigation menu
- Fields:
  - Name (required)
  - Email (optional)
  - Phone (optional)
  - Message (required)
- Success message displayed after submission
- Redirects to homepage after 3 seconds
- Feedback appears in homepage testimonials section

#### Order Feedback Form
- Accessed via SMS link sent automatically when order is completed
- URL format: `/feedback/[orderId]`
- Fields:
  - Overall rating (required)
  - Product satisfaction (required)
  - Delivery/pickup experience (required)
  - Comments (optional)
  - Would recommend (optional)
- SMS is automatically sent to customer when admin marks order as "Complete"

### Admin Features

#### General Feedback Dashboard
- URL: `/admin/general-feedback`
- Features:
  - View all general feedback submissions from `/feedback` page
  - Total submissions count
  - Average rating display (if ratings provided)
  - Filter by rating level
  - Filter by date range
  - Export to CSV
  - Display contact information if provided

#### Order Feedback Dashboard
- URL: `/admin/feedback`
- Features:
  - View feedback linked to specific orders
  - Average ratings across all categories
  - Filter by rating and date
  - Export to CSV
  - Order and product details included
- Feedback requests are automatically sent when orders are marked as complete

---

## Navigation

### Admin Navigation Menu

All admin pages now have a unified navigation:
- **Orders** - Main order management dashboard
- **Order Feedback** - Customer feedback for completed orders
- **General Feedback** - Homepage feedback submissions
- **Logout** - Sign out of admin panel

---

## API Endpoints

### General Feedback

**POST /api/general-feedback**
- Submit general feedback from homepage
- Body: `{ name, email?, phone?, message, rating? }`

**GET /api/general-feedback**
- Retrieve all general feedback (admin)
- Query params: `rating`, `startDate`, `endDate`

### Order Feedback

**POST /api/feedback**
- Submit order-specific feedback
- Body: `{ orderId, overallRating, productRating, deliveryRating, comments?, wouldRecommend? }`

**GET /api/feedback**
- Retrieve all order feedback (admin)
- Query params: `rating`, `startDate`, `endDate`

---

## Testing

### Test General Feedback

1. Navigate to homepage: `http://localhost:3000`
2. Scroll to the feedback section
3. Fill out the form:
   - Enter your name
   - Optionally add email/phone
   - Select a star rating (optional)
   - Write a message
   - Click "Submit Feedback"
4. Verify success message appears

### Test Admin View

1. Log into admin panel: `http://localhost:3000/admin/login`
2. Click "General Feedback" in navigation
3. Verify you can see submitted feedback
4. Test filters and CSV export

---

## Data Privacy

- Email and phone fields are optional for general feedback
- All feedback is stored securely in Supabase
- Only authenticated admins can view feedback
- Consider adding a privacy policy link near the feedback form
- Ensure compliance with data protection regulations (GDPR, etc.)

---

## Future Enhancements

Potential improvements:
- Email notifications to admin on new general feedback
- Response/reply system for admin to contact feedback submitters
- Sentiment analysis on feedback messages
- Public testimonials page (with user permission)
- Feedback statistics and trends dashboard
- Automated spam detection

---

## Troubleshooting

### Feedback not submitting
- Check browser console for errors
- Verify API endpoint is accessible
- Ensure database table exists
- Check Supabase connection

### Admin can't see feedback
- Verify admin is logged in
- Check database permissions
- Ensure data was actually inserted

### CSV export not working
- Check browser allows downloads
- Verify there is data to export
- Check browser console for errors

---

## Support

For issues or questions:
1. Check the main README.md
2. Review SETUP.md for database configuration
3. Check Supabase logs for API errors
4. Verify all migrations have been run

---

**Last Updated:** January 15, 2026
**Version:** 1.0
