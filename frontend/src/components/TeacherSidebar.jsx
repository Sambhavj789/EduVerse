import React from "react";
import "./TeacherSidebar.css";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardCheck,
  FileText,
  MessageSquare,
  CalendarDays,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { useUser } from "../context/UserContext";

const TeacherSidebar = () => {
  const { user } = useUser();
  const IMAGE_URL = `http://localhost:4000/uploads/${user?.profileImage}`;
  return (
    <div className="teacher-sidebar">

      {/* Logo Section */}
      <div>
        <div className="sidebar-logo-section">
          <div className="sidebar-logo">
            <GraduationCap size={28} />
          </div>

          <div>
            <h2>EduVerse</h2>
            <p>Teacher Panel</p>
          </div>
        </div>

        {/* Menu */}
        <div className="sidebar-menu">

          <button className="sidebar-item active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button className="sidebar-item">
            <BookOpen size={20} />
            <span>My Courses</span>
          </button>

          <button className="sidebar-item">
            <Users size={20} />
            <span>Students</span>
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="sidebar-bottom">

        <button className="sidebar-item logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>

        {/* Teacher Profile */}
        <div className="teacher-profile">

          <img
            src={IMAGE_URL}
            alt="teacher"
          />

          <div>
            <h4>{user?.fullname}</h4>
            <p>{user?.bio}</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default TeacherSidebar;