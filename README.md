# Belajar Vibe Coding - ElysiaJS + Drizzle + MySQL Backend

Project backend modern yang dibangun menggunakan runtime **Bun**, web framework **ElysiaJS**, ORM **Drizzle**, dan database **MySQL**.

## 🚀 Tech Stack
- **Runtime**: [Bun](https://bun.sh/) (v1.3.14)
- **Web Framework**: [ElysiaJS](https://elysiajs.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database Driver**: `mysql2`
- **Database**: MySQL

---

## 🛠️ Langkah Instalasi & Setup

### 1. Kloning Repositori
```bash
git clone https://github.com/Akamafnan/belajar-vibe-coding.git
cd belajar-vibe-coding
```

### 2. Instalasi Dependencies
```bash
bun install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env` lalu sesuaikan kredensial database Anda:
```bash
cp .env.example .env
```
Sesuaikan parameter koneksi di `.env`:
```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
PORT=3000
```

### 4. Migrasi Database
Untuk generate file migrasi SQL dari skema TypeScript:
```bash
bun run db:generate
```
Untuk menerapkan perubahan skema langsung ke database MySQL:
```bash
bun run db:push
```

---

## 🏃‍♂️ Menjalankan Aplikasi

### Mode Development (dengan hot-reload)
```bash
bun run dev
```

### Mode Production
```bash
bun run start
```

Aplikasi akan berjalan di `http://localhost:3000` (atau port sesuai konfigurasi `.env`).

---

## 📌 Endpoint API Tersedia
- `GET /` - Status cek aplikasi.
- `GET /users` - Mengambil daftar user dari database.
- `POST /users` - Menambahkan user baru (butuh payload JSON `{ "name": "...", "email": "..." }`).
