# EventHub – Event Booking & Management Platform

A full-stack event booking and management platform where users can browse, book, and manage event reservations, while organizers can create, update, and monitor their own events through a dedicated dashboard.

---

## 🌐 Live Demo

🚀 The project is deployed and available online:

👉 https://eskola-front.vercel.app/home

> You can explore the platform and experience the complete booking workflow without running the project locally.

---
## Tech Stack

### Frontend
- **Next.js 16** – Full-stack React framework used for routing, rendering, and application structure.
- **Tailwind CSS 4** – Utility-first CSS framework for responsive and modern UI design.
- **TanStack Query** – Server state management, caching, and data fetching.
- **Zustand** – Lightweight global state management.
- **Formik + Yup** – Form handling and validation.
- **React Hot Toast** – Toast notifications for user feedback.
- **Cloudinary** – Image upload and cloud storage for event images.
- **SweetAlert2** – Interactive alerts and confirmation dialogs.
- **Lucide React & React Icons** – Icon libraries for UI enhancement.

### Backend
- **Node.js** – JavaScript runtime environment.
- **Express.js** – REST API framework for backend services.
- **MongoDB** – NoSQL database for storing users, events, and bookings.
- **Mongoose** – ODM for MongoDB schema modeling and database operations.
- **JWT Authentication** – Secure authentication and authorization.
- **bcrypt** – Password hashing and security.
- **Nodemailer** – Sending booking confirmation emails.  (bouns)
- **ExcelJS** – Exporting bookings and attendees to Excel files.  (bouns)

### Dev Tools & Testing
- **Docker & Docker Compose** – Containerized development and deployment environment.
- **Jest** – Unit testing framework.

---

## Setup Instructions


### 1. Clone the Repository

```bash
git clone https://github.com/eskola-tech/technical-task-mohamed-tarek.git
cd technical-task-mohamed-tarek
```


## Environment Configuration

### 2. Configure Cloudinary Variables

Before running the project, update the `docker-compose.yml` file with your own Cloudinary credentials:

```yml
frontend:
  build:
    context: ./frontend
    args:
      NEXT_PUBLIC_API_URL: http://localhost:5000
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: your_cloud_name
      NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: your_upload_preset
```

You must replace:

- `your_cloud_name`
- `your_upload_preset`

with your own Cloudinary values in order to enable image uploads.

---

### 3. Configure Backend Environment Variables

Inside the `backend` folder, you will find a file named:

```bash
backend/.env.example
```

Create a new file named:

```bash
backend/.env
```

Then copy the values from `.env.example` and update the email configuration:

```env
MONGODB_CONNECTION_STRING=mongodb://mongo:27017/eventdb

JWT_SECRET=8f3a9c2d91b7e4f6a0c5d8e2f9a1b3c7

FRONTEND_URL=http://localhost:3000

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```
### Email Configuration Notes (Required for Nodemailer Email Sending)

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

- `EMAIL_USER` → Your Gmail address.
- `EMAIL_PASS` → Your Gmail App Password used by Nodemailer.

> Do NOT use your normal Gmail password.

Before generating an App Password, you must enable **2-Step Verification** on your Google account.

After enabling 2-Step Verification:

1. Go to your Google Account settings.
2. Open **Security**.
3. Search for **App Passwords**.
4. Generate a new app password for Mail.
5. Use the generated password as `EMAIL_PASS` Environment Variable. 

This is required because Gmail blocks regular password authentication for less secure apps.

---

## Running the Application

### 4. Start Docker Containers

Run the following command from the project root:

```bash
docker-compose up --build
```

This will start:

- MongoDB
- Backend server
- Frontend application

---

### 5. Seed the Database

After all Docker containers are running, open a new terminal and execute:

```bash
docker exec -it backend npm run seed
```

This command inserts sample data into the database including:

- Categories
- Events
- Demo users
- Bookings

> Make sure Docker containers are already running before executing this command.

---

## Access the Application

### Frontend

```bash
http://localhost:3000/home
```

### Backend API

```bash
http://localhost:5000
```

---

## Test Accounts for Demo

| Role | Email | Password |
|------|------|------|
| Organizer | john.smith@events.com | 123456 |
| Organizer | sarah.johnson@events.com | 123456 |
| User | alice@example.com | 123456 |
| User | bob@example.com | 123456 |


---
## 📌 API Endpoints Overview

This project exposes a RESTful API for authentication, events, bookings, categories, and organizer dashboard features.

---

### 🔐 Auth Routes
Base URL: `/api/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/login` | Login user | ❌ |
| POST | `/register` | Register new user | ❌ |
| POST | `/logout` | Logout user | ❌ |
| GET | `/me` | Get current user profile | ✅ |
| PUT | `/me` | Update current user profile | ✅ |

---

### 🎟️ Events Routes
Base URL: `/api/events`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all events | ❌ |
| POST | `/` | Create new event |✅ Organizer Only |
| GET | `/:id` | Get event by ID | ❌ |
| PUT | `/:id` | Update event | ✅ Organizer Only|
| DELETE | `/:id` | Delete event |✅ Organizer Only|

---

### 📂 Categories Routes
Base URL: `/api/categories`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all categories | ❌ |

---

### 🎫 Bookings Routes
Base URL: `/api/bookings`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get user bookings | ✅  |
| POST | `/` | Create booking | ✅ |
| GET | `/:bookingId` | Get booking by ID | ✅ |
| DELETE | `/:bookingId` | Cancel booking | ✅ |

---

### 🧑‍💼 Organizer Routes
Base URL: `/api/organizer`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/events` | Get organizer events | ✅ Organizer Only |
| GET | `/events/:id/bookings` | Get event bookings | ✅ Organizer Only |
| GET | `/events/:id/bookings/excel` | Export bookings to Excel | ✅ Organizer Only |
| GET | `/dashboard` | Get organizer dashboard data | ✅ Organizer Only |

---


