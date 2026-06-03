import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import "./StudentCourseModule.css";
import toast from "react-hot-toast";
import api from "../utils/api";
import { IoMdArrowRoundBack } from "react-icons/io";

function StudentCourseModule() {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [courseData, setCourseData] = useState({});
  async function getCourseData() {
    try {
      const response = await api.get(`/course/${courseId}`);
      if (response.data?.success) {
        setCourseData(response.data?.data);
        setModules(response.data?.data?.modules);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <div className="st-modules-page">
      <div className="st-modules-header">
        <div>
          <div className="back-btn">
            <IoMdArrowRoundBack onClick={() => navigate(-1)} />
          </div>
          <h1>{courseData?.title} Modules</h1>
        </div>
      </div>

      <div className="st-modules-grid">
        {modules.map((data, index) => {
          return (
            <div
              className="module-card"
              key={index}
              onClick={() => navigate(`/student/course/course-content/${data._id}`)}
            >
              <h2>{data.title}</h2>

              <p>Manage chapters, lectures, quizzes and resources</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentCourseModule;
