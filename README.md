# 💼 Job Application Tracker

A full-stack web application that allows users to efficiently **track and manage their job applications**. Built using the MERN stack (MongoDB, Express, React, Node.js), it helps candidates stay organized and focused during the job search process.

---

## 🚀 Features

- 🔐 **User Authentication** (Signup & Login)
- 📝 **Add, Edit, Delete Job Applications**
- 📊 **Application Status** (Applied, Interview, Offer, Rejected)
- 🎨 **Responsive UI with floating background**
- 📌 **Job Notes & Applied Date**
- 📥 **Centralized Dashboard View**
- 📚 **MongoDB Database Integration**


##🛠️ Tech Stack

| Frontend     | Backend      | Database   | Tools        |
|--------------|--------------|------------|--------------|
| React.js     | Express.js   | MongoDB    | Node.js      |
| CSS3         | Node.js      | Mongoose   | Git, GitHub  |
| React Router | JWT Auth     |            | Postman      |

---

### 🗂️ Project Structure

job-application-tracker/
├── job-tracker-frontend/     # React Frontend
│   └── src/pages              # Login, Signup, Dashboard, JobForm
├── controllers/              # API Controllers
├── models/                   # Mongoose Models
├── routes/                   # Auth & Job Routes
├── middleware/               # Auth Middleware
├── utils/                    # Utility Functions (Mailer, etc.)
└── server.js                 # Entry point for Express backend

---

## 📦 Required Dependencies

### ➤ Backend (Install in root folder)
npm install express mongoose cors dotenv bcryptjs jsonwebtoken nodemailer

### ➤ Frontend (Install inside job-tracker-frontend folder)
npm install axios react-router-dom

### 🚀 How to Run the App Locally
1️⃣ Clone the Repository
git clone https://github.com/pankaj7017523537/job-application-tracker.git
cd job-application-tracke

### 2️⃣ Start Backend 
npm install
npm start
# Runs at http://localhost:5000

###3️⃣ Start Frontend
cd job-tracker-frontend
npm install
npm start
# Runs at http://localhost:3000

🧑‍💻 Author
👨‍💻 Pankaj Kumar
📧 pankaj7017523537@gmail.com
🌐 GitHub


