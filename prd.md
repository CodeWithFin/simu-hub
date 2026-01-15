# Product Requirements Document (PRD)
## Mobile Phone Store Landing Page & Order Management System

---

## 1. Product Overview

### 1.1 Product Vision
Simu HUb is A streamlined mobile phone e-commerce platform that enables customers to browse and order phones by brand and specifications, while providing shop owners with an efficient order management dashboard and automated SMS communication system.

### 1.2 Product Objectives
- Simplify the phone selection process for customers through intuitive filtering
- Streamline order collection and delivery coordination
- Automate customer communication via SMS notifications
- Provide shop owners with real-time order tracking and management
- Collect customer feedback to improve service quality

### 1.3 Target Users
- **Primary**: Customers looking to purchase mobile phones
- **Secondary**: Mobile phone shop owner/staff managing orders and inventory

---

## 2. User Stories

### 2.1 Customer Journey
- As a customer, I want to explore products by brand and specifications so I can find the phone that meets my needs
- As a customer, I want to choose my delivery method (doorstep delivery or pickup) so I can receive my order conveniently
- As a customer, I want to receive SMS updates about my order status so I know when to expect my phone
- As a customer, I want to provide feedback about my purchase experience so the shop can improve

### 2.2 Shop Owner Journey
- As a shop owner, I want to receive SMS notifications when orders are placed so I can process them immediately
- As a shop owner, I want to view all orders in a dashboard so I can manage them efficiently
- As a shop owner, I want to update order status (dispatched/ready for pickup) so customers are informed
- As a shop owner, I want to send feedback requests to customers so I can gather insights and improve service

---

## 3. Functional Requirements

### 3.1 Landing Page

#### 3.1.1 Hero Section
- **Display Elements**:
  - Shop name/logo
  - Compelling headline (e.g., "Find Your Perfect Phone")
  - Brief value proposition
  - "Explore Products" call-to-action button (primary, prominent)
  
#### 3.1.2 Supporting Content (Optional)
- Featured brands or popular models
- Trust indicators (warranty, genuine products, etc.)
- Contact information

### 3.2 Product Selection Flow

#### 3.2.1 Brand Selection
- **Trigger**: User clicks "Explore Products" button
- **Interface**: Display brand selection interface
  - Show major brands (Samsung, Apple, Xiaomi, Oppo, Tecno, Infinix, etc.)
  - Visual brand logos for easy recognition
  - Search functionality for quick brand finding

#### 3.2.2 Specification Filtering
- **After Brand Selection**: Display specification filters
- **Filter Categories**:
  - Price range (slider or predefined ranges)
  - Storage capacity (64GB, 128GB, 256GB, 512GB, 1TB)
  - RAM (4GB, 6GB, 8GB, 12GB, 16GB+)
  - Camera specifications (e.g., 48MP+, 64MP+, 108MP+)
  - Battery capacity
  - Screen size
  - 5G capability (Yes/No toggle)
  - Color options
  
- **Product Display**:
  - Grid/list view of matching phones
  - Product card showing: image, model name, key specs, price
  - "Select" or "Order Now" button on each product

### 3.3 Checkout Flow

#### 3.3.1 Order Information Form
- **Required Fields**:
  - Full Name (text input, required)
  - Phone Number (validated phone number format, required)
  - Email Address (optional, for order confirmation)
  
#### 3.3.2 Delivery Method Selection
- **Radio Button Options**:
  - **Doorstep Delivery**
    - If selected: Display location input field
    - Location field: Text area for detailed address
    - Include fields for: Street address, Building/Apartment, Area/Neighborhood, City, Postal code (if applicable)
  - **Pickup from Store**
    - If selected: Display store address and pickup instructions
    - No location input needed

#### 3.3.3 Order Summary
- Selected product details
- Delivery method
- Total cost breakdown (product price + delivery fee if applicable)
- Terms and conditions checkbox (required)

#### 3.3.4 Submit Order
- "Complete Order" button
- Loading state while processing
- Confirmation message upon successful submission
- Order reference number displayed

### 3.4 SMS Notification System

#### 3.4.1 Owner Notification (Order Placed)
- **Trigger**: Customer completes order
- **Recipient**: Shop owner
- **Content Template**:
  ```
  NEW ORDER #[ORDER_ID]
  Customer: [NAME]
  Phone: [PHONE]
  Product: [BRAND] [MODEL]
  Delivery: [DOORSTEP/PICKUP]
  Location: [ADDRESS if doorstep]
  View: [DASHBOARD_LINK]
  ```

#### 3.4.2 Customer Notification (Order Dispatched)
- **Trigger**: Owner clicks "Dispatched" in dashboard
- **Recipient**: Customer
- **Content Template**:
  ```
  Your order #[ORDER_ID] has been dispatched!
  [BRAND] [MODEL]
  Expected delivery: [TIMEFRAME]
  Track: [TRACKING_LINK if available]
  Contact: [SHOP_PHONE]
  ```

