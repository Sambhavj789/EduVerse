import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext"
import TeacherSidebar from "../components/TeacherSidebar";
import "./TeacherLayout.css";
function TeacherLayout() {
    const { user, loading } = useUser();
    console.log(user, loading);
    if (loading) {
        return <h1>Loading...</h1>
    }
    if (user && user.role == "teacher") {
        return <div className="teacher-layout">
            <TeacherSidebar />
            <Outlet />
        </div>;
    }
    else {
        return <Navigate to="/login" />
    }
}

export default TeacherLayout;