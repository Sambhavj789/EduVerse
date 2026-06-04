import React, { useEffect, useState } from "react";
import "./CourseContent.css";
import {
    FaChevronDown,
    FaChevronRight,
    FaPlus
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

function CourseContent() {

    const [expandedChapter, setExpandedChapter] = useState(null);

    // Modals
    const [showChapterModal, setShowChapterModal] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const moduleId = params.moduleId;
    const [chapterTitle, setChapterTitle] = useState("");

    const [chapters, setChapters] = useState([]);
    const [moduleData, setModuleData] = useState(null);

    function toggleChapter(id) {
        if (expandedChapter === id) {
            setExpandedChapter(null);
        } else {
            setExpandedChapter(id);
        }
    }
    async function getAllChapters() {
        try {
            const response = await api.get(`/modules/single-module/${moduleId}`);
            if (response.data?.success) {
                setModuleData(response.data?.data);
                setChapters(response.data?.data?.chapters || []);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
    }
    useEffect(() => {
        getAllChapters();
    }, [])

    // Add Chapter
    async function handleAddChapter(e) {
        try {
            e.preventDefault();
            const response = await api.post("/chapters", { module: moduleId, title: chapterTitle });
            if (response.data?.success) {
                toast.success("Chapter Created Successfully");
                setChapters([...chapters, response.data?.data]);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
        setChapterTitle("");
        setShowChapterModal(false);
    }


    return (
        <div className="course-content-page">

            {/* Header */}
            <div className="content-header">

                <div>
                    <div className="module-path">
                        <span className="module-path-link" onClick={() => {
                            navigate("/teacher/courses");
                        }}>My Courses</span> <span>{">"}</span>
                        <span className="module-path-link" onClick={() => {
                            navigate(`/teacher/course-modules/${moduleData?.course?._id}`);
                        }}>{moduleData?.course?.title || "Course"}</span> <span>{">"}</span>
                        <span>{moduleData?.title || "Course Content"}</span>
                    </div>

                    <h1>{moduleData?.title || "Course Content"}</h1>
                    <p>Manage chapters and lectures</p>
                </div>

                <button
                    className="add-chapter-btn"
                    onClick={() => setShowChapterModal(true)}
                >
                    <FaPlus />
                    Add Chapter
                </button>

            </div>

            {/* Chapters */}
            <div className="chapters-container">

                {
                    chapters.map((chapter) => {

                        const isOpen = expandedChapter === chapter._id;

                        return (
                            <div
                                className="chapter-card"
                                key={chapter._id}
                            >

                                {/* Header */}
                                <div
                                    className="chapter-header"
                                    onClick={() => toggleChapter(chapter._id)}
                                >

                                    <div className="chapter-left">

                                        {
                                            isOpen
                                                ? <FaChevronDown className="arrow-icon" />
                                                : <FaChevronRight className="arrow-icon" />
                                        }

                                        <div>
                                            <h2>{chapter.title}</h2>

                                            <p>
                                                {chapter.lectures.length} Lectures
                                            </p>
                                        </div>

                                    </div>

                                    <button
                                        className="add-lecture-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            navigate(
                                                `/teacher/create-lecture/${chapter._id}`
                                            );
                                        }}
                                    >
                                        <FaPlus />
                                        Add Lecture
                                    </button>

                                </div>

                                {/* Lectures */}
                                {
                                    isOpen && (
                                        <div className="lectures-container">

                                            {
                                                chapter.lectures.map((lecture, index) => {

                                                    return (
                                                        <div
                                                            className="lecture-card"
                                                            key={index}
                                                            onClick={() => {
                                                                navigate(`/teacher/lecture-detail/${lecture._id}`)
                                                            }}
                                                        >

                                                            <span className="lecture-number">
                                                                {index + 1}
                                                            </span>

                                                            <div>
                                                                <h3>{lecture.title}</h3>
                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    )
                                }

                            </div>
                        )
                    })
                }

            </div>

            {/* Add Chapter Modal */}
            {
                showChapterModal && (
                    <div className="modal-overlay">

                        <div className="custom-modal">

                            <div className="modal-top">

                                <h2>Add Chapter</h2>

                                <button
                                    onClick={() => setShowChapterModal(false)}
                                >
                                    ✕
                                </button>

                            </div>

                            <form onSubmit={handleAddChapter}>

                                <div className="form-group">

                                    <label>Chapter Title</label>

                                    <input
                                        type="text"
                                        placeholder="Enter chapter title"
                                        value={chapterTitle}
                                        onChange={(e) =>
                                            setChapterTitle(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <button className="submit-btn">
                                    Create Chapter
                                </button>

                            </form>

                        </div>

                    </div>
                )
            }
        </div>
    );
}

export default CourseContent;
