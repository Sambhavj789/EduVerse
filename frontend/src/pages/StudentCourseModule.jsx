import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import "./CourseModule.css";
import toast from 'react-hot-toast';
import api from '../utils/api';

function CourseModules() {
    const params = useParams();
    const courseId = params.courseId;
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [moduleTitle, setModuleTitle] = useState("");
    const [modules, setModules] = useState([]);
    async function getModules() {
        const response = await api.get(`/modules/${courseId}`);
        if (response.data?.success) {
            setModules(response.data?.data);
        }
    }

    useEffect(() => {
        getModules();
    }, [])

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const response = await api.post("/modules", { title: moduleTitle, course: courseId });
            if (response.data?.success) {
                toast.success("Module Created Successfully");
                const newModuleTitle = response.data?.data;
                setModules([...modules, newModuleTitle])
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
        finally {
            setShowModal(false);
        }
    }
    return (
        <div className='modules-page'>
            <div className="modules-header">

                <div>
                    <div className="module-path">
                        <span onClick={() => {
                            navigate(-1);
                        }}>My Courses</span> <span>{">"}</span>
                        <span>{courseId}</span>
                    </div>
                    <h1>My Course Modules</h1>
                    <p>Manage and create your Modules</p>

                </div>

                <button
                    className="add-module-btn"
                    onClick={() => setShowModal(true)}
                >
                    + Add Module
                </button>

            </div>

            <div className="modules-grid">

                {
                    modules.map((data, index) => {

                        return (
                            <div
                                className='module-card'
                                key={index}
                                onClick={() =>
                                    navigate(`/teacher/course-content/${data._id}`)
                                }
                            >
                                <h2>
                                    {data.title}
                                </h2>

                                <p>
                                    Manage chapters, lectures,
                                    quizzes and resources
                                </p>

                            </div>
                        )
                    })
                }

            </div>

            {/* Modal */}
            {
                showModal && (
                    <div className="modal-overlay">

                        <div className="course-modal">

                            <div className="modal-header">
                                <h2>Add New Module</h2>

                                <button
                                    onClick={() => setShowModal(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="form-group">
                                    <label>Module Title</label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={moduleTitle}
                                        onChange={(e) => setModuleTitle(e.target.value)}
                                        placeholder="Enter module title"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="submit-btn"
                                >
                                    Create Module
                                </button>

                            </form>

                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default CourseModules