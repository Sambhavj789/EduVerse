import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/TeacherCourses";
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherCourses from "./pages/TeacherCourses";
import CourseModules from "./pages/CourseModules";
import CourseContent from "./pages/CourseContent";
import LectureDetails from "./pages/LectureDetails";
import QuizBuilder from "./components/QuizBuilder";
function App() {

  const pathName = document.location.pathname;
  const isShowHeader = !pathName.includes("/teacher") && !pathName.includes("/student");

  return (
    <BrowserRouter>
      {isShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="course-modules/:courseId" element={<CourseModules />} />
          <Route path="course-content/:moduleId" element={<CourseContent />} />
          <Route path="lecture-detail/:lectureId" element={<LectureDetails />} />
          <Route
            path="quiz-builder/:lectureId"
            element={<QuizBuilder />}
          />
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;