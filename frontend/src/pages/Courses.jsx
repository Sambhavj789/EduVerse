import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import api from "../utils/api";
import "./StudentExperience.css";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");
    const [language, setLanguage] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadCourses() {
            try {
                setLoading(true);
                const query = new URLSearchParams({ limit: "50" });
                if (search) query.set("search", search);
                if (category) query.set("category", category);
                if (level) query.set("level", level);
                if (language) query.set("language", language);

                const response = await api.get(`/course/all?${query.toString()}`);
                if (response.data?.success) {
                    setCourses(response.data?.data || []);
                }
            }
            finally {
                setLoading(false);
            }
        }

        const timer = setTimeout(loadCourses, 250);
        return () => clearTimeout(timer);
    }, [search, category, level, language]);

    return (
        <div className="student-page student-courses-page">
            <section className="student-hero">
                <div>
                    <span className="student-eyebrow">Explore Programs</span>
                    <h1>Courses built for practical learning</h1>
                    <p>Browse detailed curriculums, join instantly, and continue from your dashboard.</p>
                </div>
                <div className="student-search-card">
                    <label htmlFor="course-search">Find your next course</label>
                    <input
                        id="course-search"
                        type="text"
                        placeholder="Search by title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="catalog-filter-grid">
                        <input
                            type="text"
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <select value={level} onChange={(e) => setLevel(e.target.value)}>
                            <option value="">All levels</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advance">Advance</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {loading ? <p className="student-muted">Loading courses...</p> : null}

            <section className="student-card-grid">
                {courses.map((course) => (
                    <CourseCard
                        key={course._id}
                        data={course}
                        mode="normal"
                        onClick={() => navigate(`/courses/${course._id}`)}
                    />
                ))}
            </section>

            {!loading && !courses.length ? <p className="student-empty">No courses found for this search.</p> : null}
        </div>
    );
}

export default Courses;
