import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

import TeacherSidebar from "../components/TeacherSidebar";

import "./TeacherLayout.css";

function TeacherLayout() {
  const { user, loading } =
    useUser();

  if (loading) {
    return (
      <div className="teacher-layout-loader">
        Loading...
      </div>
    );
  }

  if (
    !user ||
    user.role !== "teacher"
  ) {
    return (
      <Navigate to="/login" />
    );
  }

  return (
    <div className="teacher-layout">

      <TeacherSidebar />

      <main className="teacher-layout-content">
        <Outlet />
      </main>

    </div>
  );
}

export default TeacherLayout;