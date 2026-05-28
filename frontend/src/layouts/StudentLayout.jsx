import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./StudentLayout.css";

function StudentLayout() {
    const { user, loading } = useUser();

    if (loading) {
        return <div className="student-layout-loading">Loading...</div>;
    }

    if (!user || user.role !== "student") {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default StudentLayout;
