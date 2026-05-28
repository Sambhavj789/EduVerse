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
    const [editingModuleId, setEditingModuleId] = useState("");
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    async function getModules() {
        try {
            setLoading(true);
            const response = await api.get(`/modules/${courseId}`);
            if (response.data?.success) {
                setModules(response.data?.data);
            }
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getModules();
    }, [])

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const response = editingModuleId
                ? await api.put("/modules", { title: moduleTitle, moduleId: editingModuleId })
                : await api.post("/modules", { title: moduleTitle, course: courseId });

            if (response.data?.success) {
                toast.success(editingModuleId ? "Module Updated Successfully" : "Module Created Successfully");
                const updatedModule = response.data?.data;
                setModules(editingModuleId
                    ? modules.map((item) => item._id === editingModuleId ? updatedModule : item)
                    : [...modules, updatedModule]);
                setModuleTitle("");
                setEditingModuleId("");
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

    async function handleDeleteModule(moduleId) {
        try {
            const response = await api.delete("/modules", { data: { moduleId } });
            if (response.data?.success) {
                toast.success(response.data.message);
                setModules(modules.filter((item) => item._id !== moduleId));
            }
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
    }

    function openEditModal(module) {
        setEditingModuleId(module._id);
        setModuleTitle(module.title);
        setShowModal(true);
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
                            >
                                <div className="module-card-actions">
                                    <button type="button" className="mini-action-btn" onClick={() => openEditModal(data)}>Edit</button>
                                    <button type="button" className="mini-action-btn danger-mini-btn" onClick={() => handleDeleteModule(data._id)}>Delete</button>
                                </div>
                                <h2>
                                    {data.title}
                                </h2>

                                <p>
                                    Manage chapters, lectures,
                                    quizzes and resources
                                </p>

                                <button
                                    type="button"
                                    className="module-open-btn"
                                    onClick={() => navigate(`/teacher/course-content/${data._id}`)}
                                >
                                    Open Module
                                </button>

                            </div>
                        )
                    })
                }

            </div>

            {loading ? <p className="page-feedback">Loading modules...</p> : null}
            {!loading && !modules.length ? <p className="page-feedback">No modules created yet.</p> : null}

            {/* Modal */}
            {
                showModal && (
                    <div className="modal-overlay">

                        <div className="course-modal">

                            <div className="modal-header">
                                <h2>{editingModuleId ? "Edit Module" : "Add New Module"}</h2>

                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingModuleId("");
                                        setModuleTitle("");
                                    }}
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
                                    {editingModuleId ? "Save Changes" : "Create Module"}
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
