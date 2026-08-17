# KCET Companion 🎓

A full-stack web application designed to help **KCET aspirants** prepare efficiently through previous-year questions, chapter-wise practice, mock tests, performance tracking, and personalized preparation tools.

🔗 **Live Demo:** https://kcet-companion.vercel.app/

---

## 🚀 Features

### 📚 Chapter-wise Learning

* Physics, Chemistry, and Mathematics
* Organized according to the **NCERT/KCET syllabus**
* Browse subjects and chapters easily
* Practice questions chapter by chapter

### 📝 Previous Year Questions

* KCET previous-year question papers
* Questions organized by:

  * Subject
  * Chapter
  * Year
* Useful for understanding KCET question patterns

### 🎯 Practice

* Practice questions based on selected chapters
* Track answers and performance
* Immediate feedback while practicing

### 🧪 Mock Tests

* Full-length KCET-style mock tests
* Timed test environment
* Automatic evaluation
* Score calculation

### 📊 Performance Dashboard

* Track your preparation progress
* View test performance
* Monitor scores and accuracy
* Analyze preparation over time

### 🔐 Authentication

* User registration and login
* Protected routes
* Persistent authentication
* Secure logout

### 📱 Responsive UI

* Responsive design for desktop and mobile
* Clean and student-friendly interface
* Tailwind CSS based styling

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **Vite**
* **React Router**
* **Tailwind CSS**
* **Axios**
* **Chart.js**
* **Framer Motion**
* **Better React MathJax**

### Backend

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **JWT / Cookie-based Authentication**
* REST APIs

### Deployment

* **Frontend:** Vercel
* **Backend:** Vercel / Cloud deployment
* **Database:** PostgreSQL

---

## 📂 Project Structure

```text
KCET-COMPANION/
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
└── Backend/
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── services/
    │   └── ...
    │
    ├── package.json
    └── ...
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/NIKHIL18122006/KCET-COMPANION.git
```

```bash
cd KCET-COMPANION
```

---

## 💻 Frontend Setup

Navigate to the frontend:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=YOUR_BACKEND_URL
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

## 🖥️ Backend Setup

Navigate to the backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file containing your database and authentication configuration.

Example:

```env
DATABASE_URL=YOUR_POSTGRESQL_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
PORT=5000
```

Start the backend:

```bash
npm run dev
```

or:

```bash
npm start
```

---

## 🔗 API Communication

The frontend communicates with the backend through REST APIs.

Example:

```text
Frontend
   │
   │ HTTP Requests
   ▼
Express Backend
   │
   │ SQL Queries
   ▼
PostgreSQL Database
```

Axios is used on the frontend to communicate with the backend APIs.

---

## 🗄️ Database

KCET Companion uses **PostgreSQL** for storing application data such as:

* Users
* Questions
* Subjects
* Chapters
* Previous-year questions
* Test results
* Practice progress
* User performance

---

## 🔐 Authentication Flow

The application uses protected routes to prevent unauthorized access.

```text
User
 │
 ▼
Login
 │
 ▼
Backend Authentication
 │
 ▼
Authentication Cookie / Token
 │
 ▼
AuthProvider
 │
 ▼
ProtectedRoute
 │
 ├── Authenticated → Dashboard
 │
 └── Not Authenticated → Login
```

The `AuthProvider` checks the current authenticated user when the application starts.

---

## 🎨 UI & Design

KCET Companion uses **Tailwind CSS** for styling.

The interface focuses on:

* Simple navigation
* Clear typography
* Responsive layouts
* Interactive cards
* Smooth animations
* Student-friendly design

The application follows a blue/purple visual identity throughout the interface.

---

## 📈 Future Improvements

Some planned improvements include:

* [ ] More KCET question papers
* [ ] Advanced performance analytics
* [ ] Personalized study recommendations
* [ ] Difficulty-based practice
* [ ] Leaderboards
* [ ] Study streaks
* [ ] More mock tests
* [ ] Improved mobile experience
* [ ] AI-powered question explanations
* [ ] Personalized preparation plans

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/your-feature
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add your feature"
```

5. Push the branch

```bash
git push origin feature/your-feature
```

6. Create a Pull Request

---

## 👨‍💻 Author

**Nikhil N**

Computer Science Engineering Student
Full-Stack Developer | Competitive Programmer

---

## ⭐ Support

If you find **KCET Companion** useful, consider giving the repository a ⭐ on GitHub.

**KCET Companion — Learn • Practice • Succeed 🚀**
