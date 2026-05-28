import React, { useEffect, useState } from "react";
import "./LectureDetails.css";
import {
    FaVideo,
    FaQuestionCircle,
    FaFileAlt,
    FaUpload,
    FaPlus
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

const UPLOADS_URL = "http://localhost:4000/uploads/";

function LectureDetails() {

    const [activeTab, setActiveTab] = useState("overview");
    const [videoFile, setVideoFile] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    const lectureId = params.lectureId;

    const [quizTitle, setQuizTitle] = useState("");
    const [quizzes, setQuizzes] = useState([]);
    const [chapterId, setChapterId] = useState("");
    const [lectureTitle, setLectureTitle] = useState("");
    const [lectureThumbnail, setLectureThumbnail] = useState(null);
    const [lectureDescription, setLectureDesciprtion] = useState("");
    const [lectureDuration, setLectureDuration] = useState("");
    const [resourceType, setResourceType] = useState("text");
    const [resourceText, setResourceText] = useState("");
    const [oldThumbnail,setOldThumbnail] = useState(null);
    const [oldVideoUlr,setOldVideoUrl] = useState(null);
    const [resourceTitle, setResourceTitle] = useState("");
    const [resourceFile, setResourceFile] = useState(null);

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savingResourceFileUrl, setSavingResourceFileUrl] = useState("");

    // Add Quiz
    function handleAddQuiz(e) {
        e.preventDefault();
        navigate(`/teacher/quiz-builder/${lectureId}`);
    }

    // Add Resource
    function handleAddResource(e) {

        e.preventDefault();

        if (resourceType === "text") {
            handleSubmit();
            return;
        }

        uploadResourceFile();
    }

    async function uploadResourceFile() {
        if (!resourceFile) {
            toast.error("Choose a file first");
            return;
        }

        try {
            setSavingResourceFileUrl("uploading");
            const formData = new FormData();
            formData.append("lectureId", lectureId);
            formData.append("title", resourceTitle || resourceFile.name);
            formData.append("type", resourceType);
            formData.append("materials", resourceFile);

            const response = await api.post("/lectures/materials", formData);
            if (response.data?.success) {
                toast.success(response.data.message);
                setResources(response.data?.data?.materials || []);
                setResourceTitle("");
                setResourceFile(null);
                setResourceType("text");
            }
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
        finally {
            setSavingResourceFileUrl("");
        }
    }

    async function handleUpdateResourceTitle(fileUrl, title) {
        try {
            setSavingResourceFileUrl(fileUrl);
            const response = await api.put("/lectures/materials", { lectureId, fileUrl, title });
            if (response.data?.success) {
                toast.success(response.data.message);
                setResources(response.data?.data?.materials || []);
            }
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
        finally {
            setSavingResourceFileUrl("");
        }
    }

    async function handleDeleteResource(fileUrl) {
        try {
            setSavingResourceFileUrl(fileUrl);
            const response = await api.delete("/lectures/materials", { data: { lectureId, fileUrl } });
            if (response.data?.success) {
                toast.success(response.data.message);
                setResources(response.data?.data?.materials || []);
            }
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
        finally {
            setSavingResourceFileUrl("");
        }
    }

    async function getLectureDetails() {
        try {
            setLoading(true);
            const response = await api.get(`/lectures/${lectureId}`);
            if (response.data?.success) {
                const data = response.data?.data;
                setChapterId(data.chapter);
                setLectureTitle(data.title);
                setLectureDesciprtion(data.description);
                setLectureDuration(data.duration);
                setOldThumbnail(data.thumbnail);
                setOldVideoUrl(data.videoUrl);
                setResourceText(data.textContent || "");
                setQuizzes(data.quizes || []);
                setResources(data.materials || []);
                console.log(response.data?.data);
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
        getLectureDetails();
    }, []);

    async function handleSubmit() {
        try {
            const formData = new FormData();
            formData.append("lectureId", lectureId);
            formData.append("chapter", chapterId);
            formData.append("title", lectureTitle);
            formData.append("description", lectureDescription);
            formData.append("duration", lectureDuration);
            formData.append("textContent", resourceText);
            formData.append("oldThumbnail", oldThumbnail || "");
            formData.append("oldVideoUrl", oldVideoUlr || "");
            if (lectureThumbnail) {
                formData.append("thumbnail", lectureThumbnail);
            }
            if (videoFile) {
                formData.append("videoUrl", videoFile);
            }
            const response = await api.put("/lectures", formData);
            if (response.data?.success) {
                toast.success("Lecture Updated Successfully");
                getLectureDetails();
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
    }

    if (loading) {
        return <div className="lecture-details-page"><p className="page-feedback">Loading lecture...</p></div>;
    }

    return (
        <div className="lecture-details-page">

            {/* Top Header */}
            <div className="lecture-top">

                <div>
                    <div className="module-path">
                        <span onClick={() => {
                            navigate(-2);
                        }}>My Courses</span> <span>{">"}</span>
                        <span onClick={() => {
                            navigate(-1);
                        }}>Course</span> <span>{">"}</span>
                        <span>{lectureId}</span>
                    </div>

                    <h1>Lecture Management</h1>
                    <p>
                        Manage video, quizzes and resources
                    </p>
                </div>

            </div>

            {/* Tabs */}
            <div className="lecture-tabs">
                <button
                    className={activeTab === "overview" ? "active-tab" : ""}
                    onClick={() => setActiveTab("overview")}
                >
                    <FaVideo />
                    Overview
                </button>

                <button
                    className={activeTab === "video" ? "active-tab" : ""}
                    onClick={() => setActiveTab("video")}
                >
                    <FaVideo />
                    Video
                </button>

                <button
                    className={activeTab === "quiz" ? "active-tab" : ""}
                    onClick={() => setActiveTab("quiz")}
                >
                    <FaQuestionCircle />
                    Quiz
                </button>

                <button
                    className={activeTab === "resources" ? "active-tab" : ""}
                    onClick={() => setActiveTab("resources")}
                >
                    <FaFileAlt />
                    Resources
                </button>

            </div>

            {/* Overview Tab */}
            {
                activeTab === "overview" && (
                    <div className="tab-content">

                        <div className="content-card">

                            <h2>Lecture Overview</h2>
                            <div className="form-group">

                                <label>Lecture Title</label>

                                <input
                                    type="text"
                                    placeholder="Enter lecture title"
                                    value={lectureTitle}
                                    onChange={(e) => setLectureTitle(e.target.value)}
                                />

                            </div>
                            <div className="form-group">

                                <label>Lecture Description</label>

                                <textarea
                                    type="text"
                                    placeholder="Enter lecture description"
                                    value={lectureDescription}
                                    onChange={(e) => setLectureDesciprtion(e.target.value)}
                                />

                            </div>

                            <div className="form-group">

                                <label>Lecture Thumbnail</label>

                                <input
                                    type="file"
                                    placeholder="Enter lecture title"
                                    accept="image/*"
                                    onChange={(e) => setLectureThumbnail(e.target.files[0])}
                                />

                            </div>

                            <div className="form-group">

                                <label>Lecture Duration</label>

                                <input
                                    type="text"
                                    placeholder="Enter lecture duration"
                                    value={lectureDuration}
                                    onChange={(e) => setLectureDuration(e.target.value)}
                                />

                            </div>


                            <button className="primary-btn" onClick={handleSubmit}>
                                Save Lecture
                            </button>

                        </div>

                    </div>
                )
            }

            {/* VIDEO TAB */}
            {
                activeTab === "video" && (
                    <div className="tab-content">

                        <div className="content-card">

                            <h2>Upload Lecture Video</h2>

                            <div className="upload-box">

                                <FaUpload className="upload-icon" />

                                <p>
                                    Upload your lecture video
                                </p>

                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) =>
                                        setVideoFile(e.target.files[0])
                                    }
                                />

                            </div>

                            {
                                videoFile && (
                                    <div className="uploaded-item">
                                        {videoFile.name}
                                    </div>
                                )
                            }
                        </div>

                    </div>
                )
            }

            {/* QUIZ TAB */}
            {
                activeTab === "quiz" && (
                    <div className="tab-content">

                        <div className="content-card">

                            <div className="section-header">

                                <h2>Create Quiz</h2>

                            </div>

                            <form onSubmit={handleAddQuiz}>

                                <div className="form-group">

                                    <label>Quiz Title</label>

                                    <input
                                        type="text"
                                        placeholder="Enter quiz title"
                                        value={quizTitle}
                                        onChange={(e) =>
                                            setQuizTitle(e.target.value)
                                        }
                                    />

                                </div>

                                <button className="primary-btn">

                                    <FaPlus />
                                    Open Quiz Builder

                                </button>

                            </form>

                        </div>

                        {/* Quiz List */}
                        <div className="items-list">

                            {
                                quizzes.map((quiz, index) => {

                                    return (
                                        <div
                                            className="list-card"
                                            key={index}
                                        >

                                            <div>
                                                <h3>{quiz.title}</h3>
                                                <p>Quiz #{index + 1}</p>
                                            </div>

                                            <button
                                                className="primary-btn"
                                                onClick={() => navigate(`/teacher/quiz-builder/${lectureId}?quizId=${quiz._id}`)}
                                            >
                                                <FaPlus />
                                                Edit Quiz
                                            </button>



                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>
                )
            }

            {/* RESOURCES TAB */}
            {
                activeTab === "resources" && (
                    <div className="tab-content">

                        <div className="content-card">

                            <h2>Lecture Notes</h2>

                            <form onSubmit={handleAddResource}>

                                <div className="form-group">

                                    <label>Notes Title</label>

                                    <input
                                        type="text"
                                        placeholder="Optional note heading"
                                        value={resourceTitle}
                                        onChange={(e) =>
                                            setResourceTitle(e.target.value)
                                        }
                                    />

                                </div>

                                {/* Resource Type */}
                                <div className="form-group">

                                    <label>Content Type</label>

                                    <select
                                        value={resourceType}
                                        onChange={(e) =>
                                            setResourceType(e.target.value)
                                        }
                                    >
                                        <option value="text">
                                            Text Notes
                                        </option>

                                        <option value="file">
                                            File Upload
                                        </option>
                                    </select>

                                </div>

                                {/* TEXT RESOURCE */}
                                {
                                    resourceType === "text" && (

                                        <div className="form-group">

                                            <label>Lecture Notes</label>

                                            <textarea
                                                placeholder="Write lecture notes, explanations or key takeaways..."
                                                value={resourceText}
                                                onChange={(e) =>
                                                    setResourceText(e.target.value)
                                                }
                                                rows={6}
                                            />

                                        </div>

                                    )
                                }

                                {/* FILE RESOURCE */}
                                {
                                    resourceType === "file" && (

                                        <div className="form-group">

                                            <label>Upload File</label>

                                            <input
                                                type="file"
                                                onChange={(e) =>
                                                    setResourceFile(
                                                        e.target.files[0]
                                                    )
                                                }
                                            />

                                        </div>

                                    )
                                }

                                <button className="primary-btn">

                                    <FaUpload />
                                    Save Notes Draft

                                </button>

                            </form>

                        </div>

                        {/* Resources List */}
                        <div className="items-list">

                            {
                                resources.map((resource, index) => {

                                    return (
                                        <div
                                            className="list-card"
                                            key={index}
                                        >

                                            <div className="resource-card-body">
                                                <input
                                                    className="resource-title-input"
                                                    value={resource.title}
                                                    onChange={(e) => {
                                                        const nextResources = [...resources];
                                                        nextResources[index] = { ...resource, title: e.target.value };
                                                        setResources(nextResources);
                                                    }}
                                                />
                                                <p>
                                                    Resource #{index + 1}
                                                </p>
                                                {
                                                    resource.type === "text" ? (

                                                        <p className="resource-preview">
                                                            {resource.text}
                                                        </p>

                                                    ) : (

                                                        <a className="resource-preview resource-link" href={UPLOADS_URL + resource.fileUrl} target="_blank" rel="noreferrer">
                                                            {resource.title}
                                                        </a>

                                                    )
                                                }
                                            </div>

                                            {resource.type === "file" ? (
                                                <div className="resource-actions">
                                                    <button className="primary-btn" onClick={() => handleUpdateResourceTitle(resource.fileUrl, resource.title)} disabled={savingResourceFileUrl === resource.fileUrl}>
                                                        Save
                                                    </button>
                                                    <button className="danger-btn" onClick={() => handleDeleteResource(resource.fileUrl)} disabled={savingResourceFileUrl === resource.fileUrl}>
                                                        Delete
                                                    </button>
                                                </div>
                                            ) : null}

                                        </div>
                                    )
                                })
                            }

                            {!resources.length ? <p className="page-feedback">No resources uploaded yet.</p> : null}

                        </div>

                    </div>
                )
            }

        </div>
    );
}

export default LectureDetails;
