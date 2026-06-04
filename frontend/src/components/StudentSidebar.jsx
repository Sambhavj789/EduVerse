import React, { useState } from "react";
import "./StudentSidebar.css";

import {
  LayoutDashboard,
  BookOpen,
  LogOut,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

function StudentSidebar() {
  const { user, logout } = useUser();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const IMAGE_URL = `http://localhost:4000/uploads/${user?.profileImage}`;
  function handleLogout() {
    logout();
  }
  return (
    <>
      {/* MOBILE BUTTON */}

      {!sidebarOpen && (
        <button
          className="mobile-sidebar-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {/* OVERLAY */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`student-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* TOP */}

        <div>
          <div className="sidebar-header">
            <div className="sidebar-logo-section">
              <div className="sidebar-logo">
                <GraduationCap size={28} />
              </div>

              <div>
                <h2>EduVerse</h2>

                <p>Student Panel</p>
              </div>
            </div>

            <button
              className="close-sidebar"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* MENU */}

          <div className="sidebar-menu">
            <NavLink
              to="/student/dashboard"
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/student/courses"
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
            >
              <BookOpen size={20} />
              <span>My Courses</span>
            </NavLink>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="sidebar-bottom">
          <button className="sidebar-item logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>

          <div className="student-profile">
            <img src={IMAGE_URL} alt="student" />

            <div>
              <h4>{user?.fullname}</h4>

              <p>{user?.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentSidebar;
