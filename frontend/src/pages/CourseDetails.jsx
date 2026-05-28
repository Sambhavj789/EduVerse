import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useUser } from "../context/UserContext";
import "./StudentExperience.css";

function CourseDetails() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const [course, setCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [joining, setJoining] = useState(false);

    useEffect(() => {
        async function loadCourse() {
            try {
                const response = await api.get(`/course/${courseId}`);
                if (response.data?.success) {
                    setCourse(response.data.data);
                }
            }
            catch (err) {
                toast.error(err?.response?.data?.message || "Unable to load course");
            }
        }

        loadCourse();
    }, [courseId]);

    useEffect(() => {
        async function loadStatus() {
            if (!user || user.role !== "student") {
                return;
            }

            try {
                const response = await api.get(`/enrollments/status/${courseId}`);
                setIsEnrolled(Boolean(response.data?.data?.isEnrolled));
            }
            catch (err) {
                setIsEnrolled(false);
            }
        }

        loadStatus();
    }, [courseId, user]);

    const stats = useMemo(() => {
        const moduleCount = course?.modules?.length || 0;
        const chapterCount = course?.modules?.reduce((sum, module) => sum + (module.chapters?.length || 0), 0) || 0;
        const lectureCount = course?.modules?.reduce(
            (sum, module) => sum + (module.chapters?.reduce((chapterSum, chapter) => chapterSum + (chapter.lectures?.length || 0), 0) || 0),
            0
        ) || 0;

        return { moduleCount, chapterCount, lectureCount };
    }, [course]);

    async function handleJoinCourse() {
        if (!user) {
            navigate("/login");
            return;
        }

        if (user.role !== "student") {
            toast.error("Only students can join courses");
            return;
        }

        try {
            setJoining(true);
            const response = await api.post("/enrollments/join", { courseId });
            if (response.data?.success) {
                toast.success(response.data.message);
                setIsEnrolled(true);
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Unable to join course");
        }
        finally {
            setJoining(false);
        }
    }

    if (!course) {
        return <div className="student-page"><p className="student-muted">Loading course...</p></div>;
    }

    return (
        <div className="student-page">
            <section className="course-detail-hero">
                <div className="course-detail-copy">
                    <span className="student-eyebrow">{course.category}</span>
                    <h1>{course.title}</h1>
                    <p>{course.description}</p>

                    <div className="student-stat-row">
                        <div><strong>{stats.moduleCount}</strong><span>Modules</span></div>
                        <div><strong>{stats.chapterCount}</strong><span>Chapters</span></div>
                        <div><strong>{stats.lectureCount}</strong><span>Lectures</span></div>
                        <div><strong>{course.totalStudents || 0}</strong><span>Students</span></div>
                    </div>

                    <div className="student-action-row">
                        {isEnrolled ? (
                            <button className="student-primary-btn" onClick={() => navigate(`/student/course/${courseId}`)}>Continue Learning</button>
                        ) : (
                            <button className="student-primary-btn" onClick={handleJoinCourse} disabled={joining}>{joining ? "Joining..." : "Join Course"}</button>
                        )}
                        <button className="student-secondary-btn" onClick={() => navigate("/courses")}>Browse More</button>
                    </div>
                </div>

                <div className="student-panel-card">
                    <h3>Course Snapshot</h3>
                    <p><strong>Teacher:</strong> {course.teacher?.fullname || "Expert Instructor"}</p>
                    <p><strong>Level:</strong> {course.level}</p>
                    <p><strong>Language:</strong> {course.language}</p>
                    <p><strong>Duration:</strong> {course.totalDuration || 0} hours</p>
                    <p><strong>Lectures:</strong> {course.totalLectures || stats.lectureCount}</p>
                </div>
            </section>

            <section className="student-two-column">
                <div className="student-panel-card">
                    <h2>What you'll learn</h2>
                    <ul className="student-list">
                        {(course.learningOutcomes || []).map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>

                <div className="student-panel-card">
                    <h2>Requirements</h2>
                    <ul className="student-list">
                        {(course.requirements || []).map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
            </section>

            <section className="student-panel-card">
                <div className="student-section-head">
                    <h2>Curriculum</h2>
                    <span>{stats.lectureCount} lessons ready</span>
                </div>
                <div className="curriculum-list">
                    {(course.modules || []).map((module) => (
                        <div key={module._id} className="curriculum-module">
                            <h3>{module.order}. {module.title}</h3>
                            {(module.chapters || []).map((chapter) => (
                                <div key={chapter._id} className="curriculum-chapter">
                                    <h4>{chapter.order}. {chapter.title}</h4>
                                    <ul>
                                        {(chapter.lectures || []).map((lecture) => <li key={lecture._id}>{lecture.title}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default CourseDetails;