#### 3.4.3 Customer Notification (Ready for Pickup)
- **Trigger**: Owner clicks "Ready for Pickup" in dashboard
- **Recipient**: Customer
- **Content Template**:
  ```
  Your order #[ORDER_ID] is ready for pickup!
  [BRAND] [MODEL]
  Pickup at: [STORE_ADDRESS]
  Hours: [STORE_HOURS]
  Bring: Order ID and valid ID
  Contact: [SHOP_PHONE]
  ```

#### 3.4.4 Feedback Request
- **Trigger**: Automatically sent when owner marks order as "Completed"
- **Recipient**: Customer
- **Content Template**:
  ```
  Thank you for your purchase from [SHOP_NAME]!
  How was your experience?
  [BRAND] [MODEL]
  Share your feedback: [FEEDBACK_LINK]
  Your opinion helps us improve!
  ```

### 3.5 Owner Dashboard

#### 3.5.1 Dashboard Overview
- **Key Metrics**:
  - Total orders (today, this week, this month)
  - Pending orders count
  - Dispatched orders count
  - Completed orders count
  
#### 3.5.2 Orders List View
- **Display Columns**:
  - Order ID
  - Date & Time
  - Customer Name
  - Phone Number
  - Product (Brand & Model)
  - Delivery Method
  - Location (if delivery)
  - Status (Pending/Dispatched/Ready/Completed)
  - Actions

#### 3.5.3 Order Status Management
- **Status Flow**: Pending → Dispatched/Ready for Pickup → Completed
- **Action Buttons per Order**:
  - **When Pending**:
    - "Dispatch" (for doorstep delivery orders)
    - "Ready for Pickup" (for pickup orders)
    - "Cancel Order" (with confirmation)
  - **When Dispatched/Ready**:
    - "Mark as Completed" (automatically sends feedback request to customer)
  - **When Completed**:
    - Shows "Feedback requested" status
    - "View Feedback" (if feedback received)

#### 3.5.4 Order Detail View
- **Modal or Separate Page Showing**:
  - Complete customer information
  - Product details
  - Delivery information
  - Order timeline (placed, dispatched/ready, completed)
  - Status change history
  - SMS notifications log

#### 3.5.5 Filters and Search
- Filter by status (Pending, Dispatched, Ready, Completed)
- Filter by delivery method
- Filter by date range
- Search by order ID, customer name, or phone number

### 3.6 Feedback Collection

#### 3.6.1 General Feedback Form
- **Access**: Dedicated `/feedback` page, accessible from main navigation
- **Fields**:
  - Name (required)
  - Email (optional)
  - Phone (optional)
  - Message (required)
  
#### 3.6.2 Order-Specific Feedback Form
- **Access**: Via link in SMS sent after order completion
- **URL**: `/feedback/[orderId]`
- **Fields**:
  - Order ID (pre-populated from link)
  - Overall rating (1-5 stars, required)
  - Product satisfaction (1-5 stars, required)
  - Delivery/Pickup experience (1-5 stars, required)
  - Comments (text area, optional)
  - Would recommend? (Yes/No, optional)
  
#### 3.6.3 Feedback Submission
- Thank you message after submission
- Redirect to homepage (for general feedback)
- Display feedback in homepage testimonials section

#### 3.6.4 Feedback Dashboard (Owner View)
- **General Feedback Dashboard** (`/admin/general-feedback`):
  - View all general feedback submissions
  - Total submissions count
  - Filter by date range
  - Export feedback data (CSV)
  
- **Order Feedback Dashboard** (`/admin/feedback`):
  - View feedback linked to specific orders
  - Average ratings across all categories
  - Filter by rating, date
  - Export feedback data (CSV)
  - Order and product details included

---

## 4. Technical Requirements

### 4.1 Frontend
- Responsive design (mobile-first approach)
- Progressive Web App (PWA) capabilities
- Fast loading times (<3 seconds)
- Accessible (WCAG 2.1 AA compliance)
- Cross-browser compatibility (Chrome, Safari, Firefox, Edge)

