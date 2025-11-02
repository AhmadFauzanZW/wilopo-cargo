# Wilopo Cargo - Demo Flow Documentation

This document provides step-by-step demonstration workflows for both regular users and administrators to showcase the complete functionality of the Wilopo Cargo system.

---

## 📋 Table of Contents

1. [User Flow](#user-flow)
2. [Admin Flow](#admin-flow)
3. [Key Features Demonstration](#key-features-demonstration)
4. [API Testing Guide](#api-testing-guide)

---

## 👤 User Flow

### Step 1: Registration & Login

**Registration:**
1. Navigate to `http://localhost:5173/register`
2. Fill in the registration form:
   - Full Name: "John Doe"
   - Email: "john@example.com"
   - Phone: "+62812345678"
   - Password: "SecurePass123"
   - Address: "Jl. Merdeka No. 123, Jakarta"
3. Click "Register"
4. Check email for welcome notification

**Login:**
1. Navigate to `http://localhost:5173/login`
2. Enter credentials:
   - Email: "john@example.com"
   - Password: "SecurePass123"
3. Click "Login"
4. Redirected to Dashboard

### Step 2: Using the Shipping Cost Calculator

1. Click "Calculator" in the navigation menu
2. Select service type:
   - **Express**: Fast delivery (1-2 days)
   - **Regular**: Standard delivery (3-5 days)
   - **Economy**: Budget-friendly (7-10 days)
3. Enter shipment details:
   - Origin City: "Jakarta"
   - Destination City: "Surabaya"
   - Weight: 5 kg
   - Dimensions: 30 x 20 x 15 cm
4. View calculated cost breakdown:
   - Base cost
   - Weight charges
   - Distance charges
   - Service multiplier
   - Total cost
5. Click "Create Shipment" to proceed

### Step 3: Creating a Shipment

1. After clicking "Create Shipment" from calculator, review details
2. Add sender information:
   - Name: "John Doe"
   - Phone: "+62812345678"
   - Address: "Jl. Merdeka No. 123, Jakarta"
3. Add recipient information:
   - Name: "Jane Smith"
   - Phone: "+62887654321"
   - Address: "Jl. Pahlawan No. 456, Surabaya"
4. Add package details:
   - Description: "Electronics - Laptop"
   - Special Instructions: "Handle with care, fragile"
5. Submit shipment
6. Receive confirmation with tracking number

### Step 4: Tracking Shipment

1. From Dashboard, view all shipments
2. Use search bar to find specific shipment by:
   - Tracking number
   - Recipient name
   - Description
3. Filter shipments by:
   - Status (Pending, In Transit, Delivered, Cancelled)
   - Date range
   - Service type
4. Sort by:
   - Date (newest/oldest)
   - Cost (high/low)

### Step 5: Viewing Shipment Details

1. Click on a shipment card to view details
2. View comprehensive information:
   - Tracking number and status
   - Sender & recipient details
   - Package information
   - Cost breakdown
   - Timeline of status updates
3. View attached documents (if any)
4. Download shipment receipt (PDF)

### Step 6: Document Management

1. On shipment detail page, scroll to "Documents" section
2. Upload supporting documents:
   - Click "Upload Document"
   - Select file (PDF, JPG, PNG, DOC)
   - Add document name
   - Add description
   - Submit
3. View uploaded documents
4. Download documents as needed
5. Delete documents if necessary

### Step 7: Notifications

1. Click notification bell icon in header
2. View notifications for:
   - Shipment status changes
   - Document uploads
   - System announcements
3. Mark notifications as read
4. Check email for important updates

### Step 8: Exporting Data

1. From Dashboard, click "Export" button
2. Choose export format:
   - **PDF**: Professional shipment report with charts
   - **Excel**: Spreadsheet with detailed data
3. Select export scope:
   - All shipments
   - Single shipment
   - Filtered shipments
4. Download generated file
5. View formatted data with:
   - Summary statistics
   - Detailed shipment list
   - Cost analysis

### Step 9: Multi-language Support

1. Click the Globe icon in header
2. Switch between languages:
   - **EN** (English)
   - **ID** (Indonesian)
3. All UI text updates instantly
4. Language preference saved in browser

---

## 🛡️ Admin Flow

### Step 1: Admin Login

1. Navigate to `http://localhost:5173/login`
2. Login with admin credentials:
   - Email: "admin@wilopo.com"
   - Password: "admin123"
3. Notice "Admin" link in navigation (only for admin users)
4. Redirected to Dashboard

### Step 2: Admin Dashboard Overview

1. Click "Admin" in navigation menu
2. View system-wide statistics:
   - **Total Users**: Count of registered users
   - **Total Shipments**: All shipments in system
   - **Total Revenue**: Cumulative earnings
   - **Analytics**: Quick access to reports
3. View recent shipments table
4. Navigate to management sections:
   - User Management
   - Shipment Management
   - Analytics

### Step 3: User Management

1. Click "Manage Users" or navigate to `/admin/users`
2. View all registered users in table:
   - User avatar and name
   - Email address
   - Phone number
   - Role (USER/ADMIN)
   - Join date
   - Shipment count
3. Use search to find specific users
4. Change user roles:
   - Select role from dropdown
   - Confirm role change
   - User permissions updated instantly
5. View user statistics

### Step 4: Shipment Management

1. Navigate to Admin Dashboard
2. View all shipments (including from all users)
3. Search and filter shipments:
   - By user
   - By status
   - By date range
   - By service type
4. Update shipment status:
   - Click on shipment
   - Change status (Pending → In Transit → Delivered)
   - Add status update notes
   - Email notification sent automatically
5. Cancel shipments if needed
6. View shipment analytics

### Step 5: Analytics Dashboard

1. Click "Analytics" in navigation
2. View comprehensive statistics:
   
   **Overview Cards:**
   - Total shipments count
   - Total revenue ($)
   - Average delivery time (days)
   - Monthly growth percentage

   **Charts:**
   - **Shipments by Status** (Pie Chart)
     - Visual breakdown of shipment statuses
     - Color-coded segments
   
   - **Revenue by Service Type** (Bar Chart)
     - Compare earnings across Express/Regular/Economy
     - Identify most profitable services
   
   - **Shipment Trends** (Line Chart)
     - Daily trends over last 30 days
     - Multiple lines for each status
     - Track business growth
   
   - **Revenue by Month** (Bar Chart)
     - Last 6 months revenue comparison
     - Identify seasonal trends

3. Export analytics reports:
   - PDF format for presentations
   - Excel format for detailed analysis

### Step 6: Advanced Search & Filtering

1. From any shipment list view
2. Use advanced search:
   ```
   Search term: "Laptop"
   Status: All / Pending / In Transit / Delivered / Cancelled
   Service Type: Express / Regular / Economy
   Date From: 2025-01-01
   Date To: 2025-01-31
   Sort By: Date (Newest First)
   ```
3. Apply filters
4. View filtered results
5. Export filtered data

### Step 7: Bulk Operations

1. Select multiple shipments (checkbox)
2. Perform bulk actions:
   - Update status for multiple shipments
   - Export selected shipments
   - Generate bulk reports
   - Send notifications

### Step 8: Email Notifications Management

**Admin can trigger email notifications for:**

1. **Welcome Emails** (automatic on registration)
   - Sent to new users
   - Contains account information
   - Getting started guide

2. **Shipment Status Updates** (automatic on status change)
   - Tracking number
   - New status
   - Estimated delivery
   - Tracking link

3. **Document Upload Notifications** (automatic)
   - Document name
   - Upload timestamp
   - View document link

4. **System Announcements** (manual)
   - Broadcast to all users
   - Important updates
   - Maintenance notices

### Step 9: Revenue & Financial Reports

1. Navigate to Analytics → Revenue Stats
2. View financial metrics:
   - Total revenue (all-time)
   - Revenue by service type
   - This month vs last month
   - Growth percentage
   - Revenue trends
3. Generate financial reports:
   - Monthly revenue summary
   - Service type profitability
   - Top revenue-generating routes
4. Export to Excel for accounting

---

## 🎯 Key Features Demonstration

### Feature 1: Real-time Tracking

**Scenario:** Customer wants to track their package

1. Customer receives tracking number: `WC-2025-001234`
2. Login to system
3. View Dashboard - shipment automatically appears
4. Click shipment card
5. View real-time status:
   ```
   ✓ Order Created - Jan 15, 2025 10:00 AM
   ✓ Package Picked Up - Jan 15, 2025 2:00 PM
   ⏳ In Transit - Jan 16, 2025 9:00 AM
   ⏱️ Out for Delivery - Jan 17, 2025 8:00 AM
   ⏱️ Delivered - Pending
   ```
6. Each update triggers email notification

### Feature 2: Cost Calculator

**Scenario:** Calculate shipping cost before creating shipment

1. Navigate to Calculator
2. Select "Express" service
3. Enter details:
   - Origin: Jakarta
   - Destination: Bali
   - Weight: 10 kg
   - Dimensions: 50x40x30 cm
4. View instant calculation:
   ```
   Base Cost: $10.00
   Weight Charge (10kg × $1.20): $12.00
   Distance Charge (1000km × $0.05): $50.00
   Service Multiplier (Express × 1.5): $18.00
   ─────────────────────────────
   Total Cost: $90.00
   Estimated Delivery: 1-2 days
   ```
5. Compare with other service types
6. Proceed to create shipment

### Feature 3: Document Management

**Scenario:** Upload and manage shipment documents

1. Open shipment detail page
2. Upload invoice document:
   - Select PDF file
   - Name: "Commercial Invoice"
   - Description: "Invoice #INV-2025-001"
   - Submit
3. Upload packing list:
   - Select Excel file
   - Name: "Packing List"
   - Description: "Detailed item list"
   - Submit
4. View document history
5. Download any document
6. Delete if needed (with confirmation)

### Feature 4: Multi-language Interface

**Scenario:** Indonesian user prefers Bahasa Indonesia

1. Click Globe icon (🌐)
2. Select "ID"
3. Interface updates:
   ```
   Dashboard → Dasbor
   My Shipments → Pengiriman Saya
   Track Package → Lacak Paket
   Create New Shipment → Buat Pengiriman Baru
   Status: In Transit → Status: Dalam Pengiriman
   ```
4. All labels, messages, and notifications in Indonesian
5. Switch back to English anytime

### Feature 5: Advanced Analytics

**Scenario:** Admin wants to analyze business performance

1. Navigate to Analytics Dashboard
2. View key metrics:
   - 150 total shipments this month
   - $15,000 total revenue
   - 4.5 days average delivery time
   - 25% growth vs last month
3. Analyze charts:
   - **Status Distribution**: 10% Pending, 40% In Transit, 45% Delivered, 5% Cancelled
   - **Service Revenue**: Express ($8k), Regular ($5k), Economy ($2k)
   - **Trend**: Steady growth over 30 days
4. Identify insights:
   - Express service most profitable
   - Weekend spike in orders
   - Jakarta-Surabaya most popular route
5. Make data-driven decisions:
   - Invest in Express service expansion
   - Optimize weekend operations
   - Focus marketing on top routes

### Feature 6: Email Notifications

**Scenario:** User receives automated email updates

1. **Shipment Created:**
   ```
   Subject: Shipment WC-2025-001234 Created Successfully
   
   Dear John Doe,
   
   Your shipment has been created successfully!
   
   Tracking Number: WC-2025-001234
   Service: Express
   Estimated Delivery: Jan 17, 2025
   
   Track your shipment: http://localhost:5173/shipments/1
   
   Thank you for choosing Wilopo Cargo!
   ```

2. **Status Update:**
   ```
   Subject: Your Package is In Transit - WC-2025-001234
   
   Good news! Your package is on its way.
   
   Current Status: In Transit
   Location: Bandung Distribution Center
   Next Update: Within 12 hours
   
   Track shipment: http://localhost:5173/shipments/1
   ```

3. **Delivered:**
   ```
   Subject: Package Delivered - WC-2025-001234
   
   Your package has been delivered successfully!
   
   Delivered At: Jan 17, 2025 2:30 PM
   Received By: Jane Smith
   
   Thank you for using Wilopo Cargo!
   Rate your experience: [Link]
   ```

### Feature 7: Export & Reports

**Scenario:** Generate monthly shipment report

1. Navigate to Dashboard
2. Apply filters:
   - Date Range: January 1-31, 2025
   - Status: All
3. Click "Export" → "PDF"
4. Generated report includes:
   ```
   WILOPO CARGO - SHIPMENT REPORT
   Generated: January 31, 2025
   
   SUMMARY
   - Total Shipments: 150
   - Total Revenue: $15,000
   - Average Cost: $100
   - Delivery Rate: 95%
   
   STATUS BREAKDOWN
   - Delivered: 143 (95%)
   - In Transit: 5 (3%)
   - Pending: 2 (1%)
   - Cancelled: 0 (0%)
   
   TOP ROUTES
   1. Jakarta → Surabaya (45 shipments)
   2. Jakarta → Bali (30 shipments)
   3. Bandung → Medan (25 shipments)
   
   [Detailed Shipment Table]
   ```

---

## 🧪 API Testing Guide

### Using Postman/Thunder Client

#### 1. Authentication

**Register User:**
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123!",
  "fullName": "Test User",
  "phone": "+62812345678",
  "address": "Test Address, Jakarta"
}
```

**Login:**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123!"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "fullName": "Test User",
    "role": "USER"
  }
}
```

#### 2. Calculate Shipping Cost

```http
POST http://localhost:5000/api/calculate
Content-Type: application/json
Authorization: Bearer <token>

{
  "originCity": "Jakarta",
  "destinationCity": "Surabaya",
  "weight": 5,
  "length": 30,
  "width": 20,
  "height": 15,
  "serviceType": "EXPRESS"
}

Response:
{
  "baseRate": 10,
  "weightCharge": 6,
  "distanceCharge": 37.5,
  "serviceMultiplier": 1.5,
  "totalCost": 80.25,
  "estimatedDays": "1-2 days"
}
```

#### 3. Create Shipment

```http
POST http://localhost:5000/api/shipments
Content-Type: application/json
Authorization: Bearer <token>

{
  "serviceType": "EXPRESS",
  "originCity": "Jakarta",
  "destinationCity": "Surabaya",
  "weight": 5,
  "length": 30,
  "width": 20,
  "height": 15,
  "senderName": "John Doe",
  "senderPhone": "+62812345678",
  "senderAddress": "Jl. Merdeka, Jakarta",
  "recipientName": "Jane Smith",
  "recipientPhone": "+62887654321",
  "recipientAddress": "Jl. Pahlawan, Surabaya",
  "packageDescription": "Electronics",
  "specialInstructions": "Fragile"
}
```

#### 4. Get All Shipments (with filters)

```http
GET http://localhost:5000/api/shipments?status=IN_TRANSIT&page=1&limit=10&sortBy=createdAt&order=desc
Authorization: Bearer <token>
```

#### 5. Get Analytics Overview

```http
GET http://localhost:5000/api/analytics/overview
Authorization: Bearer <token>
```

#### 6. Export Shipments to PDF

```http
GET http://localhost:5000/api/export/shipments/pdf
Authorization: Bearer <token>
```

#### 7. Admin: Get All Users

```http
GET http://localhost:5000/api/admin/users
Authorization: Bearer <admin_token>
```

#### 8. Admin: Update User Role

```http
PUT http://localhost:5000/api/admin/users/2/role
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "role": "ADMIN"
}
```

---

## ✅ Testing Checklist

### User Features
- [ ] User registration with email validation
- [ ] User login with correct credentials
- [ ] Password security (hashing)
- [ ] JWT token generation and validation
- [ ] Calculate shipping cost for different services
- [ ] Create shipment with all details
- [ ] View all user shipments
- [ ] Search shipments by tracking number
- [ ] Filter shipments by status
- [ ] View single shipment details
- [ ] Upload documents to shipment
- [ ] Download documents
- [ ] Delete documents
- [ ] View notifications
- [ ] Mark notifications as read
- [ ] Export shipments to PDF
- [ ] Export shipments to Excel
- [ ] Switch language (EN/ID)
- [ ] Language persistence in localStorage

### Admin Features
- [ ] Admin login
- [ ] View admin dashboard
- [ ] View all users
- [ ] Search users
- [ ] Update user roles
- [ ] View all shipments (all users)
- [ ] Update shipment status
- [ ] Cancel shipments
- [ ] View analytics dashboard
- [ ] View revenue statistics
- [ ] View shipment trends
- [ ] Export analytics reports
- [ ] Access control (admin-only routes)

### Email Notifications
- [ ] Welcome email on registration
- [ ] Shipment created notification
- [ ] Status update notifications
- [ ] Document upload notifications
- [ ] Email templates rendering correctly
- [ ] SMTP configuration working

### System Features
- [ ] Role-based access control
- [ ] Protected routes (authentication required)
- [ ] Admin-only routes (authorization)
- [ ] File upload validation
- [ ] Input validation and sanitization
- [ ] Error handling
- [ ] Loading states
- [ ] Responsive design
- [ ] Cross-browser compatibility

---

## 🎬 Demo Script

### 5-Minute Demo for Stakeholders

**Introduction (30 seconds)**
- "Welcome to Wilopo Cargo, a comprehensive cargo management system"
- "Features: shipment tracking, cost calculation, analytics, and admin management"

**User Flow (2 minutes)**
1. Quick registration
2. Use calculator to estimate cost
3. Create shipment with tracking
4. Upload documents
5. Receive email notifications
6. Switch language to Indonesian

**Admin Flow (2 minutes)**
1. Login as admin
2. View system dashboard with statistics
3. Manage users and roles
4. View analytics with charts
5. Export reports

**Advanced Features (30 seconds)**
- Real-time notifications
- Multi-language support
- Comprehensive analytics
- PDF/Excel exports
- Role-based access

---

## 📝 Notes for Demo

### Preparation
1. Seed database with sample data
2. Create test users (regular and admin)
3. Create sample shipments in various statuses
4. Test email configuration
5. Prepare demo script

### Demo Best Practices
- Use realistic data
- Show error handling
- Demonstrate mobile responsiveness
- Highlight security features
- Show performance (fast loading)
- Emphasize user experience

### Common Demo Scenarios
1. **E-commerce Integration**: Show how online stores can integrate
2. **Business Analytics**: Demonstrate data-driven insights
3. **Customer Service**: How to handle customer inquiries
4. **Operations**: Admin managing day-to-day operations
5. **Scaling**: System can handle growth

---

## 🚀 Getting Started with Demo

1. **Start Backend Server:**
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Access Application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Health: http://localhost:5000/health

4. **Test Accounts:**
   - **Regular User:**
     - Email: john@example.com
     - Password: SecurePass123
   
   - **Admin User:**
     - Email: admin@wilopo.com
     - Password: admin123

5. **Follow Demo Flow:**
   - Start with User Flow
   - Then demonstrate Admin Flow
   - Showcase key features
   - Answer questions

---

## 📞 Support

For questions or issues during demo:
- Check API health endpoint
- Review browser console for errors
- Verify database connection
- Check email configuration
- Review server logs

---

**Demo Preparation Complete! The system is now ready to showcase all advanced features in a professional demonstration.**
