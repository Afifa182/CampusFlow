# CampusFlow – MERN Stack Task Manager

A simple full-stack web application built with **MongoDB, Express.js, React.js and Node.js**
(Term Work-2 – Micro Project). Users can register, log in, and manage their own personal
tasks (create, view, edit, delete).

## Features
- Home page
- User registration & login (JWT authentication, bcrypt-hashed passwords)
- Protected data display page (task list with search and status filter)
- Full CRUD: add, edit, delete, mark done
- MongoDB integration using Mongoose
- Responsive layout (mobile, tablet, desktop)

## Tech Stack
| Layer    | Technology                           |
|----------|--------------------------------------|
| Database | MongoDB + Mongoose                   |
| Backend  | Node.js, Express.js, JWT, bcryptjs   |
| Frontend | React 18 (Vite), React Router, Axios |

## Project Structure
```
mern-task-manager/
├── server/            # Express API
│   ├── config/db.js
│   ├── models/        (User.js, Task.js)
│   ├── middleware/    (auth.js)
│   ├── routes/        (auth.js, tasks.js)
│   └── server.js
└── client/            # React app
    └── src/
        ├── components/  (Navbar, ProtectedRoute, TaskForm)
        ├── context/     (AuthContext)
        ├── pages/       (Home, AuthForm, Dashboard)
        ├── api.js
        └── App.jsx
```

## Prerequisites
- Node.js 18+
- MongoDB running locally, or a free MongoDB Atlas connection string

## Setup & Run

### 1. Backend
```bash
cd server
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm run dev
```
API runs on http://localhost:5000

### 2. Frontend (second terminal)
```bash
cd client
npm install
cp .env.example .env
npm run dev
```
App runs on http://localhost:5173

## API Endpoints
| Method | Endpoint           | Description                    | Auth |
|--------|--------------------|--------------------------------|------|
| POST   | /api/auth/register | Create account                 | No   |
| POST   | /api/auth/login    | Log in, receive token          | No   |
| GET    | /api/auth/me       | Current user                   | Yes  |
| GET    | /api/tasks         | List tasks (?status=&search=)  | Yes  |
| POST   | /api/tasks         | Create task                    | Yes  |
| PUT    | /api/tasks/:id     | Update task                    | Yes  |
| DELETE | /api/tasks/:id     | Delete task                    | Yes  |

## Author
Name: ____________  |  Roll No: ____________  |  Class: ____________
