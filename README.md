# 🦸‍♂️ Habit Hero

**Habit Hero** is a full-stack MERN (MongoDB, Express, React, Node.js) application that helps users build, track, and improve their habits with a clean and responsive interface. It supports authentication, habit creation, logging, and progress tracking.

---

## 🚀 Live Links

- 🌐 **Frontend (Render):** [(https://habit-hero-frontend.onrender.com)](https://habit-hero-frontend.onrender.com)
- 🖥️ **Backend (Render):** [https://habit-hero-backend.onrender.com](https://habit-hero-backend.onrender.com)

---

## 📦 Tech Stack

| Frontend                | Backend                     | Database       |
|-------------------------|-----------------------------|----------------|
| React (Vite)            | Node.js + Express.js        | MongoDB (Atlas)|
| Redux Toolkit           | REST API                    | Mongoose       |
| Tailwind CSS            | JWT Authentication          |                |
| React Router v6         | bcrypt for password hashing |                |

---

## 🧠 Features

- 👤 User authentication (Login, Signup, Logout)
- 🔐 JWT-based session handling
- ✅ Create, update, delete habits
- 📅 Track daily habit logs
- 🏆 View achievements and progress
- 📊 Habit history with timestamps
- ✨ Mobile responsive design with Tailwind CSS

---

## 📁 Project Structure

habit-hero/
├── Backend/
│ ├── src/
│ │ ├── routes/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── middleware/
│ │ └── app.js
│ ├── .env
│ └── package.json

├── Frontend/
│ ├── public/
│ │ └── _redirects
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── redux/
│ │ └── App.jsx
│ ├── .env
│ └── package.json



---

## ⚙️ Setup Instructions

### 🛠 Backend

```bash
cd Backend
npm install
# create a .env file with:
# MONGO_URI=your_mongodb_uri
# FRONTEND_URL=http://localhost:5173
# JWT_SECRET_STRING=your_secret
# PORT=3000
npm run backend

cd Frontend
npm install
# create .env with:
# VITE_BACKEND_URL=http://localhost:3000
npm run dev

reordering

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

📄 License
MIT License. Free to use and modify.

Built with 💙 by Harsh Patel
