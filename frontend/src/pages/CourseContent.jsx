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
    const [editingChapterId, setEditingChapterId] = useState("");

    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    function toggleChapter(id) {
        if (expandedChapter === id) {
            setExpandedChapter(null);
        } else {
            setExpandedChapter(id);
        }
    }
    async function getAllChapters() {
        try {
            setLoading(true);
            const response = await api.get(`/chapters/${moduleId}`);
            if (response.data?.success) {
                setChapters(response.data?.data);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getAllChapters();
    }, [])

    // Add Chapter
    async function handleAddChapter(e) {
        try {
            e.preventDefault();
            const response = editingChapterId
                ? await api.put("/chapters", { chapterId: editingChapterId, title: chapterTitle })
                : await api.post("/chapters", { module: moduleId, title: chapterTitle });

            if (response.data?.success) {
                toast.success(editingChapterId ? "Chapter Updated Successfully" : "Chapter Created Successfully");
                setChapters(editingChapterId
                    ? chapters.map((item) => item._id === editingChapterId ? { ...item, ...response.data?.data } : item)
                    : [...chapters, response.data?.data]);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
        setChapterTitle("");
        setEditingChapterId("");
        setShowChapterModal(false);
    }

    async function handleDeleteChapter(chapterId) {
        try {
            const response = await api.delete("/chapters", { data: { chapterId } });
            if (response.data?.success) {
                toast.success(response.data.message);
                setChapters(chapters.filter((item) => item._id !== chapterId));
            }
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
    }

    async function handleDeleteLecture(lectureId) {
        try {
            const response = await api.delete("/lectures", { data: { lectureId } });
            if (response.data?.success) {
                toast.success(response.data.message);
                setChapters(chapters.map((chapter) => ({
                    ...chapter,
                    lectures: chapter.lectures.filter((lecture) => lecture._id !== lectureId)
                })));
            }
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
    }

    function openChapterModal(chapter = null) {
        setEditingChapterId(chapter?._id || "");
        setChapterTitle(chapter?.title || "");
        setShowChapterModal(true);
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
                    onClick={() => openChapterModal()}
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

                                    <div className="chapter-actions">
                                        <button
                                            className="mini-action-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openChapterModal(chapter);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="mini-action-btn danger-mini-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteChapter(chapter._id);
                                            }}
                                        >
                                            Delete
                                        </button>
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

                                                            <div className="lecture-actions">
                                                                <button type="button" className="mini-action-btn" onClick={() => navigate(`/teacher/lecture-detail/${lecture._id}`)}>
                                                                    Edit
                                                                </button>
                                                                <button type="button" className="mini-action-btn danger-mini-btn" onClick={() => handleDeleteLecture(lecture._id)}>
                                                                    Delete
                                                                </button>
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

            {loading ? <p className="page-feedback">Loading chapters...</p> : null}
            {!loading && !chapters.length ? <p className="page-feedback">No chapters added yet.</p> : null}

            {/* Add Chapter Modal */}
            {
                showChapterModal && (
                    <div className="modal-overlay">

                        <div className="custom-modal">

                            <div className="modal-top">

                                <h2>{editingChapterId ? "Edit Chapter" : "Add Chapter"}</h2>

                                <button
                                    onClick={() => {
                                        setShowChapterModal(false);
                                        setEditingChapterId("");
                                        setChapterTitle("");
                                    }}
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
                                    {editingChapterId ? "Save Changes" : "Create Chapter"}
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
