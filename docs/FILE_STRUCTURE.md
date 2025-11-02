# 📁 Complete File Structure

```
wilopo-cargo/
│
├── 📄 README.md                      # Project overview and quick start
├── 📄 SETUP_GUIDE.md                 # Detailed setup instructions  
├── 📄 API_DOCUMENTATION.md           # Complete API reference
├── 📄 PROJECT_SUMMARY.md             # Implementation summary
├── 📄 TESTING_CHECKLIST.md           # QA testing checklist
├── 📄 FILE_STRUCTURE.md              # This file
├── 📄 project-brief.md               # Original project specification
├── 📄 .gitignore                     # Git ignore rules
│
├── 🔧 setup.ps1                      # Windows automated setup script
├── 🔧 start-backend.ps1              # Backend startup script
├── 🔧 start-frontend.ps1             # Frontend startup script
│
├── 📂 server/                        # Backend Application
│   │
│   ├── 📄 package.json               # Backend dependencies
│   ├── 📄 .env.example               # Environment variables template
│   ├── 📄 .env                       # Environment variables (gitignored)
│   │
│   ├── 📂 prisma/                    # Database Configuration
│   │   ├── 📄 schema.prisma          # Database schema definition
│   │   └── 📄 seed.js                # Demo data seeder
│   │
│   ├── 📂 src/                       # Source Code
│   │   │
│   │   ├── 📄 index.js               # Main server entry point
│   │   │
│   │   ├── 📂 controllers/           # Request Handlers
│   │   │   ├── 📄 authController.js          # Auth logic (register, login)
│   │   │   ├── 📄 shipmentController.js      # Shipment CRUD operations
│   │   │   ├── 📄 documentController.js      # File upload/download
│   │   │   └── 📄 calculatorController.js    # Cost calculations
│   │   │
│   │   ├── 📂 routes/                # API Routes
│   │   │   ├── 📄 authRoutes.js              # /api/auth/*
│   │   │   ├── 📄 shipmentRoutes.js          # /api/shipments/*
│   │   │   ├── 📄 documentRoutes.js          # /api/documents/*
│   │   │   └── 📄 calculatorRoutes.js        # /api/calculate-cost
│   │   │
│   │   ├── 📂 middleware/            # Middleware Functions
│   │   │   ├── 📄 auth.js                    # JWT authentication
│   │   │   └── 📄 errorHandler.js            # Error handling
│   │   │
│   │   └── 📂 utils/                 # Helper Functions
│   │       ├── 📄 generateToken.js           # JWT token generator
│   │       ├── 📄 generateTrackingNumber.js  # Tracking number creator
│   │       └── 📄 costCalculator.js          # Import cost logic
│   │
│   └── 📂 uploads/                   # User uploaded files (gitignored)
│
│
├── 📂 client/                        # Frontend Application
│   │
│   ├── 📄 package.json               # Frontend dependencies
│   ├── 📄 vite.config.js             # Vite configuration
│   ├── 📄 tailwind.config.js         # Tailwind CSS config
│   ├── 📄 postcss.config.js          # PostCSS config
│   ├── 📄 index.html                 # HTML template
│   ├── 📄 .env.example               # Environment variables template
│   ├── 📄 .env                       # Environment variables (gitignored)
│   │
│   ├── 📂 public/                    # Static Assets
│   │   └── vite.svg                  # Vite logo
│   │
│   └── 📂 src/                       # Source Code
│       │
│       ├── 📄 main.jsx               # React entry point
│       ├── 📄 App.jsx                # Main app component with routing
│       ├── 📄 index.css              # Global styles & Tailwind
│       │
│       ├── 📂 components/            # Reusable Components
│       │   ├── 📄 Layout.jsx                 # Main layout with header/footer
│       │   ├── 📄 PrivateRoute.jsx           # Protected route wrapper
│       │   ├── 📄 StatusBadge.jsx            # Status display component
│       │   ├── 📄 StatCard.jsx               # Dashboard stat card
│       │   ├── 📄 Alert.jsx                  # Alert/notification component
│       │   └── 📄 LoadingSpinner.jsx         # Loading indicator
│       │
│       ├── 📂 pages/                 # Page Components
│       │   ├── 📄 Login.jsx                  # Login page
│       │   ├── 📄 Register.jsx               # Registration page
│       │   ├── 📄 Dashboard.jsx              # Main dashboard
│       │   ├── 📄 ShipmentDetail.jsx         # Shipment detail with timeline
│       │   ├── 📄 Calculator.jsx             # Cost calculator
│       │   └── 📄 NotFound.jsx               # 404 error page
│       │
│       ├── 📂 context/               # React Context
│       │   └── 📄 AuthContext.jsx            # Authentication state management
│       │
│       └── 📂 services/              # API Services
│           └── 📄 api.js                     # Axios configuration & API calls
│
│
└── 📂 node_modules/                  # Dependencies (gitignored)
```

