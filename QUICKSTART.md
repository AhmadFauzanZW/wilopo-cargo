# 🚀 QUICK START - Wilopo Cargo

## ✅ YOU HAVE 3 OPTIONS TO RUN THE SETUP:

---

### Option 1: Batch File (✅ RECOMMENDED - No Execution Policy Issues)

```batch
setup.bat
```

Then start the servers:
```batch
:: Terminal 1
start-backend.bat

:: Terminal 2  
start-frontend.bat
```

---

### Option 2: PowerShell Script

If you want to use PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup.ps1
```

Or allow script execution first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup.ps1
```

---

### Option 3: Manual Setup (Step by Step)

#### Backend:
```bash
cd server
npm install
copy .env.example .env
# Edit .env with your database URL and JWT secret
npx prisma migrate dev --name init
npx prisma generate
node prisma/seed.js
npm run dev
```

#### Frontend (in new terminal):
```bash
cd client
npm install
copy .env.example .env
npm run dev
```

---

## 📝 BEFORE RUNNING SETUP:

### 1. Database Setup Required!

You need a PostgreSQL database. Choose one:

#### Option A: Cloud Database (Easiest)
- Go to https://neon.tech or https://supabase.com
- Create free account
- Create new project
- Copy connection string (looks like: `postgresql://user:pass@host:5432/db`)

#### Option B: Local PostgreSQL
- Install PostgreSQL from https://www.postgresql.org/download/
- Create database: `createdb wilopo_db`
- Connection string: `postgresql://postgres:password@localhost:5432/wilopo_db`

### 2. Update Environment File

After running setup, edit `server\.env`:

```env
DATABASE_URL="postgresql://your-connection-string-here"
JWT_SECRET="generate-random-secret"
```

To generate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🎯 AFTER SETUP:

### Start the Application:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client  
npm run dev
```

### Access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Demo Login:
- Email: `demo@wilopocargo.com`
- Password: `password123`

---

## ⚠️ TROUBLESHOOTING:

### "Cannot run setup.ps1"
✅ **Solution:** Use `setup.bat` instead (works without execution policy)

### "Database connection failed"
✅ **Solution:** Update `DATABASE_URL` in `server\.env` with valid PostgreSQL connection

### "Port 5000 already in use"
✅ **Solution:** Change `PORT=5001` in `server\.env`

### "Module not found"
✅ **Solution:** Run `npm install` in the appropriate directory

### "Prisma migration failed"
✅ **Solution:** 
1. Check DATABASE_URL is correct
2. Ensure PostgreSQL is running
3. Database user has create table permissions

---

## 📚 DETAILED HELP:

For complete instructions, see:
- **SETUP_GUIDE.md** - Full installation guide
- **DOCUMENTATION_INDEX.md** - Master documentation
- **README.md** - Project overview

---

## 💡 QUICK TIPS:

✅ Use `setup.bat` if PowerShell gives errors  
✅ Always check `server\.env` has correct DATABASE_URL  
✅ Generate secure JWT_SECRET (don't use example)  
✅ Make sure ports 5000 and 5173 are free  
✅ Run backend first, then frontend  

---

**Need Help?** Check SETUP_GUIDE.md for detailed troubleshooting!
