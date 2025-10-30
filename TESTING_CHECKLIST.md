# 🧪 Testing & Quality Assurance Checklist

Use this checklist to verify all features are working correctly.

## 🔧 Pre-Testing Setup

- [ ] Backend server is running on port 5000
- [ ] Frontend is running on port 5173
- [ ] Database is connected and seeded
- [ ] Browser console is open (F12)
- [ ] Network tab is open for monitoring API calls

---

## 🔐 Authentication Tests

### Registration
- [ ] Navigate to `/register`
- [ ] Try registering with all fields filled
- [ ] Verify password confirmation works
- [ ] Try registering with existing email (should fail)
- [ ] Try short password < 6 chars (should fail)
- [ ] Verify successful registration redirects to dashboard
- [ ] Check JWT token is stored in localStorage

### Login
- [ ] Navigate to `/login`
- [ ] Try login with demo account (demo@wilopocargo.com / password123)
- [ ] Try login with wrong password (should fail)
- [ ] Try login with non-existent email (should fail)
- [ ] Verify successful login redirects to dashboard
- [ ] Check user data is stored in localStorage

### Protected Routes
- [ ] Try accessing `/dashboard` without login (should redirect to login)
- [ ] Try accessing `/shipments/1` without login (should redirect)
- [ ] Login and verify routes are accessible
- [ ] Logout and verify redirect to login page

---

## 📊 Dashboard Tests

### Statistics Cards
- [ ] Verify "Total Shipments" shows correct count
- [ ] Verify "In Transit" shows active shipments
- [ ] Verify "Delivered" shows completed shipments
- [ ] Check all numbers match actual data

### Shipments Table
- [ ] Verify shipments list loads correctly
- [ ] Check tracking numbers are displayed
- [ ] Verify origin → destination format
- [ ] Check status badges show correct colors
- [ ] Verify weight is displayed
- [ ] Check created date formatting
- [ ] Click "View" button works for each shipment

### UI/UX
- [ ] Header shows user's full name
- [ ] Logo links to dashboard
- [ ] Navigation menu is visible
- [ ] Logout button works
- [ ] Page is responsive on mobile
- [ ] Loading spinner shows while fetching

---

## 🚚 Shipment Detail Tests

### Navigation
- [ ] Click on a shipment from dashboard
- [ ] Verify URL changes to `/shipments/:id`
- [ ] Back arrow returns to dashboard
- [ ] Status badge shows current status

### Shipment Information
- [ ] Origin and destination are displayed
- [ ] Weight and volume are shown
- [ ] Estimated cost is visible (if available)
- [ ] Estimated arrival date is formatted correctly
- [ ] Sender information is displayed
- [ ] Receiver information is complete

### Status Timeline
- [ ] Timeline shows all status updates
- [ ] Most recent status is highlighted
- [ ] Each status has timestamp
- [ ] Descriptions are displayed
- [ ] Locations are shown
- [ ] Visual timeline is connected

### Document Section
- [ ] "Upload Document" button is visible
- [ ] Click upload and select a PDF file
- [ ] Verify upload progress
- [ ] Document appears in list after upload
- [ ] Download button works
- [ ] Delete button prompts confirmation
- [ ] Delete removes document from list

### Responsive Design
- [ ] Page works on mobile view
- [ ] Timeline is readable on small screens
- [ ] Document list is scrollable
- [ ] All buttons are accessible

---

## 💰 Cost Calculator Tests

### Navigation
- [ ] Click "Calculator" in navigation
- [ ] Verify URL changes to `/calculator`
- [ ] Page loads correctly

### Form Inputs
- [ ] Weight input accepts decimal numbers
- [ ] Volume input accepts decimal numbers
- [ ] Value input accepts numbers
- [ ] Service type dropdown has LCL/FCL options
- [ ] Required field validation works
- [ ] Try negative numbers (should fail)
- [ ] Try zero values (should fail)

### Calculation
- [ ] Fill form with valid data (e.g., 100kg, 2.5m³, $5000)
- [ ] Click "Calculate Cost"
- [ ] Verify loading spinner shows
- [ ] Results appear after calculation

### Results Display
- [ ] Freight cost is displayed
- [ ] Customs duty (7.5%) is calculated
- [ ] VAT (11%) is shown
- [ ] Insurance cost (0.5%) is included
- [ ] Admin fee is displayed
- [ ] Total cost is highlighted
- [ ] Breakdown details are shown
- [ ] Disclaimer message appears
- [ ] Calculation method info is visible

### Multiple Calculations
- [ ] Change values and recalculate
- [ ] Results update correctly
- [ ] Try different service types
- [ ] Verify calculations are accurate

---

## 🔄 API Integration Tests

### Auth Endpoints
- [ ] POST `/api/auth/register` - Creates new user
- [ ] POST `/api/auth/login` - Returns token
- [ ] GET `/api/auth/me` - Returns current user (protected)

