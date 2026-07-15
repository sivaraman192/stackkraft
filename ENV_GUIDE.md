# StackKraft Technologies - Environment Variables & Production Guide

This guide describes how to configure environment variables, databases, and third-party integrations for **StackKraft** in both local development and live production setups.

---

## 1. Environment Configuration Files

* **Backend (`backend/.env`)**: Contains API configurations and private keys. Do **NOT** commit this file to Git.
* **Frontend (`frontend/.env`)**: Contains public endpoints. You can create a `.env.production` file for live environments.

---

## 2. MongoDB Atlas Database Setup

StackKraft uses MongoDB to store inquiries, leads, testimonials, blogs, and portfolio projects.

1. **Create an Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up.
2. **Build a Cluster**: Create a free-tier cluster (M0) in your preferred region.
3. **Database Access User**:
   * Go to **Security > Database Access**.
   * Add a new database user (e.g., `stackkraft_user`).
   * Select **Read and Write to Any Database** privileges.
   * Generate a secure password.
4. **Network Access**:
   * Go to **Security > Network Access**.
   * Add an IP address. For deployment hosts (like Render or Vercel), click **Allow Access from Anywhere** (`0.0.0.0/0`).
5. **Get Connection String**:
   * Click **Database > Connect > Drivers**.
   * Copy the connection string. It will look like this:
     ```text
     mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/stackkraft?retryWrites=true&w=majority
     ```
6. **Set Variable**:
   * Local: Set `MONGODB_URI` in `backend/.env` with your password substituted.
   * Production: Set `MONGODB_URI` in your Render Web Service environment variables dashboard.

---

## 3. Cloudinary Image Storage Setup

Cloudinary is used for uploading and resizing portfolio projects and blog post images via the Admin Dashboard.

1. **Create an Account**: Sign up at [Cloudinary](https://cloudinary.com/).
2. **Dashboard Details**: Copy the **Cloud Name**, **API Key**, and **API Secret** from the main dashboard console.
3. **Set Variables**:
   * Set the following key/value pairs in your backend environment dashboard (or `backend/.env`):
     ```env
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```

---

## 4. EmailJS Client Inquiry Form Setup

EmailJS handles direct email forwarding from the client inquiry form without requiring a complex backend SMTP mail server.

1. **Create an Account**: Sign up at [EmailJS](https://www.emailjs.com/).
2. **Add Email Service**: Link your email provider (e.g., Gmail) to get a **Service ID** (e.g., `service_xxxxxx`).
3. **Create Email Template**:
   * Create a template displaying name, email, phone, budget, projectType, and message.
   * Save it to get a **Template ID** (e.g., `template_xxxxxx`).
4. **Get Public Key**:
   * Go to **Account > API Keys** to copy your **Public Key** (e.g., `user_xxxxxx` or a random string).
5. **Set Variables**:
   * Set these variables in the **Frontend** environment settings:
     ```env
     VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
     ```
   * *Note*: If these variables are not configured, the website will gracefully fall back to storing inquiries solely in the MongoDB database without sending an email.

---

## 5. Security & Secret Keys

* **JWT Secret (`JWT_SECRET`)**: Used to sign JSON Web Tokens for administrator sessions.
  * Local default: `stackkraft_super_secret_key_123`
  * Production: Set `JWT_SECRET` in the Render dashboard to a long, cryptographically random string (Render's blueprint can automatically generate this if using `render.yaml`).
* **Admin Credentials**:
  * Set these in `backend/.env` for seeding on the initial cluster boot:
    ```env
    ADMIN_USERNAME=sivaraman
    ADMIN_PASSWORD=your_secure_password_here
    ADMIN_EMAIL=sivaraman.official13@gmail.com
    ```
  * Once the server connects, it seeds these credentials. **Change the password immediately inside the dashboard settings** after the first log in.

---

## 6. Deployment Summaries

### Frontend SPA (Vercel)
* **Root Directory**: `frontend`
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
* **Environment Variables**:
  * `VITE_API_URL`: Your live backend API address (e.g. `https://api.stackkraft.com/api` or `https://stackkraft-backend.onrender.com/api`).
  * `VITE_EMAILJS_SERVICE_ID`
  * `VITE_EMAILJS_TEMPLATE_ID`
  * `VITE_EMAILJS_PUBLIC_KEY`

### Backend REST API (Render)
* **Root Directory**: `backend`
* **Build Command**: `npm install`
* **Start Command**: `npm start`
* **Environment Variables**:
  * `MONGODB_URI` (MongoDB Atlas cluster connection)
  * `JWT_SECRET`
  * `CLOUDINARY_CLOUD_NAME`
  * `CLOUDINARY_API_KEY`
  * `CLOUDINARY_API_SECRET`
  * `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_EMAIL`
