import { useEffect, useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import "./Courses.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";

const categoryOptions = [
  "Web Development",
  "Frontend",
  "Backend",
  "Data Science",
  "Design",
  "Programming",
  "DevOps",
  "Database",
];

const languageOptions = ["English", "Hindi"];
const levelOptions = ["beginner", "intermediate", "advanced"];
const PAGE_SIZE = 6;

function Courses() {
  const [params, setParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [paginationData, setPaginationData] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const selectedCategories = params.getAll("category") || [];
  const selectedLanguages = params.getAll("language") || [];
  const currentPage = Number(params.get("page")) || 1;
  const limit = Number(params.get("limit")) || 6;
  const selectedLevels = params.getAll("level") || [];
  const search = params.get("search") || "";
  const navigate = useNavigate();

  async function getCourses() {
    try {
      const response = await api.get(`/course/all?${params.toString()}`);
      if (response.data?.success) {
        setCourses(response.data?.data);
        setPaginationData(response.data?.pagination);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Internal Server Error");
    }
  }
  useEffect(() => {
    getCourses();
  }, [params]);

  function changePage(num) {
    if (num == -1) {
      // Next Page
      params.set("page", currentPage + 1);
    } else if (num == -2) {
      // Previous Page
      params.set("page", currentPage - 1);
    } else {
      params.set("page", num);
    }
    setParams(params);
  }

  function toggleFilter(key, value) {
    params.set("page", 1);
    let current = params.getAll(key);
    if (current.includes(value)) {
      current = current.filter((val) => val != value);
    } else {
      current.push(value);
    }
    params.delete(key);
    current.forEach((val) => params.append(key, val));
    setParams(params);
  }

  function clearFilters() {
    params.delete("category");
    params.delete("level");
    params.delete("language");
    params.set("page", 1);
    setParams(params);
  }
  return (
    <section className="courses-page">
      <div className="courses-hero">
        <p className="courses-kicker">Explore Learning Paths</p>
        <h1>Discover courses that match your pace and goals</h1>
        <p className="courses-subtitle">
          Category, language aur skill level ke basis par courses filter karo.
          Abhi demo data use ho raha hai, backend integration baad me add
          karenge.
        </p>
      </div>

      <div className="courses-layout">
        <aside className="courses-sidebar">
          <div className="sidebar-header">
            <h2>Filters</h2>
            <button type="button" onClick={clearFilters}>
              Clear All
            </button>
          </div>

          <div className="filter-group">
            <h3>Category</h3>
            {categoryOptions.map((option) => (
              <label key={option} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(option)}
                  onChange={() => toggleFilter("category", option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Language</h3>
            {languageOptions.map((option) => (
              <label key={option} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(option)}
                  onChange={() => toggleFilter("language", option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Level</h3>
            {levelOptions.map((option) => (
              <label key={option} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedLevels.includes(option)}
                  onChange={() => toggleFilter("level", option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </aside>

        <div className="courses-content">
          <div className="courses-toolbar">
            <div>
              <h2>Available Courses</h2>
              <p>
                {paginationData.total} course
                {paginationData.total !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {courses.length ? (
            <div className="courses-grid">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  data={course}
                  mode="normal"
                  onClick={() => navigate(`/course/${course._id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-courses">
              <h3>No courses found</h3>
              <p>Try changing filters to see more results.</p>
            </div>
          )}

          <div className="courses-pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => changePage(-2)}
            >
              Previous
            </button>

            {Array.from(
              { length: paginationData.totalPages },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                type="button"
                className={page == currentPage ? "active-page" : ""}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === paginationData.totalPages}
              onClick={() => changePage(-1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Courses;
