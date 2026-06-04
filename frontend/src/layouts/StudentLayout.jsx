import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

import StudentSidebar from "../components/StudentSidebar";

import "./StudentLayout.css";

function StudentLayout() {
  const { user, loading } =
    useUser();

  if (loading) {
    return (
      <div className="student-layout-loader">
        Loading...
      </div>
    );
  }

  if (
    !user ||
    user.role !== "student"
  ) {
    return (
      <Navigate to="/login" />
    );
  }

  return (
    <div className="student-layout">

      <StudentSidebar />

      <main className="student-layout-content">
        <Outlet />
      </main>

    </div>
  );
}

export default StudentLayout;