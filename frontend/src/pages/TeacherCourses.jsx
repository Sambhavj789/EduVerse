import React, { useEffect, useState } from "react";
import "./TeacherCourses.css";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";
import CourseCard from "../components/CourseCard";
import {useNavigate} from "react-router-dom";

const TeacherCourses = () => {

    const [showModal, setShowModal] = useState(false);

    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        thumbnail: null,
        trailerVideo: null,
        category: "",
        level: "beginner",
        language: "",
        requirements: "",
        learningOutcomes: "",
        totalDuration: "",
        totalLectures: "",
    });
    const [courses, setCourses] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();
    async function getAllCoursesByTeacher() {
        try {
            const response = await api.get(`/course/teacher-courses/${user._id}`);
            if (response.data?.success) {
                console.log(response.data?.data);
                setCourses(response.data?.data);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data?.message || "Internal Server Error");
        }
    }

    useEffect(() => {
        getAllCoursesByTeacher();
    }, [])

    const handleChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const finalData = {
                ...courseData,

                requirements: courseData.requirements
                    .split(",")
                    .map((item) => item.trim()),

                learningOutcomes: courseData.learningOutcomes
                    .split(",")
                    .map((item) => item.trim()),
                teacher: user._id
            };
            const formData = new FormData();
            for (let field in finalData) {
                formData.append(field, finalData[field]);
            }
            const response = await api.post("/course/create", formData);
            if (response.data?.success) {
                toast.success(response.data?.message);
                const newCourse = response.data?.courseData;
                setCourses([...courses, newCourse]);
            }
            console.log(response);
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data?.message || "Internal Server Error");
        }

        setShowModal(false);
    };

    function handleFileChange(e) {
        const name = e.target.name;
        const file = e.target.files[0];
        setCourseData({ ...courseData, [name]: file });
    }

    function handleCourseClick(data){
        const courseId = data._id;
        navigate(`/teacher/course-modules/${courseId}`);
    }

    return (
        <>
            <div className="courses-page">

                {/* Header */}
                <div className="courses-header">

                    <div>
                        <h1>My Courses</h1>
                        <p>Manage and create your courses</p>
                    </div>

                    <button
                        className="add-course-btn"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Course
                    </button>

                </div>

                {/* Courses Grid */}
                <div className="courses-grid">
                    {
                        courses.map((data, index) => {
                            return <CourseCard key={index} data={data} mode={"teacher"} onClick={()=>handleCourseClick(data)}/>
                        })
                    }
                </div>

                {/* Modal */}
                {
                    showModal && (
                        <div className="modal-overlay">

                            <div className="course-modal">

                                <div className="modal-header">
                                    <h2>Add New Course</h2>

                                    <button
                                        onClick={() => setShowModal(false)}
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit}>

                                    <div className="form-group">
                                        <label>Course Title</label>

                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Enter course title"
                                            value={courseData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Description</label>

                                        <textarea
                                            name="description"
                                            placeholder="Enter course description"
                                            value={courseData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-row">

                                        <div className="form-group">
                                            <label>Thumbnail URL</label>

                                            <input
                                                type="file"
                                                name="thumbnail"
                                                onChange={handleFileChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Trailer Video URL</label>

                                            <input
                                                type="file"
                                                name="trailerVideo"
                                                onChange={handleFileChange}
                                                required
                                            />
                                        </div>

                                    </div>

                                    <div className="form-row">

                                        <div className="form-group">
                                            <label>Category</label>

                                            <input
                                                type="text"
                                                name="category"
                                                placeholder="Web Development"
                                                value={courseData.category}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Language</label>

                                            <input
                                                type="text"
                                                name="language"
                                                placeholder="English"
                                                value={courseData.language}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                    </div>

                                    <div className="form-row">

                                        <div className="form-group">
                                            <label>Level</label>

                                            <select
                                                name="level"
                                                value={courseData.level}
                                                onChange={handleChange}
                                            >
                                                <option value="beginner">Beginner</option>
                                                <option value="intermediate">Intermediate</option>
                                                <option value="advance">Advance</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Total Duration (Hours)</label>

                                            <input
                                                type="number"
                                                name="totalDuration"
                                                placeholder="20"
                                                value={courseData.totalDuration}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label>Total Lectures</label>

                                        <input
                                            type="number"
                                            name="totalLectures"
                                            placeholder="45"
                                            value={courseData.totalLectures}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Requirements</label>

                                        <textarea
                                            name="requirements"
                                            placeholder="Basic JavaScript, HTML, CSS"
                                            value={courseData.requirements}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Learning Outcomes</label>

                                        <textarea
                                            name="learningOutcomes"
                                            placeholder="Build Full Stack Apps, APIs, Authentication"
                                            value={courseData.learningOutcomes}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="submit-btn"
                                    >
                                        Create Course
                                    </button>

                                </form>

                            </div>

                        </div>
                    )
                }

            </div>
        </>
    );
};

export default TeacherCourses;