---

## 📊 Statistics

### Backend
- **Total Files:** 18
- **Controllers:** 4
- **Routes:** 4
- **Middleware:** 2
- **Utilities:** 3
- **Models:** 4 (Prisma)

### Frontend
- **Total Files:** 19
- **Components:** 6
- **Pages:** 6
- **Context:** 1
- **Services:** 1

### Documentation
- **Files:** 7
- **Lines:** ~3,000+

### Scripts
- **PowerShell:** 3
- **Automation:** Setup, Start Backend, Start Frontend

---

## 🎯 Key Files Description

### Root Level
| File | Purpose |
|------|---------|
| `README.md` | Project overview, features, and quick start |
| `SETUP_GUIDE.md` | Complete installation instructions |
| `API_DOCUMENTATION.md` | Full API endpoint documentation |
| `PROJECT_SUMMARY.md` | Implementation details and achievements |
| `TESTING_CHECKLIST.md` | QA testing procedures |
| `project-brief.md` | Original technical specification |

### Backend Core
| File | Purpose |
|------|---------|
| `server/src/index.js` | Express server initialization |
| `server/prisma/schema.prisma` | Database schema with 4 models |
| `server/prisma/seed.js` | Demo data generator |

### Frontend Core
| File | Purpose |
|------|---------|
| `client/src/App.jsx` | Router and main app structure |
| `client/src/main.jsx` | React DOM render entry |
| `client/src/services/api.js` | Axios setup and API calls |

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │
│  │  Login     │  │ Dashboard  │  │  Shipment Detail   │   │
│  │  Page      │  │  Page      │  │  Page              │   │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────────────┘   │
│         │                │                │                  │
└─────────┼────────────────┼────────────────┼──────────────────┘
          │                │                │
          │  HTTP/HTTPS    │                │
          │  JSON          │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express.js Server                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │
│  │  Auth      │  │ Shipments  │  │  Documents         │   │
│  │  Routes    │  │  Routes    │  │  Routes            │   │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────────────┘   │
│         │                │                │                  │
│         ▼                ▼                ▼                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │
│  │  Auth      │  │ Shipments  │  │  Documents         │   │
│  │  Controller│  │  Controller│  │  Controller        │   │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────────────┘   │
│         │                │                │                  │
└─────────┼────────────────┼────────────────┼──────────────────┘
          │                │                │
          │  Prisma ORM    │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │
│  │  users     │  │ shipments  │  │  documents         │   │
│  │  table     │  │  table     │  │  table             │   │
│  └────────────┘  └────────────┘  └────────────────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────┐            │
│  │  shipment_status_history table             │            │
│  └────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔗 Dependencies Overview

### Backend Dependencies
```json
{
  "express": "REST API framework",
  "cors": "Cross-origin resource sharing",
  "dotenv": "Environment variables",
  "bcryptjs": "Password hashing",
  "jsonwebtoken": "JWT authentication",
  "@prisma/client": "Database ORM",
  "express-validator": "Input validation",
  "multer": "File uploads",
  "helmet": "Security headers",
  "morgan": "HTTP logging"
}
```

### Frontend Dependencies
```json
{
  "react": "UI framework",
  "react-dom": "React DOM renderer",
  "react-router-dom": "Routing",
  "axios": "HTTP client",
  "lucide-react": "Icon library",
  "tailwindcss": "Utility-first CSS"
}
```

---

## 📝 Notes

- All sensitive files (`.env`, `uploads/`, `node_modules/`) are gitignored
- Database migrations are stored in `server/prisma/migrations/`
- Uploaded files are stored in `server/uploads/`
- Frontend build output goes to `client/dist/`

---

**Last Updated:** October 30, 2025  
**Total Lines of Code:** ~6,000+  
**Total Files:** 45+
