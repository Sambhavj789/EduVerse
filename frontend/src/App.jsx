import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherCourses from "./pages/TeacherCourses";
import CourseModules from "./pages/CourseModules";
import CourseContent from "./pages/CourseContent";
import LectureDetails from "./pages/LectureDetails";
import QuizBuilder from "./components/QuizBuilder";
import CreateLecture from "./pages/CreateLecture";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import StudentDashboard from "./pages/StudentDashboard";
import StudentCoursePlayer from "./pages/StudentCoursePlayer";
import StudentLayout from "./layouts/StudentLayout";

function AppContent() {
  const location = useLocation();
  const isPortalRoute = location.pathname.includes("/teacher") || location.pathname.includes("/student");

  return (
    <>
      {!isPortalRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="course/:courseId" element={<StudentCoursePlayer />} />
        </Route>

        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="course-modules/:courseId" element={<CourseModules />} />
          <Route path="course-content/:moduleId" element={<CourseContent />} />
          <Route path="create-lecture/:chapterId" element={<CreateLecture />} />
          <Route path="lecture-detail/:lectureId" element={<LectureDetails />} />
          <Route
            path="quiz-builder/:lectureId"
            element={<QuizBuilder />}
          />
        </Route>
      </Routes>
      {!isPortalRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App;
