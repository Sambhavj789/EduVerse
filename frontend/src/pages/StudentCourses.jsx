import React, { useEffect, useState } from "react";
import "./StudentCourses.css";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  async function getStudentJoinedCourses() {
    try {
      if (!user) {
        return;
      }
      const response = await api.get(
        `/course/student-join-courses/${user._id}`,
      );
      if (response.data?.success) {
        setCourses(response.data?.data);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Internal Server Error");
    }
  }
  useEffect(() => {
    getStudentJoinedCourses();
  }, [user]);

  function handleCourseClick(data) {
    const courseId = data._id;
    navigate(`/student/course/${courseId}/modules`);
  }

  return (
    <>
      <div className="st-page">
        {/* Header */}
        <div className="st-header">
          <div>
            <h1>My Courses</h1>
            <p>Look the courses you joined</p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="st-grid">
          {courses.map((data, index) => (
            <CourseCard
              key={index}
              data={data}
              mode="teacher"
              onClick={() => handleCourseClick(data)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentCourses;
