import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherCourses from "./pages/TeacherCourses";
import CourseModules from "./pages/CourseModules";
import CourseContent from "./pages/CourseContent";
import LectureDetails from "./pages/LectureDetails";
import QuizBuilder from "./components/QuizBuilder";
import CreateLecture from "./pages/CreateLecture";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentCourses from "./pages/StudentCourses";
import StudentLayout from "./layouts/StudentLayout";
import CourseDetailedPage from "./pages/CourseDetailedPage";
import StudentCourseModule from "./pages/StudentCourseModule";
import StudentCourseContent from "./pages/StudentCourseContent";
import StudentLectureDetails from "./pages/StudentLectureDetail";
import StudentDashboard from "./pages/StudentDashboard";

function AppShell() {
  const { pathname } = useLocation();
  const isPanelRoute =
    pathname.startsWith("/teacher") || pathname.startsWith("/student");

  return (
    <>
      {!isPanelRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:courseId" element={<CourseDetailedPage />} />

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="course-modules/:courseId" element={<CourseModules />} />
          <Route path="course-content/:moduleId" element={<CourseContent />} />
          <Route path="create-lecture/:chapterId" element={<CreateLecture />} />
          <Route
            path="lecture-detail/:lectureId"
            element={<LectureDetails />}
          />
          <Route path="quiz-builder/:lectureId" element={<QuizBuilder />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route
            path="course/:courseId/modules"
            element={<StudentCourseModule />}
          />
          <Route
            path="course/course-content/:moduleId"
            element={<StudentCourseContent />}
          />
          <Route
            path="course/:courseId/lecture-detail/:lectureId"
            element={<StudentLectureDetails />}
          />
          <Route path="dashboard" element={<StudentDashboard />} />
        </Route>
      </Routes>
      {!isPanelRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
