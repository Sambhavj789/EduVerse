import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import "./StudentExperience.css";

const UPLOADS_URL = "http://localhost:4000/uploads/";

function StudentCoursePlayer() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [progress, setProgress] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(true);
    const [activeLectureId, setActiveLectureId] = useState("");
    const [answers, setAnswers] = useState({});
    const [quizResults, setQuizResults] = useState({});
    const [videoSrc, setVideoSrc] = useState("");
    const [videoLoading, setVideoLoading] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const [courseResponse, statusResponse, progressResponse] = await Promise.all([
                    api.get(`/course/${courseId}`),
                    api.get(`/enrollments/status/${courseId}`),
                    api.get(`/progress/${courseId}`)
                ]);

                const courseData = courseResponse.data?.data;
                setCourse(courseData);
                setIsEnrolled(Boolean(statusResponse.data?.data?.isEnrolled));
                setProgress(progressResponse.data?.data || null);

                const firstLecture = courseData?.modules?.[0]?.chapters?.[0]?.lectures?.[0];
                if (firstLecture) {
                    setActiveLectureId(firstLecture._id);
                }
            }
            catch (err) {
                toast.error(err?.response?.data?.message || "Unable to load course player");
            }
        }

        loadData();
    }, [courseId]);

    const lectures = useMemo(() => {
        return course?.modules?.flatMap((module) =>
            (module.chapters || []).flatMap((chapter) =>
                (chapter.lectures || []).map((lecture) => ({
                    ...lecture,
                    moduleTitle: module.title,
                    chapterTitle: chapter.title
                }))
            )
        ) || [];
    }, [course]);

    const activeLecture = lectures.find((lecture) => lecture._id === activeLectureId) || lectures[0];
    const completedLectureIds = new Set((progress?.completedLectures || []).map((id) => id.toString()));
    const quizAttempts = new Map((progress?.completedQuizzes || []).map((item) => [item.quiz.toString(), item]));

    useEffect(() => {
        let objectUrl = "";

        async function loadVideo() {
            if (!activeLecture?.videoUrl) {
                setVideoSrc("");
                return;
            }

            try {
                setVideoLoading(true);
                const response = await api.get(`/lectures/video/stream/${activeLecture._id}`, {
                    responseType: "blob"
                });

                objectUrl = URL.createObjectURL(response.data);
                setVideoSrc(objectUrl);
            }
            catch (err) {
                setVideoSrc("");
                toast.error(err?.response?.data?.message || "Unable to load lecture video");
            }
            finally {
                setVideoLoading(false);
            }
        }

        loadVideo();

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [activeLecture?._id, activeLecture?.videoUrl]);

    async function handleLectureCompletion(completed) {
        try {
            const response = await api.post(`/progress/lectures/${activeLecture._id}/toggle`, { courseId, completed });
            setProgress(response.data?.data || null);
            toast.success(response.data?.message);
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Unable to update lecture status");
        }
    }

    async function handleSubmitQuiz(quiz) {
        const quizAnswers = quiz.questions.map((_, index) => answers[`${quiz._id}-${index}`] || "");

        try {
            const response = await api.post(`/progress/quizzes/${quiz._id}/submit`, { courseId, answers: quizAnswers });
            setProgress(response.data?.data?.progress || null);
            setQuizResults((prev) => ({ ...prev, [quiz._id]: response.data?.data }));
            toast.success(`Quiz submitted. Score: ${response.data?.data?.score}/${response.data?.data?.totalMarks}`);
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Unable to submit quiz");
        }
    }

    if (!course) {
        return <div className="student-page"><p className="student-muted">Loading course...</p></div>;
    }

    if (!isEnrolled) {
        return (
            <div className="student-page">
                <div className="student-empty-box">
                    <h3>You have not joined this course yet</h3>
                    <p>Join from the course details page before accessing modules and lectures.</p>
                    <button className="student-primary-btn" onClick={() => navigate(`/courses/${courseId}`)}>Go To Course Details</button>
                </div>
            </div>
        );
    }

    return (
        <div className="player-page">
            <aside className="player-sidebar">
                <div className="player-sidebar-head">
                    <Link to="/student/dashboard">Back</Link>
                    <h2>{course.title}</h2>
                    <p>{progress?.overallProgress || 0}% completed</p>
                </div>
                <div className="player-outline">
                    {(course.modules || []).map((module) => (
                        <div key={module._id} className="outline-module">
                            <h3>{module.order}. {module.title}</h3>
                            {(module.chapters || []).map((chapter) => (
                                <div key={chapter._id} className="outline-chapter">
                                    <h4>{chapter.order}. {chapter.title}</h4>
                                    {(chapter.lectures || []).map((lecture) => (
                                        <button
                                            key={lecture._id}
                                            type="button"
                                            className={`outline-lecture ${activeLecture?._id === lecture._id ? "active-outline-lecture" : ""}`}
                                            onClick={() => setActiveLectureId(lecture._id)}
                                        >
                                            <span>{lecture.title}</span>
                                            {completedLectureIds.has(lecture._id) ? <strong>Done</strong> : null}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </aside>

            <main className="player-main">
                {activeLecture ? (
                    <>
                        <section className="player-lecture-card">
                            <div className="student-section-head">
                                <div>
                                    <span className="student-eyebrow">{activeLecture.moduleTitle} / {activeLecture.chapterTitle}</span>
                                    <h1>{activeLecture.title}</h1>
                                </div>
                                <button
                                    className={completedLectureIds.has(activeLecture._id) ? "student-secondary-btn" : "student-primary-btn"}
                                    onClick={() => handleLectureCompletion(!completedLectureIds.has(activeLecture._id))}
                                >
                                    {completedLectureIds.has(activeLecture._id) ? "Mark Incomplete" : "Mark Complete"}
                                </button>
                            </div>

                            {videoLoading ? <p className="student-muted">Loading video...</p> : null}
                            {videoSrc ? <video className="player-video" controls src={videoSrc} /> : null}
                            {!videoLoading && activeLecture.videoUrl && !videoSrc ? <p className="student-empty">Video could not be loaded.</p> : null}

                            <p className="player-description">{activeLecture.description}</p>

                            {activeLecture.textContent ? (
                                <div className="player-text-block">
                                    <h3>Lecture Notes</h3>
                                    <p>{activeLecture.textContent}</p>
                                </div>
                            ) : null}

                            {activeLecture.materials?.length ? (
                                <div className="player-text-block">
                                    <h3>Resources</h3>
                                    <div className="resource-download-list">
                                        {activeLecture.materials.map((material, index) => (
                                            <a
                                                key={index}
                                                className="resource-download-card"
                                                href={UPLOADS_URL + material.fileUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <strong>{material.title}</strong>
                                                <span>Open or download resource</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </section>

                        <section className="player-quiz-section">
                            <div className="student-section-head">
                                <h2>Lecture Quiz</h2>
                                <span>{activeLecture.quizes?.length || 0} available</span>
                            </div>

                            {(activeLecture.quizes || []).map((quiz) => {
                                const lastResult = quizResults[quiz._id];
                                const previousAttempt = quizAttempts.get(quiz._id);

                                return (
                                    <article key={quiz._id} className="quiz-card-student">
                                        <h3>{quiz.title}</h3>
                                        <p>{quiz.difficulty} difficulty</p>

                                        {quiz.questions.map((question, questionIndex) => (
                                            <div key={questionIndex} className="quiz-question-block">
                                                <h4>{questionIndex + 1}. {question.question}</h4>
                                                <div className="quiz-option-list">
                                                    {(question.options || []).map((option, optionIndex) => {
                                                        const answerKey = `${quiz._id}-${questionIndex}`;

                                                        return (
                                                            <label key={optionIndex} className="quiz-option-row">
                                                                <input
                                                                    type="radio"
                                                                    name={answerKey}
                                                                    checked={answers[answerKey] === option}
                                                                    onChange={() => setAnswers((prev) => ({ ...prev, [answerKey]: option }))}
                                                                />
                                                                <span>{option}</span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="student-action-row">
                                            <button className="student-primary-btn" onClick={() => handleSubmitQuiz(quiz)}>Submit Quiz</button>
                                            {previousAttempt ? <span className="student-muted">Last score: {previousAttempt.score}</span> : null}
                                        </div>

                                        {lastResult ? (
                                            <div className="quiz-result-box">
                                                <strong>Latest Score: {lastResult.score}/{lastResult.totalMarks}</strong>
                                                {lastResult.results.map((result, index) => (
                                                    <p key={index}>{result.isCorrect ? "Correct" : `Wrong. Correct: ${result.correctAnswer}`}</p>
                                                ))}
                                            </div>
                                        ) : null}
                                    </article>
                                );
                            })}

                            {!activeLecture.quizes?.length ? <p className="student-empty">No quiz added for this lecture yet.</p> : null}
                        </section>
                    </>
                ) : (
                    <p className="student-empty">No lecture found in this course yet.</p>
                )}
            </main>
        </div>
    );
}

export default StudentCoursePlayer;
