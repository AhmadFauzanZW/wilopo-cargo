# Advanced Features API Reference

Quick reference for the newly implemented advanced features in Wilopo Cargo Customer Portal.

## 📧 Notification APIs

### Get User Notifications
```http
GET /api/notifications?limit=20
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "type": "STATUS_UPDATE",
      "title": "Shipment Status Updated",
      "message": "Your shipment WC-20251102-12345 status has been updated to IN_TRANSIT",
      "relatedId": 1,
      "isRead": false,
      "createdAt": "2025-11-02T10:30:00.000Z"
    }
  ]
}
```

### Mark Notification as Read
```http
PUT /api/notifications/:id/read
Authorization: Bearer <token>
```

### Mark All Notifications as Read
```http
PUT /api/notifications/read-all
Authorization: Bearer <token>
```

---

## 🔍 Advanced Search & Filtering

### Search Shipments
```http
GET /api/shipments?status=IN_TRANSIT&search=WC-20251102&dateFrom=2025-01-01&dateTo=2025-12-31&sortBy=createdAt&sortOrder=desc&page=1&limit=10
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` - Filter by shipment status (PICKED_UP, IN_WAREHOUSE, IN_TRANSIT, AT_PORT, CUSTOMS_CLEARANCE, OUT_FOR_DELIVERY, DELIVERED, CANCELLED)
- `search` - Search in tracking number, origin, destination, sender name, receiver name
- `dateFrom` - Filter shipments created after this date (YYYY-MM-DD)
- `dateTo` - Filter shipments created before this date (YYYY-MM-DD)
- `sortBy` - Sort by field (createdAt, trackingNumber, status, etc.)
- `sortOrder` - Sort direction (asc or desc)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**
```json
{
  "shipments": [
    {
      "id": 1,
      "trackingNumber": "WC-20251102-12345",
      "status": "IN_TRANSIT",
      "origin": "Shanghai, China",
      "destination": "Jakarta, Indonesia",
      // ... other fields
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

---

## 📑 Export APIs

### Export All Shipments as PDF
```http
GET /api/export/shipments/pdf
Authorization: Bearer <token>
```

**Response:** PDF file download

### Export All Shipments as Excel
```http
GET /api/export/shipments/excel
Authorization: Bearer <token>
```

**Response:** Excel (.xlsx) file download

### Export Single Shipment as PDF
```http
GET /api/export/shipment/:id/pdf
Authorization: Bearer <token>
```

**Response:** Detailed PDF report with:
- Shipment information
- Sender/Receiver details
- Status history
- Timestamps

### Export Single Shipment as Excel
```http
GET /api/export/shipment/:id/excel
Authorization: Bearer <token>
```

**Response:** Excel workbook with multiple sheets:
- Sheet 1: Shipment Details
- Sheet 2: Status History
- Sheet 3: Documents List

---

## 📧 Email Notification Types

### 1. Welcome Email
**Trigger:** User registration  
**Template:** Welcome message with feature overview  
**Sent to:** New user's email

### 2. Status Update Email
**Trigger:** Shipment status change  
**Template:** Beautiful HTML email with:
- Tracking number
- New status badge
- Origin & Destination
- Link to track shipment
**Sent to:** Shipment owner's email

### 3. Document Upload Email
**Trigger:** New document uploaded to shipment  
**Template:** Document notification with:
- Document type
- File name
- Shipment tracking number
- Link to view/download
**Sent to:** Shipment owner's email

---

## 🔧 Configuration

### Email (SMTP) Settings
Add to `.env`:
```bash
# Development (Ethereal Email)
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@ethereal.email
SMTP_PASS=your-password
SMTP_FROM=noreply@wilopocargo.com
FRONTEND_URL=http://localhost:5173

# Production (Gmail Example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 🎨 Frontend Integration Examples

### Fetch Notifications
```javascript
import api from './services/api';

const fetchNotifications = async () => {
  try {
    const response = await api.get('/notifications?limit=20');
    setNotifications(response.data.data);
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};
```

### Mark Notification as Read
```javascript
const markAsRead = async (notificationId) => {
  try {
    await api.put(`/notifications/${notificationId}/read`);
    // Refresh notifications
    fetchNotifications();
  } catch (error) {
    console.error('Error marking notification:', error);
  }
};
```

### Advanced Search
```javascript
const searchShipments = async (filters) => {
  const params = new URLSearchParams({
    status: filters.status || '',
    search: filters.search || '',
    dateFrom: filters.dateFrom || '',
    dateTo: filters.dateTo || '',
    sortBy: filters.sortBy || 'createdAt',
    sortOrder: filters.sortOrder || 'desc',
    page: filters.page || 1,
    limit: filters.limit || 10,
  });

  const response = await api.get(`/shipments?${params}`);
  return response.data;
};
```

### Export Shipments
```javascript
// PDF Export
const exportPDF = () => {
  window.open(`${API_BASE_URL}/export/shipments/pdf`, '_blank');
};

// Excel Export
const exportExcel = () => {
  window.open(`${API_BASE_URL}/export/shipments/excel`, '_blank');
};

// Single Shipment PDF
const exportShipmentPDF = (shipmentId) => {
  window.open(`${API_BASE_URL}/export/shipment/${shipmentId}/pdf`, '_blank');
};
```

---

## 🧪 Testing the Features

### Test Email Notifications
1. Register a new user
2. Check email for welcome message (check spam/junk folder for dev)
3. For dev environment, check console for Ethereal preview URL

### Test Advanced Search
```bash
# Test status filter
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:5000/api/shipments?status=IN_TRANSIT"

# Test search
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:5000/api/shipments?search=WC-20251102"

# Test date range
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:5000/api/shipments?dateFrom=2025-01-01&dateTo=2025-12-31"
```

### Test Export
```bash
# Export all shipments as PDF
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:5000/api/export/shipments/pdf" \
  --output shipments.pdf

# Export as Excel
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:5000/api/export/shipments/excel" \
  --output shipments.xlsx
```

---

## 📊 Database Schema Changes

### New Tables
```sql
-- Notifications table
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  related_id INTEGER,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
```

### Modified Tables
```sql
-- Users table - added role field
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'customer';
```

---

## 🚀 Performance Tips

1. **Pagination:** Always use pagination for large datasets
2. **Indexing:** Database indexes added for search fields
3. **Caching:** Consider Redis for frequently accessed data
4. **Email Queue:** For production, use email queue system (Bull, BeeQueue)
5. **Rate Limiting:** Implement rate limiting on export endpoints

---

## 🐛 Troubleshooting

### Emails Not Sending
- Check SMTP credentials in `.env`
- Verify firewall allows SMTP port
- Check email service logs
- For Gmail, enable "Less secure app access" or use App Password

### Export Not Working
- Ensure pdfkit and exceljs are installed
- Check file permissions for temp directory
- Verify authentication token is valid

### Search Returns No Results
- Check date format (YYYY-MM-DD)
- Verify status values match enum
- Test with simpler queries first

---

**Last Updated:** November 2, 2025  
**Version:** 1.1.0
