import React, { useState } from "react";
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

function CreateLecture() {

    const [activeTab, setActiveTab] = useState("overview");
    const [videoFile, setVideoFile] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    const chapterId = params.chapterId;
    const [lectureTitle, setLectureTitle] = useState("");
    const [lectureThumbnail, setLectureThumbnail] = useState(null);
    const [lectureDescription, setLectureDesciprtion] = useState("");
    const [lectureDuration, setLectureDuration] = useState("");


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
                        <span>{chapterId}</span>
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
        </div>
    );
}

export default CreateLecture;