### 4.2 Backend
- RESTful API or GraphQL
- Secure authentication for owner dashboard (JWT or session-based)
- Database for storing orders, products, customers, feedback
- SMS gateway integration (Twilio, Africa's Talking, or similar)

### 4.3 Database Schema (Key Entities)
- **Products**: ID, brand, model, specs, price, images, stock status
- **Orders**: ID, customer_id, product_id, delivery_method, address, status, timestamps
- **Customers**: ID, name, phone, email, order_history
- **Feedback**: ID, order_id, ratings, comments, timestamp
- **Admins**: ID, username, password_hash, role

### 4.4 SMS Integration
- SMS service provider account setup
- Phone number verification
- SMS delivery status tracking
- Rate limiting to prevent abuse
- Cost monitoring

### 4.5 Security
- HTTPS encryption
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting on forms
- Secure password storage (hashing)
- Two-factor authentication for owner dashboard (optional but recommended)

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Landing page load time: <2 seconds
- Dashboard load time: <3 seconds
- Form submission response: <1 second
- SMS delivery: Within 30 seconds of trigger

### 5.2 Scalability
- Support for 1,000+ products
- Handle 500+ concurrent users
- Process 100+ orders per day

### 5.3 Availability
- 99.5% uptime
- Graceful degradation if SMS service is down
- Backup notification method (email) if SMS fails

### 5.4 Usability
- Intuitive navigation requiring no training
- Maximum 5 clicks from landing page to order completion
- Clear error messages and validation
- Mobile-friendly interface (touch-optimized)

---

## 6. User Interface Requirements

### 6.1 Design Principles
- Clean, modern aesthetic
- Consistent color scheme aligned with brand
- High-contrast text for readability
- Large, tappable buttons (min 44x44px)
- Clear visual hierarchy
- Loading indicators for all async operations

### 6.2 Key UI Components
- **Landing Page**: Hero section with prominent CTA, optional featured products
- **Product Browser**: Filterable grid/list, clear product cards
- **Checkout Form**: Step-by-step or single-page form with progress indicator
- **Dashboard**: Data table with sorting, filtering, and quick actions
- **Feedback Form**: Simple, mobile-friendly rating interface

---

## 7. Success Metrics (KPIs)

### 7.1 Customer Metrics
- Conversion rate (visitors to completed orders): Target >5%
- Average time to complete order: Target <3 minutes
- Cart abandonment rate: Target <30%
- Customer feedback rating: Target >4.0/5.0
- SMS delivery success rate: Target >95%

### 7.2 Owner Metrics
- Average order processing time: Target <30 minutes
- Dashboard daily active usage: Target 100%
- Feedback collection rate: Target >40% of completed orders
- Order fulfillment accuracy: Target >98%

---

## 8. Constraints and Assumptions

### 8.1 Constraints
- SMS costs must be considered (per-message pricing)
- SMS gateway rate limits
- Mobile data constraints for customers
- Owner may have limited technical expertise

### 8.2 Assumptions
- Shop owner has smartphone with internet access
- Customers have phones capable of receiving SMS
- Initial product catalog will be manually uploaded
- Payment is handled offline (cash on delivery or at pickup)

---

## 9. Future Enhancements (Out of Scope for V1)

### 9.1 Phase 2 Features
- Online payment integration (M-Pesa, card payments)
- Customer account creation and order history
- Wishlist functionality
- Product comparison tool
- Live chat support
- Push notifications (in addition to SMS)
- Multi-language support

### 9.2 Phase 3 Features
- Inventory management system
- Automated stock alerts
- Customer loyalty program
- Advanced analytics and reporting
- Multiple shop locations support
- Staff role management
- WhatsApp Business integration

---

## 10. Implementation Phases

### Phase 1: MVP (4-6 weeks)
- Landing page with "Explore Products" CTA
- Basic product filtering by brand and specs
- Simple checkout form
- Owner SMS notification on new order
- Basic dashboard with order list and status updates
- Customer SMS for dispatch/pickup ready
- Basic feedback form

### Phase 2: Enhancement (2-3 weeks)
- Improved dashboard with metrics and filters
- Advanced product filtering
- Feedback request SMS automation
- Feedback analytics in dashboard
- Order search and export functionality

### Phase 3: Polish (1-2 weeks)
- UI/UX refinements
- Performance optimization
- Testing and bug fixes
- Documentation and training materials

---

## 11. Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|---------------------|
| SMS service downtime | High | Medium | Implement fallback email notifications; choose reliable SMS provider |
| High SMS costs | Medium | High | Implement SMS bundling; optimize message content; monitor usage |
| Low customer adoption | High | Medium | User testing before launch; clear instructions; customer support |
| Dashboard complexity | Medium | Medium | Simple, intuitive design; provide training; tooltips and help text |
| Data privacy concerns | High | Low | Implement strong security; clear privacy policy; GDPR/data protection compliance |
| Product data management | Medium | Medium | Easy-to-use admin interface for product uploads; CSV import functionality |

---

## 12. Stakeholder Sign-off

- **Product Owner**: ___________________ Date: ___________
- **Technical Lead**: ___________________ Date: ___________
- **Design Lead**: ___________________ Date: ___________
- **Shop Owner (Client)**: ___________________ Date: ___________

---

## 13. Appendices

### Appendix A: Sample SMS Templates
See Section 3.4 for detailed templates

### Appendix B: Dashboard Wireframes
[To be attached]

### Appendix C: User Flow Diagrams
[To be attached]

### Appendix D: API Endpoints Documentation
[To be developed during implementation]

---

**Document Version**: 1.0  
**Last Updated**: January 15, 2026  
**Owner**: Product Team  
**Status**: Draft for Review