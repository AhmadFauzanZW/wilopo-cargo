# 🚀 Wilopo Cargo - Complete Setup Guide

This guide will help you set up and run the Wilopo Cargo Customer Portal from scratch.

## 📋 Prerequisites

Before starting, make sure you have:

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** database ([Download](https://www.postgresql.org/download/) or use [Neon](https://neon.tech), [Supabase](https://supabase.com))
- **Git** (optional, for version control)
- A code editor (VS Code recommended)

## 🛠️ Step-by-Step Setup

### 1. Database Setup

#### Option A: Local PostgreSQL
```powershell
# Install PostgreSQL and create a database
# Open pgAdmin or use psql command:
createdb wilopo_db
```

#### Option B: Cloud Database (Recommended for quick start)
- Sign up for [Neon](https://neon.tech) or [Supabase](https://supabase.com)
- Create a new project
- Copy the connection string (it will look like: `postgresql://user:password@host:5432/database`)

### 2. Backend Setup

```powershell
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env

# Edit .env file with your database URL
# Open .env in VS Code or notepad and update:
# DATABASE_URL="your-postgresql-connection-string"
# JWT_SECRET="your-random-secret-key-here"
```

**Generate a secure JWT secret:**
```powershell
# You can use this command to generate a random secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Database Migration & Seed

```powershell
# Still in server directory

# Run Prisma migrations to create database tables
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Seed database with demo data
node prisma/seed.js
```

### 4. Start Backend Server

```powershell
# Start the development server
npm run dev

# You should see:
# 🚀 Server is running on port 5000
# 📦 Environment: development
# 🌐 API URL: http://localhost:5000
```

**Keep this terminal open!**

### 5. Frontend Setup

Open a **new terminal window** (don't close the backend terminal):

```powershell
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env
# (The default values should work fine)
```

### 6. Start Frontend Server

```powershell
# Still in client directory
npm run dev

# You should see:
# VITE v5.x.x  ready in xxx ms
# ➜  Local:   http://localhost:5173/
```

### 7. Access the Application

Open your browser and go to:
```
http://localhost:5173
```

**Demo Login Credentials:**
- Email: `demo@wilopocargo.com`
- Password: `password123`

## 🎯 What You Can Do

1. **Login** with demo credentials
2. **View Dashboard** - See shipment statistics and list
3. **View Shipment Details** - Click on any shipment to see timeline and documents
4. **Upload Documents** - Try uploading a PDF or image file
5. **Use Calculator** - Calculate import costs with custom values
6. **Register** - Create a new account to test registration

## 📂 Project Structure

```
wilopo-cargo/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API calls
│   │   ├── context/        # Auth context
│   │   └── App.jsx         # Main app component
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.js         # Sample data
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & error handling
│   │   └── utils/          # Helper functions
│   └── package.json
│
└── README.md
```

## 🧪 Testing the API

You can test the API using:

1. **Thunder Client** (VS Code extension)
2. **Postman**
3. **curl** commands

### Example API Requests:

**Register:**
```powershell
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{\"email\":\"test@example.com\",\"password\":\"password123\",\"fullName\":\"Test User\"}'
```

**Login:**
```powershell
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{\"email\":\"demo@wilopocargo.com\",\"password\":\"password123\"}'
```

**Get Shipments (requires token):**
```powershell
curl http://localhost:5000/api/shipments -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔧 Troubleshooting

### Database Connection Error
```
Error: Can't reach database server
```
**Solution:** Check your `DATABASE_URL` in `.env` file. Make sure PostgreSQL is running.

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:** Change `PORT` in `server/.env` to another port (e.g., 5001)

### CORS Error
```
Access to fetch has been blocked by CORS policy
```
**Solution:** Make sure `CLIENT_URL` in `server/.env` matches your frontend URL

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:** Run `npm install` in the appropriate directory

## 📊 Database Management

View your database with Prisma Studio:
```powershell
cd server
npx prisma studio
```

This opens a GUI at `http://localhost:5555` where you can view and edit data.

## 🚀 Deployment (Optional)

### Backend Deployment (Railway/Heroku)
1. Create account on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add PostgreSQL service
4. Set environment variables
5. Deploy!

### Frontend Deployment (Vercel)
1. Create account on [Vercel](https://vercel.com)
2. Import GitHub repository
3. Set `VITE_API_URL` to your backend URL
4. Deploy!

## 📚 Next Steps

- Add more shipments via API or Prisma Studio
- Customize the styling with Tailwind CSS
- Add more features (notifications, reports, etc.)
- Integrate real tracking APIs

## 🆘 Need Help?

- Check the error messages in the terminal
- Look at the browser console (F12) for frontend errors
- Review the API responses in Network tab
- Check database with Prisma Studio

## 📝 Notes

- The demo data includes 3 sample shipments with different statuses
- File uploads are stored in `server/uploads/` directory
- JWT tokens expire after 7 days (configurable in `.env`)

---

**Happy Coding! 🎉**

If you encounter any issues, check the console output for error messages and verify all environment variables are set correctly.
