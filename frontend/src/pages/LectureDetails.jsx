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

function LectureDetails() {

    const [activeTab, setActiveTab] = useState("overview");
    const [videoFile, setVideoFile] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    const lectureId = params.lectureId;

    const [quizTitle, setQuizTitle] = useState("");
    const [quizzes, setQuizzes] = useState([]);
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

    // Add Quiz
    function handleAddQuiz(e) {
        e.preventDefault();

        const newQuiz = {
            title: quizTitle
        };

        setQuizzes([...quizzes, newQuiz]);

        setQuizTitle("");
    }

    // Add Resource
    function handleAddResource(e) {

        e.preventDefault();

        const newResource = {
            title: resourceTitle,
            type: resourceType,
            text: resourceText,
            file: resourceFile
        };

        setResources([...resources, newResource]);

        setResourceTitle("");
        setResourceText("");
        setResourceFile(null);
        setResourceType("text");
    }

    async function getLectureDetails() {
        try {
            const response = await api.get(`/lectures/${lectureId}`);
            if (response.data?.success) {
                const data = response.data?.data;
                setLectureTitle(data.title);
                setLectureDesciprtion(data.description);
                setLectureDuration(data.duration);
                setOldThumbnail(data.thumbnail);
                setOldVideoUrl(data.videoUrl);
                console.log(response.data?.data);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
    }

    useEffect(() => {
        getLectureDetails();
    }, []);

    async function handleSubmit() {
        try {
            const formData = new FormData();
            formData.append("chapter", chapterId);
            formData.append("title", lectureTitle);
            formData.append("description", lectureDescription);
            formData.append("thumbnail", lectureThumbnail);
            formData.append("videoUrl", videoFile);
            const response = await api.post("/lectures", formData);
            if (response.data?.success) {
                toast.success("Lecture Uploaded Sucessfully");
                navigate(-1);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
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
                                        required
                                    />

                                </div>

                                <button className="primary-btn">

                                    <FaPlus />
                                    Add Quiz

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
                                                onClick={() => navigate(`/teacher/quiz-builder/${lectureId}`)}
                                            >
                                                <FaPlus />
                                                Open Quiz Builder
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

                            <h2>Upload Resource</h2>

                            <form onSubmit={handleAddResource}>

                                <div className="form-group">

                                    <label>Resource Title</label>

                                    <input
                                        type="text"
                                        placeholder="Enter resource title"
                                        value={resourceTitle}
                                        onChange={(e) =>
                                            setResourceTitle(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                {/* Resource Type */}
                                <div className="form-group">

                                    <label>Resource Type</label>

                                    <select
                                        value={resourceType}
                                        onChange={(e) =>
                                            setResourceType(e.target.value)
                                        }
                                    >
                                        <option value="text">
                                            Text Content
                                        </option>

                                        <option value="file">
                                            Upload File
                                        </option>
                                    </select>

                                </div>

                                {/* TEXT RESOURCE */}
                                {
                                    resourceType === "text" && (

                                        <div className="form-group">

                                            <label>Text Content</label>

                                            <textarea
                                                placeholder="Write your resource content..."
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
                                    Upload Resource

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

                                            <div>
                                                <h3>{resource.title}</h3>
                                                <p>
                                                    Resource #{index + 1}
                                                </p>
                                                {
                                                    resource.type === "text" ? (

                                                        <p className="resource-preview">
                                                            {resource.text}
                                                        </p>

                                                    ) : (

                                                        <p className="resource-preview">
                                                            {resource.file?.name}
                                                        </p>

                                                    )
                                                }
                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>
                )
            }

        </div>
    );
}

export default LectureDetails;