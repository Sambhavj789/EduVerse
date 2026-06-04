import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaFolderOpen,
  FaLayerGroup,
  FaPlayCircle,
  FaUsers,
} from "react-icons/fa";

import { useUser } from "../context/UserContext";
import api from "../utils/api";

import "./TeacherDashboard.css";

function TeacherDashboard() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  async function getDashboard() {
    try {
      const response = await api.get(`/course/teacher-dashboard/${user._id}`);

      if (response.data?.success) {
        setDashboardData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?._id) {
      getDashboard();
    }
  }, [user]);

  if (loading) {
    return <div className="teacher-dashboard-loader">Loading Dashboard...</div>;
  }

  const stats = [
    {
      title: "Published Courses",
      value: dashboardData?.totalCourses || 0,
      icon: <FaBookOpen />,
    },
    {
      title: "Total Modules",
      value: dashboardData?.totalModules || 0,
      icon: <FaFolderOpen />,
    },
    {
      title: "Total Chapters",
      value: dashboardData?.totalChapters || 0,
      icon: <FaLayerGroup />,
    },
    {
      title: "Total Lectures",
      value: dashboardData?.totalLectures || 0,
      icon: <FaPlayCircle />,
    },
  ];

  return (
    <div className="teacher-dashboard-page">
      <section className="teacher-dashboard-hero">
        <div>
          <p className="teacher-dashboard-eyebrow">Teacher Dashboard</p>
          <h1>Welcome back, {user?.fullname}</h1>
          <p className="teacher-dashboard-subtitle">
            Track your courses, content structure, and student reach from one place.
          </p>
        </div>

        <div className="teacher-dashboard-highlight">
          <div>
            <span>Active Students</span>
            <strong>{dashboardData?.totalStudents || 0}</strong>
          </div>

          <div>
            <span>Total Duration</span>
            <strong>{dashboardData?.totalDuration || 0} hrs</strong>
          </div>
        </div>
      </section>

      <section className="teacher-dashboard-stats">
        {stats.map((stat) => (
          <div className="teacher-stat-card" key={stat.title}>
            <div className="teacher-stat-icon">{stat.icon}</div>
            <h2>{stat.value}</h2>
            <p>{stat.title}</p>
          </div>
        ))}
      </section>

      <section className="teacher-dashboard-section">
        <div className="teacher-dashboard-section-header">
          <div>
            <h2>Recent Courses</h2>
            <p>Your latest courses with quick content stats.</p>
          </div>

          <button onClick={() => navigate("/teacher/courses")}>Manage Courses</button>
        </div>

        <div className="teacher-dashboard-courses-grid">
          {dashboardData?.recentCourses?.length ? (
            dashboardData.recentCourses.map((course) => (
              <article className="teacher-dashboard-course-card" key={course._id}>
                <div className="teacher-dashboard-course-top">
                  <span>{course.category || "Course"}</span>
                  <strong>{course.level || "beginner"}</strong>
                </div>

                <h3>{course.title}</h3>
                <p>{course.description}</p>

                <div className="teacher-dashboard-course-stats">
                  <div>
                    <span>Modules</span>
                    <strong>{course.moduleCount}</strong>
                  </div>

                  <div>
                    <span>Students</span>
                    <strong>{course.studentCount}</strong>
                  </div>

                  <div>
                    <span>Duration</span>
                    <strong>{course.totalDuration || 0}h</strong>
                  </div>
                </div>

                <button
                  className="teacher-dashboard-course-btn"
                  onClick={() => navigate(`/teacher/course-modules/${course._id}`)}
                >
                  Open Course
                </button>
              </article>
            ))
          ) : (
            <div className="teacher-dashboard-empty">
              <FaUsers />
              <h3>No courses yet</h3>
              <p>Create your first course to start building the dashboard.</p>
              <button onClick={() => navigate("/teacher/courses")}>Go to Courses</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default TeacherDashboard;
