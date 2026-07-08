<div align="center">
  <h1>📚 EduVerse</h1>
  <p><strong>AI-Powered Learning Management System</strong></p>
  <p>
    A full-stack LMS platform connecting teachers and students — built with React, Express, and MongoDB.
  </p>
</div>

---

## ✨ Overview

EduVerse is a comprehensive Learning Management System where **teachers** can create structured courses with modules, chapters, video lectures, study materials, and quizzes, while **students** can enroll, watch lectures, attempt quizzes, and track their progress through an intuitive dashboard.

---

## 🚀 Features

### 🔐 Authentication
- Register as a **Student** or **Teacher** (with profile image upload)
- Login/Logout with JWT stored in httpOnly cookies (7-day expiry)
- Persistent session via `/auth/me` on page reload

### 📐 Course Management (Teacher)
- Create courses with title, description, thumbnail, trailer video, category, level, language, requirements, and learning outcomes
- Organize content into **Modules** → **Chapters** → **Lectures** (drag-order support)
- Each lecture supports:
  - 🎥 Video upload & streaming
  - 📝 Text content / notes
  - 📎 Attachments: PDFs, code files, images, study materials
- Update and delete courses, modules, chapters, and lectures

### 🧪 Quiz System (Teacher)
- Create quizzes per lecture with multiple questions
- Each question: text, 4 options, correct answer, explanation, marks
- Difficulty levels: easy, medium, hard

### 🤖 AI Quiz Generation (Planned)
- AI-generated practice quizzes tailored per student per lecture
- Separate `AiQuiz` model ready for integration

### 👩‍🎓 Student Experience
- Browse all courses with **filters** (category, language, level) and **pagination**
- View detailed course info and **enroll**
- Navigate structured content: Course → Modules → Chapters → Lectures
- Watch lecture videos with **chunked streaming** (HTTP 206 Partial Content)
- Download/view attached materials
- Attempt quizzes and see scores
- Mark lectures as complete/incomplete
- **Progress dashboard**: joined courses, lectures completed, quiz attempts, overall progress %

### 🏆 Certificate Generation (Planned)
- Auto-generated certificates upon course completion

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 6, React Router DOM 7 |
| **HTTP Client** | Axios 1 |
| **UI Icons** | react-icons, lucide-react |
| **Notifications** | react-hot-toast |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB + Mongoose 9 |
| **Auth** | JWT + bcrypt |
| **File Upload** | Multer 2 |
| **Linting** | ESLint 9 |

---

## 📁 Project Structure

```
EduVerse/
├── backend/                      # Express API server
│   ├── src/
│   │   ├── server.js             # Entry point
│   │   ├── config/
│   │   │   └── db.js             # MongoDB connection
│   │   ├── models/               # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Module.js
│   │   │   ├── Chapter.js
│   │   │   ├── Lecture.js
│   │   │   ├── Quiz.js
│   │   │   ├── AiQuiz.js
│   │   │   ├── Enrollment.js
│   │   │   └── Progress.js
│   │   ├── routes/               # Express routers
│   │   │   ├── authRoutes.js
│   │   │   ├── courseRoutes.js
│   │   │   ├── moduleRoutes.js
│   │   │   ├── chapterRoutes.js
│   │   │   ├── lectureRoutes.js
│   │   │   ├── quizRoutes.js
│   │   │   ├── enrollmentRoutes.js
│   │   │   └── progressRoutes.js
│   │   ├── controllers/          # Business logic
│   │   ├── middlewares/          # Auth, role, error handling
│   │   ├── validators/           # Request validation
│   │   └── utils/
│   │       └── upload.js         # Multer config
│   ├── uploads/                  # Uploaded files
│   ├── .env-example
│   └── package.json
│
├── frontend/                     # React SPA
│   ├── src/
│   │   ├── main.jsx              # Entry point
│   │   ├── App.jsx               # Router + layout
│   │   ├── context/
│   │   │   └── UserContext.jsx    # Auth state
│   │   ├── utils/
│   │   │   └── api.js            # Axios instance
│   │   ├── layouts/
│   │   │   ├── TeacherLayout.jsx
│   │   │   └── StudentLayout.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   ├── QuizBuilder.jsx
│   │   │   ├── TeacherSidebar.jsx
│   │   │   ├── StudentSidebar.jsx
│   │   │   └── home/
│   │   └── pages/                # All page components
│   ├── index.html
│   ├── vite.config.js
│   ├── .env-example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🧮 Database Schema (MongoDB)

| Collection | Purpose |
|-----------|---------|
| `users` | Students & teachers (role, profile, auth) |
| `courses` | Course metadata & structure |
| `modules` | Ordered modules within a course |
| `chapters` | Ordered chapters within a module |
| `lectures` | Video, materials, and associated quizzes |
| `quizes` | Teacher-created quizzes per lecture |
| `ai_quizes` | AI-generated practice quizzes per student |
| `enrollments` | Student ↔ Course enrollment records |
| `progress` | Per-student course progress & quiz attempts |

---

## 🔌 API Endpoints

All routes are prefixed with `/api/v1/`.

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | — | Register (student/teacher) |
| POST | `/auth/login` | — | Login |
| POST | `/auth/logout` | ✓ | Logout |
| GET | `/auth/me` | ✓ | Get current user |

### Courses
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/course/create` | Teacher | Create course |
| PUT | `/course/update` | Teacher | Update course |
| GET | `/course/all` | — | List courses (filter + paginate) |
| GET | `/course/:courseId` | — | Get course details |
| DELETE | `/course/:courseId` | Teacher | Delete course |
| GET | `/course/teacher-courses/:teacherId` | Teacher | Teacher's courses |
| GET | `/course/teacher-dashboard/:teacherId` | Teacher | Dashboard stats |
| GET | `/course/student-join-courses/:studentId` | ✓ | Student's enrolled courses |
| GET | `/course/is-student-joined/:courseId` | ✓ | Check enrollment status |

