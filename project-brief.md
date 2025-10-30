# Dokumentasi Teknis: Wilopo Cargo Customer Portal

**Nama Proyek:** Wilopo Cargo Customer Portal & Shipment Tracking System  
**Perusahaan:** Wilopo Cargo  
**Versi:** 1.0.0 (MVP)  
**Penulis:** Ahmad Fauzan
**Tanggal:** 29 September 2025  

---

## 📑 Daftar Isi

1.  [Latar Belakang](#1-latar-belakang)
    1.1. [Profil Perusahaan](#11-profil-perusahaan)
    1.2. [Identifikasi Masalah](#12-identifikasi-masalah)
    1.3. [Tujuan Solusi](#13-tujuan-solusi)
    1.4. [Ruang Lingkup Proyek (MVP)](#14-ruang-lingkup-proyek-mvp)
2.  [Rancangan (Design)](#2-rancangan-design)
    2.1. [Arsitektur Sistem (High-Level)](#21-arsitektur-sistem-high-level)
    2.2. [User Flow & User Stories](#22-user-flow--user-stories)
    2.3. [Desain UI/UX (Wireframe Deskriptif)](#23-desain-uiux-wireframe-deskriptif)
    2.4. [Database Schema](#24-database-schema)
3.  [Arsitektur Aplikasi](#3-arsitektur-aplikasi)
    3.1. [Pemilihan Teknologi (Tech Stack)](#31-pemilihan-teknologi-tech-stack)
    3.2. [Struktur Proyek (Project Structure)](#32-struktur-proyek-project-structure)
    3.3. [Arsitektur Backend](#33-arsitektur-backend)
    3.4. [Arsitektur Frontend](#34-arsitektur-frontend)
4.  [Rencana Implementasi & Teknis](#4-rencana-implementasi--teknis)
    4.1. [Timeline Implementasi (3 Hari)](#41-timeline-implementasi-3-hari)
    4.2. [Lingkungan Pengembangan](#42-lingkungan-pengembangan)
    4.3. [Instruksi Setup Awal](#43-instruksi-setup-awal)
    4.4. [Contoh Kode Inti](#44-contoh-kode-inti)

---

## 1. Latar Belakang

### 1.1. Profil Perusahaan
Wilopo Cargo adalah perusahaan forwarder terkemuka di Indonesia yang berfokus pada layanan impor dari China ke Indonesia. Beroperasi sejak 2010, perusahaan ini telah melayani lebih dari 10.000 pelanggan dengan layanan utama seperti Less Container Loaded (LCL), Full Container Loaded (FCL), dan layanan pembayaran dalam RMB. Dengan skala 51-200 karyawan, Wilopo Cargo berkomitmen untuk menyediakan solusi logistik yang aman, efisien, dan berorientasi pada pelanggan.

### 1.2. Identifikasi Masalah
Berdasarkan riset, meskipun Wilopo Cargo telah memiliki layanan pelacakan (*live tracking*), terdapat kesenjangan dalam hal integrasi dan pengalaman pelanggan:
- **Keterbatasan Transparansi:** Pelanggan kesulitan mendapatkan gambaran lengkap status pengiriman, dokumen, dan estimasi biaya dalam satu tampilan terpadu.
- **Efisiensi Operasional:** Tim Customer Service (CS) masih banyak menghabiskan waktu untuk menjawab pertanyaan rutin mengenai status pengiriman dan dokumen yang dapat diotomasi.
- **Pengalaman Pelanggan yang Terfragmentasi:** Informasi tersebar di berbagai saluran (WhatsApp, email, telepon), yang membuat pelanggan sulit mengelola pengirimannya secara mandiri.

### 1.3. Tujuan Solusi
Untuk mengatasi masalah tersebut, dikembangkan solusi digital "Customer Portal & Shipment Tracking System" dengan tujuan:
- **Meningkatkan Transparansi:** Memberikan akses real-time terhadap status pengiriman, lokasi, dan dokumen bagi pelanggan.
- **Mengotomatisasi Proses:** Mengurangi beban tim CS dengan menyediakan portal mandiri untuk pelanggan.
- **Memperkuat Hubungan Pelanggan:** Meningkatkan kepuasan dan loyalitas pelanggan melalui pengalaman digital yang seamless.

### 1.4. Ruang Lingkup Proyek (MVP)
Proyek ini akan fokus pada pengembangan Minimum Viable Product (MVP) dalam waktu 3 hari. Fitur-fitur yang akan dikembangkan adalah:
- **Fitur Utama (In Scope):**
    - Dashboard pelanggan dengan ringkasan pengiriman aktif.
    - Halaman detail pengiriman dengan timeline status.
    - Sistem upload dan manajemen dokumen sederhana.
    - Kalkulator estimasi biaya impor.
    - Sistem autentikasi (Login/Register).
- **Fitur yang Tidak Termasuk (Out of Scope):**
    - Integrasi API pihak ketiga (seperti Maersk, CEISA).
    - Sistem pembayaran online.
    - Aplikasi mobile native (fokus pada web responsive).
    - Fitur notifikasi lanjutan (SMS/Push Notification).

---

## 2. Rancangan (Design)

### 2.1. Arsitektur Sistem (High-Level)
Sistem akan dibangun dengan arsitektur client-server yang terpisah.

```mermaid
graph TD
    subgraph "Client Side"
        A[Web Browser - React App]
    end

    subgraph "Server Side"
        B[Backend API - Node.js/Express.js]
        C[Database - PostgreSQL]
    end

    subgraph "External Services"
        D[Email Service - SendGrid]
        E[Maps API - Google Maps]
    end

    A -- HTTP/HTTPS Request --> B
    B -- Query --> C
    B -- API Call --> D
    B -- API Call --> E
    B -- JSON Response --> A
```

### 2.2. User Flow & User Stories

**User Flow Utama (Pelanggan):**
```mermaid
flowchart TD
    A[Landing Page] --> B{Login/Register};
    B --> C[Dashboard];
    C --> D[Lihat Detail Pengiriman];
    D --> E[Upload Dokumen];
    C --> F[Gunakan Kalkulator Biaya];
    C --> G[Buka Pusat Bantuan];
```

**User Stories:**
- **Sebagai** pelanggan bisnis, **saya ingin** melihat semua pengiriman aktif saya dalam satu dashboard, **agar** saya bisa memantau semuanya dengan cepat.
- **Sebagai** pelanggan, **saya ingin** melihat timeline detail dari setiap pengiriman (dari "Diambil" hingga "Tiba"), **agar** saya tahu kapan barang saya akan datang.
- **Sebagai** pelanggan, **saya ingin** meng-upload dokumen impor (Invoice, Packing List) langsung ke platform, **agar** saya tidak perlu mengirimnya via email.
- **Sebagai** calon pelanggan, **saya ingin** menggunakan kalkulator biaya untuk memperkirakan ongkos impor, **agar** saya bisa membuat anggaran dengan lebih baik.

### 2.3. Desain UI/UX (Wireframe Deskriptif)
- **Halaman Login/Register:**
    - Form sederhana dengan input email/username dan password.
    - Link "Lupa Password".
    - Tombol "Masuk" dan "Daftar Sekarang".
- **Dashboard:**
    - **Header:** Logo Wilopo Cargo, navigasi (Dashboard, Pengiriman, Dokumen, Bantuan), profil pengguna.
    - **Konten Utama:**
        - Kartu "Ringkasan Pengiriman": Total pengiriman aktif, sedang transit, sudah tiba.
        - Tabel "Pengiriman Terakhir": Menampilkan 5 pengiriman terakhir dengan kolom (ID Pengiriman, Asal, Tujuan, Status, Estimasi Tiba).
        - Tombol "Ajukan Pengiriman Baru" (untuk fitur masa depan).
- **Halaman Detail Pengiriman:**
    - Header menampilkan ID Pengiriman dan Status saat ini (misal: "Dalam Perjalanan").
    - **Timeline Status:** Visualisasi vertikal dari status pengiriman (Barang Diambil -> Di Gudang -> Dalam Perjalanan -> Tiba di Pelabuhan -> Selesai).
    - **Peta:** Peta interaktif menampilkan lokasi saat ini (jika data tersedia).
    - **Tab Informasi:**
        - **Tab Detail:** Informasi pengirim, penerima, berat, volume.
        - **Tab Dokumen:** Daftar dokumen terkait dengan tombol untuk upload/download.
- **Halaman Kalkulator Biaya:**
    - Form input: Asal (China), Tujuan (Indonesia), Berat (kg), Volume (m³), Nilai Barang (USD).
    - Tombol "Hitung Estimasi".
    - Hasil estimasi biaya yang muncul di bawah form.

### 2.4. Database Schema
Desain database relasional dengan 4 tabel utama.

```mermaid
erDiagram
    Users {
        int id PK
        string email UK
        string password_hash
        string full_name
        string company_name
        string phone
        timestamp created_at
        timestamp updated_at
    }
    Shipments {
        int id PK
        int user_id FK
        string tracking_number UK
        string origin
        string destination
        enum status
        decimal weight
        decimal volume
        decimal estimated_cost
        timestamp estimated_arrival
        timestamp created_at
        timestamp updated_at
    }
    Shipment_Status_History {
        int id PK
        int shipment_id FK
        string status
        string description
        timestamp timestamp
    }
    Documents {
        int id PK
        int shipment_id FK
        string document_type
        string file_url
        string original_name
        timestamp uploaded_at
    }

    Users ||--o{ Shipments : "has many"
    Shipments ||--o{ Shipment_Status_History : "has many"
    Shipments ||--o{ Documents : "has many"
```

---

## 3. Arsitektur Aplikasi

### 3.1. Pemilihan Teknologi (Tech Stack)
| Komponen | Teknologi | Alasan |
|---|---|---|
| **Frontend** | React.js + Vite + Tailwind CSS | Cepat, modern, dan mudah untuk membangun UI responsif. |
| **Backend** | Node.js + Express.js | JavaScript end-to-end, ekosistem besar, cocok untuk API. |
| **Database** | PostgreSQL | Andal, mendukung query kompleks, dan open-source. |
| **ORM** | Prisma | Type-safe, auto-migration, dan meningkatkan produktivitas. |
| **Autentikasi** | JWT + bcrypt | Standar industri untuk token-based auth dan hashing password. |
| **File Storage** | Local Storage (MVP) -> Cloudinary (Produksi) | Sederhana untuk MVP, siap upgrade ke cloud. |
| **Deployment** | Vercel (Frontend) + Railway/Heroku (Backend) | Mudah di-deploy dan memiliki free tier yang cukup. |

### 3.2. Struktur Proyek (Project Structure)
```
wilopo-cargo-portal/
├── client/                 # Aplikasi Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/     # Komponen reusable (Button, Input, Modal)
│   │   ├── pages/          # Halaman utama (Dashboard, ShipmentDetail)
│   │   ├── hooks/          # Custom hooks (useAuth, useShipments)
│   │   ├── services/       # Logic panggil API (api.js)
│   │   ├── utils/          # Fungsi helper (formatDate.js)
│   │   ├── styles/         # File CSS global
│   │   └── App.jsx         # Komponen utama aplikasi
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Aplikasi Backend (Node.js)
│   ├── prisma/
│   │   └── schema.prisma   # Skema database Prisma
│   ├── src/
│   │   ├── controllers/    # Logic request/response (shipmentController.js)
│   │   ├── routes/         # Definisi endpoint API (shipmentRoutes.js)
│   │   ├── middleware/     # Middleware (auth.js, validation.js)
│   │   ├── services/       # Business logic (shipmentService.js)
│   │   └── utils/          # Helper functions (generateTrackingNumber.js)
│   ├── .env                # Variabel lingkungan (RAHASIA)
│   └── package.json
│
└── README.md
```

### 3.3. Arsitektur Backend
Menggunakan pola MVC (Model-View-Controller) yang dimodifikasi.
- **Routes:** Menerima request HTTP dan memanggil controller yang sesuai.
- **Controllers:** Menangani request, memvalidasi input, memanggil service, dan mengirim response.
- **Services:** Mengandung logika bisnis (misal: menghitung biaya, memperbarui status).
- **Models (Prisma):** Berinteraksi langsung dengan database.

**Contoh Endpoint API:**
| Method | Endpoint | Deskripsi | Request Body | Response |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Mendaftarkan user baru | `{ email, password, fullName, companyName }` | `{ user: { id, email, fullName }, token }` |
| `POST` | `/api/auth/login` | Login user | `{ email, password }` | `{ user: { id, email, fullName }, token }` |
| `GET` | `/api/shipments` | Mendapatkan semua pengiriman user | - | `[{ id, trackingNumber, status, ... }]` |
| `GET` | `/api/shipments/:id` | Mendapatkan detail pengiriman | - | `{ shipment, documents, statusHistory }` |
| `POST` | `/api/shipments/:id/documents` | Upload dokumen untuk pengiriman | `FormData` | `{ document: { id, type, fileUrl } }` |
| `POST` | `/api/calculate-cost` | Menghitung estimasi biaya | `{ weight, volume, value }` | `{ estimatedCost }` |

### 3.4. Arsitektur Frontend
- **Komponen Berbasis:** UI dibangun dari komponen-komponen kecil yang dapat digunakan kembali.
- **State Management:** Menggunakan React Context API untuk state global (seperti data user yang login) dan React Hooks (`useState`, `useEffect`) untuk state lokal.
- **Routing:** Menggunakan `react-router-dom` untuk navigasi antar halaman.
- **Panggilan API:** Menggunakan `axios` atau `fetch` dalam sebuah custom hook (misal: `useApi`) untuk berkomunikasi dengan backend.

---

## 4. Rencana Implementasi & Teknis

### 4.1. Timeline Implementasi (3 Hari)
```mermaid
timeline
    title Timeline Implementasi (3 Hari)
    section Hari 1: Fondasi & Backend
        Setup Proyek : Inisiasi Git, Vite, Express.js<br>Setup Prisma & PostgreSQL
        Backend Core : Buat endpoint Auth (Register/Login)<br>Buat endpoint Shipment (CRUD)
    section Hari 2: Frontend & Integrasi
        Setup Frontend : Inisiasi React, Tailwind CSS<br>Setup Routing
        Integrasi API : Buat halaman Login/Dashboard<br>Integrasikan dengan endpoint backend
    section Hari 3: Fitur & Finalisasi
        Fitur Tambahan : Halaman Detail & Kalkulator Biaya<br>Upload Dokumen
        Finalisasi : Testing, Bug Fixing<br>Dokumentasi API & Persiapan Deploy
```

### 4.2. Lingkungan Pengembangan
- **Software:** Node.js (v18+), npm/yarn, Git, Visual Studio Code.
- **Ekstensi VS Code:** Prisma, ES7+ React/Redux/React-Native snippets, Tailwind CSS IntelliSense, Thunder Client (untuk testing API).
- **Database:** PostgreSQL (bisa menggunakan Docker atau layanan cloud seperti Supabase/Neon untuk kemudahan).

### 4.3. Instruksi Setup Awal
**1. Clone Repository:**
```bash
git clone <your-repo-url>
cd wilopo-cargo-portal
```

**2. Setup Backend:**
```bash
cd server
npm install
# Buat file .env dan isi variabel berikut
# DATABASE_URL="postgresql://user:password@localhost:5432/wilopo_db"
# JWT_SECRET="your-super-secret-jwt-key"
# PORT=5000

npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

**3. Setup Frontend:**
```bash
cd ../client
npm install
# Buat file .env dan isi variabel berikut
# VITE_API_URL=http://localhost:5000/api

npm run dev
```

### 4.4. Contoh Kode Inti

**`server/src/routes/shipmentRoutes.js`**
```javascript
const express = require('express');
const { getShipments, getShipmentById } = require('../controllers/shipmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getShipments);
router.route('/:id').get(protect, getShipmentById);

module.exports = router;
```

**`client/src/pages/Dashboard.jsx`**
```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getShipments } from '../services/api';

const Dashboard = () => {
    const { user } = useAuth();
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const data = await getShipments();
                setShipments(data);
            } catch (error) {
                console.error("Failed to fetch shipments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchShipments();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome, {user.fullName}!</h1>
            <h2>Your Shipments</h2>
            {/* Render shipment data here */}
        </div>
    );
};

export default Dashboard;
```

**`server/.env.example`**
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/wilopo_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server
PORT=5000
NODE_ENV="development"
```