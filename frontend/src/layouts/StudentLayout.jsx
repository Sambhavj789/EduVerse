import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext"
import StudentSidebar from "../components/StudentSidebar";
import "./TeacherLayout.css";
function StudentLayout() {
    const { user, loading } = useUser();
    // console.log(user, loading);
    if (loading) {
        return <h1>Loading...</h1>
    }
    if (user && user.role == "student") {
        return <div className="teacher-layout">
            <StudentSidebar />
            <Outlet />
        </div>;
    }
    else {
        return <Navigate to="/login" />
    }
}

export default StudentLayout;