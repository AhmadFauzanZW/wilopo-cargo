# 📡 Wilopo Cargo API Documentation

Base URL: `http://localhost:5000/api`

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📋 Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "companyName": "ABC Trading",
  "phone": "+62 812 3456 7890"
}
```

**Response (201):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "companyName": "ABC Trading",
    "phone": "+62 812 3456 7890",
    "createdAt": "2025-10-30T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "companyName": "ABC Trading",
    "phone": "+62 812 3456 7890"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Current User
```http
GET /auth/me
```
🔒 **Protected**

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "companyName": "ABC Trading",
    "phone": "+62 812 3456 7890"
  }
}
```

---

### Shipments

#### Get All Shipments
```http
GET /shipments
```
🔒 **Protected**

**Response (200):**
```json
[
  {
    "id": 1,
    "trackingNumber": "WC-20251030-12345",
    "origin": "Shanghai, China",
    "destination": "Jakarta, Indonesia",
    "status": "IN_TRANSIT",
    "weight": "150.50",
    "volume": "2.30",
    "estimatedCost": "2850.75",
    "estimatedArrival": "2025-11-15T00:00:00.000Z",
    "createdAt": "2025-10-25T00:00:00.000Z",
    "documents": [...],
    "statusHistory": [...]
  }
]
```

#### Get Shipment by ID
```http
GET /shipments/:id
```
🔒 **Protected**

**Response (200):**
```json
{
  "id": 1,
  "trackingNumber": "WC-20251030-12345",
  "origin": "Shanghai, China",
  "destination": "Jakarta, Indonesia",
  "status": "IN_TRANSIT",
  "weight": "150.50",
  "volume": "2.30",
  "estimatedCost": "2850.75",
  "estimatedArrival": "2025-11-15T00:00:00.000Z",
  "senderName": "Shanghai Supplier Co.",
  "senderAddress": "123 Huangpu Road, Shanghai",
  "receiverName": "PT Demo Indonesia",
  "receiverAddress": "Jl. Sudirman No. 123, Jakarta",
  "receiverPhone": "+62 21 1234 5678",
  "documents": [
    {
      "id": 1,
      "documentType": "INVOICE",
      "fileUrl": "/uploads/1234567890-invoice.pdf",
      "originalName": "invoice.pdf",
      "fileSize": 245678,
      "uploadedAt": "2025-10-25T00:00:00.000Z"
    }
  ],
  "statusHistory": [
    {
      "id": 1,
      "status": "PICKED_UP",
      "description": "Package picked up from warehouse",
      "location": "Shanghai, China",
      "timestamp": "2025-10-25T00:00:00.000Z"
    }
  ]
}
```

#### Create Shipment
```http
POST /shipments
```
🔒 **Protected**

**Request Body:**
```json
{
  "origin": "Shanghai, China",
  "destination": "Jakarta, Indonesia",
  "weight": 150.5,
  "volume": 2.3,
  "senderName": "Shanghai Supplier Co.",
  "senderAddress": "123 Huangpu Road, Shanghai",
  "receiverName": "PT Demo Indonesia",
  "receiverAddress": "Jl. Sudirman No. 123, Jakarta",
  "receiverPhone": "+62 21 1234 5678",
  "estimatedCost": 2850.75
}
```

**Response (201):**
```json
{
  "id": 1,
  "trackingNumber": "WC-20251030-12345",
  "origin": "Shanghai, China",
  "destination": "Jakarta, Indonesia",
  "status": "PICKED_UP",
  "weight": "150.50",
  "volume": "2.30",
  "createdAt": "2025-10-30T00:00:00.000Z",
  "statusHistory": [...]
}
```

#### Update Shipment Status
```http
PATCH /shipments/:id/status
```
🔒 **Protected**

**Request Body:**
```json
{
  "status": "IN_TRANSIT",
  "description": "Shipment is now in transit",
  "location": "Pacific Ocean"
}
```

**Response (200):**
```json
{
  "id": 1,
  "status": "IN_TRANSIT",
  "statusHistory": [...]
}
```

