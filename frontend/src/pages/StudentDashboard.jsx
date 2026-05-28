import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import "./StudentExperience.css";

function StudentDashboard() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const joinedCourses = items.length;
    const completedCourses = items.filter((item) => (item.progress?.overallProgress || 0) === 100).length;
    const averageProgress = joinedCourses
        ? Math.round(items.reduce((sum, item) => sum + (item.progress?.overallProgress || 0), 0) / joinedCourses)
        : 0;
    const activeCourses = items.filter((item) => (item.progress?.overallProgress || 0) > 0 && (item.progress?.overallProgress || 0) < 100).length;

    useEffect(() => {
        async function loadCourses() {
            try {
                const response = await api.get("/enrollments/my-courses");
                if (response.data?.success) {
                    setItems(response.data.data || []);
                }
            }
            catch (err) {
                toast.error(err?.response?.data?.message || "Unable to load your courses");
            }
            finally {
                setLoading(false);
            }
        }

        loadCourses();
    }, []);

    return (
        <div className="student-page student-dashboard-page">
            <section className="student-hero compact-hero">
                <div>
                    <span className="student-eyebrow">Student Panel</span>
                    <h1>Your learning dashboard</h1>
                    <p>Resume active courses, track completion, and jump directly into pending lectures.</p>
                </div>
                <button className="student-primary-btn" onClick={() => navigate("/courses")}>Explore Courses</button>
            </section>

            <section className="dashboard-metric-grid">
                <article className="student-panel-card">
                    <span className="student-eyebrow">Joined</span>
                    <h2>{joinedCourses}</h2>
                    <p>Total courses in your dashboard</p>
                </article>
                <article className="student-panel-card">
                    <span className="student-eyebrow">Active</span>
                    <h2>{activeCourses}</h2>
                    <p>Courses currently in progress</p>
                </article>
                <article className="student-panel-card">
                    <span className="student-eyebrow">Average</span>
                    <h2>{averageProgress}%</h2>
                    <p>Average completion across joined courses</p>
                </article>
                <article className="student-panel-card">
                    <span className="student-eyebrow">Completed</span>
                    <h2>{completedCourses}</h2>
                    <p>Courses fully finished</p>
                </article>
            </section>

            {loading ? <p className="student-muted">Loading your courses...</p> : null}

            <section className="dashboard-grid">
                {items.map((item) => (
                    <article key={item.enrollmentId} className="dashboard-course-card">
                        <div>
                            <span className="dashboard-badge">{item.course.category}</span>
                            <h2>{item.course.title}</h2>
                            <p>{item.course.description}</p>
                        </div>
                        <div className="dashboard-progress-block">
                            <div className="progress-bar"><span style={{ width: `${item.progress?.overallProgress || 0}%` }} /></div>
                            <p>{item.progress?.overallProgress || 0}% complete</p>
                        </div>
                        <button className="student-primary-btn" onClick={() => navigate(`/student/course/${item.course._id}`)}>Open Course</button>
                    </article>
                ))}
            </section>

            {!loading && !items.length ? (
                <div className="student-empty-box">
                    <h3>No joined courses yet</h3>
                    <p>Start with the public catalog and join the course you want to learn.</p>
                </div>
            ) : null}
        </div>
    );
}

export default StudentDashboard;