### Modules, Chapters, Lectures
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST/GET | `/modules/` | ✓ | Create / Get modules |
| PUT/DELETE | `/modules/` | Teacher | Update or delete module |
| GET | `/lectures/video/stream/:lectureId` | Enrolled | Stream video (Range/206) |

### Quizzes, Enrollment, Progress
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/quizes/create` | Teacher | Create quiz |
| POST | `/enrollement/join` | ✓ | Enroll in course |
| POST | `/progress/mark-complete` | ✓ | Mark lecture complete |
| POST | `/progress/mark-incomplete` | ✓ | Mark lecture incomplete |
| POST | `/progress/submit-quiz` | ✓ | Submit quiz attempt |
| GET | `/progress/dashboard/student/:studentId` | ✓ | Student dashboard stats |

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `4000` | API server port |
| `MODE` | `"development"` | Environment mode |
| `FRONTEND_URL` | `"*"` | Allowed CORS origin |
| `MONGO_URL` | `"mongodb://localhost:27017/EduVerse"` | MongoDB connection string |
| `JWT_SECRET` | `"secretKey"` | JWT signing secret |

### Frontend (`frontend/src/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `"http://localhost:4000"` | Backend API base URL |

---

## 🔧 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local instance on default port `27017`)
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/EduVerse.git
cd EduVerse
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create environment file
cp .env-example .env
# Edit .env with your MongoDB URL & JWT secret

npm run dev      # Development (nodemon auto-reload)
# OR
npm start        # Production
```

The API server starts on **http://localhost:4000**.

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create environment file
cp src/.env-example src/.env
# Edit if your backend runs on a different port

npm run dev      # Vite dev server
# OR
npm run build    # Production build
npm run preview  # Preview production build
```

The frontend dev server starts on **http://localhost:5173**.

### 4. Open the App

Navigate to **http://localhost:5173** in your browser.

- Register a **Teacher** account to create courses
- Register a **Student** account to enroll and learn

---

## 🧪 Running Lint

```bash
cd frontend
npm run lint
```

---

## 📦 Dependencies

### Backend (8 production)
`express`, `mongoose`, `bcrypt`, `jsonwebtoken`, `cookie-parser`, `cors`, `multer`, `dotenv`

### Frontend (6 production)
`react`, `react-dom`, `react-router-dom`, `axios`, `react-hot-toast`, `react-icons` / `lucide-react`

---

## 🏗️ Architecture

```
[Browser - React SPA on :5173]
       |
       | Axios HTTP (credentials: true)
       |
[Express API Server on :4000]
       |
       | Mongoose ODM
       |
[MongoDB on localhost:27017]
```

- **Frontend**: React 19 SPA with Vite, client-side routing via React Router DOM v7, global auth state via React Context.
- **Backend**: Express 5 MVC architecture with JWT auth (httpOnly cookies), Multer file uploads, and HTTP Range-based video streaming.
- **Data Flow**: All API calls flow through a centralized Axios instance. Auth state is restored on page load via `GET /auth/me`.

---

## 📸 Screenshots

> Add screenshots of the app here once available.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License.

---
