import React, { useState } from "react";
import "./CourseContent.css";
import {
    FaChevronDown,
    FaChevronRight,
    FaPlus
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

function CourseContent() {

    const [expandedChapter, setExpandedChapter] = useState(null);

    // Modals
    const [showChapterModal, setShowChapterModal] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const moduleId = params.moduleId;

    // Demo Data
    const [chapters, setChapters] = useState([
        {
            id: 1,
            title: "Introduction to MERN Stack",
            lectures: [
                {
                    title: "What is MERN Stack?"
                },
                {
                    title: "Project Overview"
                }
            ]
        },
        {
            id: 2,
            title: "React Basics",
            lectures: [
                {
                    title: "React Components"
                },
                {
                    title: "React Hooks"
                }
            ]
        }
    ]);

    function toggleChapter(id) {
        if (expandedChapter === id) {
            setExpandedChapter(null);
        } else {
            setExpandedChapter(id);
        }
    }

    // Add Chapter
    function handleAddChapter(e) {
        e.preventDefault();

        const newChapter = {
            id: Date.now(),
            title: chapterTitle,
            lectures: []
        };

        setChapters([...chapters, newChapter]);

        setChapterTitle("");
        setShowChapterModal(false);
    }


    return (
        <div className="course-content-page">

            {/* Header */}
            <div className="content-header">

                <div>
                    <div className="module-path">
                        <span onClick={() => {
                            navigate(-2);
                        }}>My Courses</span> <span>{">"}</span>
                        <span onClick={() => {
                            navigate(-1);
                        }}>Course</span> <span>{">"}</span>
                        <span>{moduleId}</span>
                    </div>

                    <h1>Course Content</h1>
                    <p>Manage Chapters and Lectures</p>
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

                        const isOpen = expandedChapter === chapter.id;

                        return (
                            <div
                                className="chapter-card"
                                key={chapter.id}
                            >

                                {/* Header */}
                                <div
                                    className="chapter-header"
                                    onClick={() => toggleChapter(chapter.id)}
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
                                                `/teacher/lecture-detail/${chapter.id}`
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