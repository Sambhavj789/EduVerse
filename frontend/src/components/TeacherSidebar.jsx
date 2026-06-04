import React, { useState } from "react";
import "./TeacherSidebar.css";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

function TeacherSidebar() {
  const { user } = useUser();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const IMAGE_URL = `http://localhost:4000/uploads/${user?.profileImage}`;

  return (
    <>
      {!sidebarOpen && (
        <button
          className="teacher-mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={22} />
        </button>
      )}

      {sidebarOpen && (
        <div
          className="teacher-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`teacher-sidebar ${
          sidebarOpen ? "teacher-sidebar-open" : ""
        }`}
      >
        <div>
          <div className="teacher-sidebar-header">
            <div className="sidebar-logo-section">
              <div className="sidebar-logo">
                <GraduationCap size={28} />
              </div>

              <div>
                <h2>EduVerse</h2>
                <p>Teacher Panel</p>
              </div>
            </div>

            <button
              className="teacher-sidebar-close"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="sidebar-menu">
            <NavLink
              to="/teacher/dashboard"
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/teacher/courses"
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
            >
              <BookOpen size={20} />
              <span>My Courses</span>
            </NavLink>

            <NavLink
              to="/teacher/students"
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
            >
              <Users size={20} />
              <span>Students</span>
            </NavLink>
          </div>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-item logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>

          <div className="teacher-profile">
            <img src={IMAGE_URL} alt="teacher" />

            <div>
              <h4>{user?.fullname}</h4>

              <p>{user?.bio}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default TeacherSidebar;