### Shipment Endpoints
- [ ] GET `/api/shipments` - Lists all shipments (protected)
- [ ] GET `/api/shipments/:id` - Gets single shipment (protected)
- [ ] GET `/api/shipments/stats` - Gets statistics (protected)
- [ ] Verify 401 error without token

### Document Endpoints
- [ ] GET `/api/shipments/:id/documents` - Lists documents (protected)
- [ ] POST `/api/shipments/:id/documents` - Uploads file (protected)
- [ ] DELETE `/api/documents/:id` - Deletes document (protected)
- [ ] Verify file type validation
- [ ] Verify file size limit (10MB)

### Calculator Endpoint
- [ ] POST `/api/calculate-cost` - Calculates cost (public)
- [ ] Verify calculation accuracy
- [ ] Test with various input values

---

## 🎨 UI/UX Tests

### Layout & Header
- [ ] Logo is visible and clickable
- [ ] Navigation menu is accessible
- [ ] User info displays correctly
- [ ] Logout button is visible
- [ ] Header is sticky/fixed
- [ ] Mobile menu works (if applicable)

### Colors & Theming
- [ ] Primary color is consistent (#0ea5e9)
- [ ] Status badges use correct colors
- [ ] Buttons have hover states
- [ ] Links change color on hover
- [ ] Error messages are red
- [ ] Success messages are green

### Responsive Design
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] All elements are accessible
- [ ] No horizontal scrolling
- [ ] Text is readable at all sizes

### Forms & Inputs
- [ ] Input fields have proper focus states
- [ ] Placeholder text is visible
- [ ] Error messages appear below fields
- [ ] Submit buttons show loading state
- [ ] Form validation works
- [ ] Required fields are marked

### Loading States
- [ ] Spinner shows while loading data
- [ ] Buttons disable during submission
- [ ] Loading text is clear
- [ ] No broken UI during load

---

## 🔒 Security Tests

### Authentication
- [ ] Password is not visible in network requests
- [ ] JWT token is stored securely
- [ ] Token is sent in Authorization header
- [ ] Expired tokens are handled
- [ ] Logout clears all stored data

### Authorization
- [ ] Users can only see their own shipments
- [ ] Protected routes require authentication
- [ ] API returns 401 for unauthorized requests
- [ ] Users cannot access other users' documents

### Input Validation
- [ ] SQL injection attempts are prevented
- [ ] XSS attacks are blocked
- [ ] File uploads are validated
- [ ] Invalid data types are rejected
- [ ] Large payloads are handled

---

## 📱 Cross-Browser Tests

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## ⚡ Performance Tests

- [ ] Dashboard loads in < 2 seconds
- [ ] Shipment detail loads quickly
- [ ] File uploads complete successfully
- [ ] No memory leaks (check DevTools)
- [ ] Images load properly
- [ ] API responses are fast
- [ ] No console errors

---

## 🐛 Error Handling Tests

### Network Errors
- [ ] Stop backend server and verify error messages
- [ ] Check offline functionality
- [ ] Verify timeout handling

### Validation Errors
- [ ] Submit empty forms
- [ ] Enter invalid email formats
- [ ] Use short passwords
- [ ] Upload invalid file types
- [ ] Verify error messages are clear

### 404 Errors
- [ ] Navigate to non-existent route
- [ ] Verify 404 page displays
- [ ] "Go to Dashboard" button works
- [ ] "Go Back" button works

---

## 📊 Database Tests

### Prisma Studio
- [ ] Open Prisma Studio (`npx prisma studio`)
- [ ] Verify all tables exist (Users, Shipments, Documents, StatusHistory)
- [ ] Check demo data is seeded
- [ ] Verify relationships work
- [ ] Test data modification
- [ ] Check cascading deletes

### Data Integrity
- [ ] User passwords are hashed
- [ ] Timestamps are accurate
- [ ] Foreign keys are correct
- [ ] Unique constraints work
- [ ] Decimal values are precise

---

## 🚀 Deployment Readiness

### Environment Variables
- [ ] All required env vars are documented
- [ ] Example files exist (.env.example)
- [ ] No secrets in source code
- [ ] Production values are different

### Documentation
- [ ] README is complete
- [ ] Setup guide is accurate
- [ ] API documentation is up-to-date
- [ ] Code comments are helpful

### Code Quality
- [ ] No console.log in production code
- [ ] Error handling is consistent
- [ ] Code is properly formatted
- [ ] Dependencies are up-to-date

---

## ✅ Final Checklist

- [ ] All features work as expected
- [ ] No critical bugs found
- [ ] Performance is acceptable
- [ ] Security measures in place
- [ ] Documentation is complete
- [ ] Ready for deployment

---

## 📝 Testing Notes

**Date:** _______________  
**Tester:** _______________  
**Browser:** _______________  
**Environment:** _______________

### Issues Found:
1. _____________________________
2. _____________________________
3. _____________________________

### Notes:
_________________________________
_________________________________
_________________________________

---

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Completed | ❌ Failed

---

**Last Updated:** October 30, 2025
