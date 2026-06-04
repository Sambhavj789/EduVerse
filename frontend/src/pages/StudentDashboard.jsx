import React, { useEffect, useState } from "react";
import {
  FaBook,
  FaGraduationCap,
  FaChartLine,
  FaQuestionCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../utils/api";

import CourseCard from "../components/CourseCard";

import "./StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] =
    useState(null);

  async function getDashboard() {
    try {
      const response = await api.get(
        `/progress/dashboard/student/${user._id}`
      );

      if (response.data.success) {
        setDashboardData(
          response.data.data
        );
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
    return (
      <div className="dashboard-loader">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="student-dashboard">

      {/* WELCOME */}

      <div className="dashboard-welcome">

        <div>
          <h1>
            Welcome Back,
            {" "}
            {user?.fullname}
            👋
          </h1>

          <p>
            Keep learning and complete
            your courses.
          </p>
        </div>

        <div className="dashboard-progress-pill">
          <span>Progress</span>

          <strong>
            {dashboardData?.avgProgress}%
          </strong>
        </div>

      </div>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">
            <FaBook />
          </div>

          <h2>
            {
              dashboardData?.totalCourses
            }
          </h2>

          <p>Joined Courses</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaGraduationCap />
          </div>

          <h2>
            {
              dashboardData?.totalLectures
            }
          </h2>

          <p>
            Lectures Completed
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaQuestionCircle />
          </div>

          <h2>
            {
              dashboardData?.totalQuizzes
            }
          </h2>

          <p>Quiz Attempts</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaChartLine />
          </div>

          <h2>
            {
              dashboardData?.avgProgress
            }
            %
          </h2>

          <p>Overall Progress</p>
        </div>

      </div>

      {/* COURSES */}

      <div className="dashboard-section">

        <div className="section-header">

          <h2>
            Continue Learning
          </h2>

          {dashboardData?.courses
            ?.length > 2 && (
            <button
              className="view-all-courses-btn"
              onClick={() =>
                navigate(
                  "/student/courses"
                )
              }
            >
              View All Courses
            </button>
          )}

        </div>

        <div className="course-grid">

          {dashboardData?.courses
            ?.slice(0, 2)
            .map((course) => (
              <CourseCard
                key={course._id}
                data={course}
                mode="dashboard"
                onClick={() =>
                  navigate(
                    `/student/course/${course._id}/modules`
                  )
                }
              />
            ))}

          {dashboardData?.courses
            ?.length > 2 && (
            <div className="more-courses-card">

              <h3>
                +
                {dashboardData
                  .courses.length - 2}
              </h3>

              <p>
                More Courses
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/student/courses"
                  )
                }
              >
                View All
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;