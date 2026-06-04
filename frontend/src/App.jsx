import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import StudentCourses from "./pages/StudentCourses";
import StudentLayout from "./layouts/StudentLayout";
import CourseDetailedPage from "./pages/CourseDetailedPage";
import StudentCourseModule from "./pages/StudentCourseModule";
import StudentCourseContent from "./pages/StudentCourseContent";
import StudentLectureDetails from "./pages/StudentLectureDetail";
function App() {
  const pathName = document.location.pathname;
  const isShowHeader =
    !pathName.includes("/teacher") && !pathName.includes("/student");

  return (
    <BrowserRouter>
      {isShowHeader && <Header />}
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
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