**Status Options:**
- `PICKED_UP`
- `IN_WAREHOUSE`
- `IN_TRANSIT`
- `AT_PORT`
- `CUSTOMS_CLEARANCE`
- `OUT_FOR_DELIVERY`
- `DELIVERED`
- `CANCELLED`

#### Get Shipment Statistics
```http
GET /shipments/stats
```
🔒 **Protected**

**Response (200):**
```json
{
  "total": 10,
  "active": 5,
  "inTransit": 5,
  "delivered": 5
}
```

---

### Documents

#### Get Documents by Shipment
```http
GET /shipments/:id/documents
```
🔒 **Protected**

**Response (200):**
```json
[
  {
    "id": 1,
    "documentType": "INVOICE",
    "fileUrl": "/uploads/1234567890-invoice.pdf",
    "originalName": "invoice.pdf",
    "fileSize": 245678,
    "uploadedAt": "2025-10-25T00:00:00.000Z"
  }
]
```

#### Upload Document
```http
POST /shipments/:id/documents
```
🔒 **Protected**

**Content-Type:** `multipart/form-data`

**Form Data:**
- `file`: File to upload (PDF, DOC, DOCX, XLS, XLSX, JPG, PNG)
- `documentType`: Type of document (optional)

**Document Types:**
- `INVOICE`
- `PACKING_LIST`
- `BILL_OF_LADING`
- `CERTIFICATE`
- `CUSTOMS_DECLARATION`
- `OTHER`

**Response (201):**
```json
{
  "id": 1,
  "documentType": "INVOICE",
  "fileUrl": "/uploads/1234567890-invoice.pdf",
  "originalName": "invoice.pdf",
  "fileSize": 245678,
  "uploadedAt": "2025-10-30T00:00:00.000Z"
}
```

#### Delete Document
```http
DELETE /documents/:id
```
🔒 **Protected**

**Response (200):**
```json
{
  "message": "Document deleted successfully"
}
```

---

### Calculator

#### Calculate Import Cost
```http
POST /calculate-cost
```
🔓 **Public**

**Request Body:**
```json
{
  "weight": 100,
  "volume": 2.5,
  "value": 5000,
  "serviceType": "LCL"
}
```

**Response (200):**
```json
{
  "input": {
    "weight": 100,
    "volume": 2.5,
    "value": 5000,
    "serviceType": "LCL"
  },
  "estimation": {
    "freightCost": 800.00,
    "customsDuty": 375.00,
    "vat": 679.25,
    "insuranceCost": 25.00,
    "adminFee": 50.00,
    "totalCost": 1929.25,
    "breakdown": {
      "weightCost": 800.00,
      "volumeCost": 375.00,
      "chargeableWeight": 100,
      "chargeableVolume": 2.5
    }
  },
  "currency": "USD",
  "disclaimer": "This is an estimation. Actual costs may vary based on specific circumstances."
}
```

**Calculation Formula:**
- **Freight Cost**: Max(weight × $8/kg, volume × $150/m³)
- **Customs Duty**: 7.5% of goods value
- **VAT**: 11% of (value + freight + insurance + duty)
- **Insurance**: 0.5% of goods value
- **Admin Fee**: Fixed $50

---

## 🚨 Error Responses

### 400 Bad Request
```json
{
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, token failed"
}
```

### 404 Not Found
```json
{
  "message": "Shipment not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "stack": "Error stack trace (development only)"
}
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Decimal values are returned as strings to maintain precision
- File uploads have a 10MB size limit
- JWT tokens expire after 7 days
- Passwords must be at least 6 characters

---

## 🧪 Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User"
  }'
```

**Get Shipments:**
```bash
curl http://localhost:5000/api/shipments \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Upload Document:**
```bash
curl -X POST http://localhost:5000/api/shipments/1/documents \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "file=@/path/to/document.pdf" \
  -F "documentType=INVOICE"
```

---

**Last Updated:** October 30, 2025
**Version:** 1.0.0
