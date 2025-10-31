# EverWrite - Full Stack Notes App

EverWrite is a **MERN stack** notes application that allows users to securely **create, edit, delete, and manage notes**. It includes **user authentication**, **profile management**, and a **responsive UI** built with Tailwind CSS.

## 🚀 Features

- 📝 **Create, Edit, Delete Notes**
- 📌 **Pin Important Notes**
- 🔐 **User Authentication (Signup/Login)**
- 👤 **User Profile name Management**
- 📱 **Responsive UI** with Tailwind CSS

## 🏗️ Tech Stack

### **Frontend:**

- ⚛️ **React 19**
- 🎨 **Tailwind CSS**
- 🚀 **React Router 7**
- 📡 **Axios** for API calls
- 📆 **Moment.js** for date formatting
- 🎨 **React Icons** for UI elements
- 🔲 **React Modal** for pop-ups

### **Backend:**

- 🏗️ **Express.js**
- 🗄️ **MongoDB with Mongoose**
- 🔑 **JWT Authentication**
- 🌎 **CORS Configuration**
- 🛠️ **dotenv for environment variables**
- ♻️ **Nodemon for development**

## 🎮 Live Demo

🔗 **[EverWrite Live](https://ever-write-frontend.vercel.app/)**

## 🔧 Installation & Setup

### **1. Clone the repository**

```bash
git clone https://github.com/sarthak1656/everwrite.git
cd everwrite
```

### **2. Backend Setup**

```bash
cd backend
npm install
```

#### **Create a ****************`.env`**************** file in the backend directory:**

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

```bash
npm start   # Runs the backend server
```

### **3. Frontend Setup**

```bash
cd ../client
npm install
npm run dev   # Runs the frontend in development mode
```

## 📌 API Routes

### **Auth Routes** (`/api/auth`)

- `POST /signup` - Create a new user
- `POST /login` - Authenticate user & return token
- `GET /profile` - Get logged-in user profile

### **Notes Routes** (`/api/notes`)

- `POST /addNote` - Add a new note
- `GET /getAllNotes` - Fetch all notes
- `PUT /editNote/:id` - Update a note
- `DELETE /deleteNote/:id` - Delete a note



## 🚀 Deployment

- **Backend** is deployed on **Render**
- **Frontend** is hosted on **Netlify**



