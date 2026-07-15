# StackKraft Technologies - Production & Deployment Guide

This guide outlines instructions to set up, run, and deploy the complete StackKraft Technologies full-stack website.

---

## 1. Project Directory Structure
```text
f:/project/stackkraft/
├── frontend/                     # React.js SPA (Vite)
└── backend/                      # Node.js Express & MongoDB Rest API
```

---

## 2. Admin Credentials
The database automatically seeds a default administrator account on boot if the Admin collection is empty.
* **Username**: `sivaraman`  (or `sivaraman.official13@gmail.com`)
* **Password**: `StackKraft2026!`
* **Email**: `sivaraman.official13@gmail.com`

> [!WARNING]
> Please change this default password inside the Admin Tab of the Admin Dashboard immediately after launching in production.

---

## 3. Environment Variables Configuration
Create a `.env` file in the `backend/` directory (see `backend/.env.example` for reference):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stackkraft
JWT_SECRET=stackkraft_super_secret_key_123
ADMIN_USERNAME=sivaraman
ADMIN_PASSWORD=StackKraft2026!
ADMIN_EMAIL=sivaraman.official13@gmail.com
```

---

## 4. Local Execution

### Step A: Run MongoDB
Ensure your local MongoDB community server is running. (Default port: `27017`).

### Step B: Start Backend REST API
Open a terminal in the `backend/` folder and run:
```bash
npm run dev
```
The server launches at [http://localhost:5000](http://localhost:5000).

### Step C: Start Frontend SPA
Open a terminal in the `frontend/` folder and run:
```bash
npm run dev
```
The Vite development server launches at [http://localhost:5173](http://localhost:5173).

---

## 5. Production Build & Deployment

### Frontend (Netlify / Vercel)
1. Set the environment variable `VITE_API_URL` to point to your live backend endpoint, e.g., `https://api.stackkraft.com/api`.
2. Compile the production bundle:
   ```bash
   cd frontend
   npm run build
   ```
3. Deploy the compiled `frontend/dist` directory to Netlify or Vercel. For Vercel, ensure you configure the output directory to `dist` and attach single-page application routing redirection rules (`vercel.json` rewrites).

### Backend (Render / Railway / Heroku / DigitalOcean VPS)
1. Host the `backend/` folder on a Node-capable cloud provider.
2. Set your environment variables (`MONGODB_URI`, `JWT_SECRET`, etc.) in the provider's dashboard settings.
3. Configure the start command as:
   ```bash
   npm start
   ```
4. Serve static files from the `uploads/` directory to enable resume downloads in the career management panel.
