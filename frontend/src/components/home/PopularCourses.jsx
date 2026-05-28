import "./PopularCourses.css"
import CourseCard from "../CourseCard";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

function PopularCourses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadCourses() {
            try {
                const response = await api.get("/course/all?limit=3");
                if (response.data?.success) {
                    setCourses(response.data?.data || []);
                }
            }
            catch (err) {
                setCourses([]);
            }
        }

        loadCourses();
    }, []);

    return (
        <section className="popular-courses">
            <p>Popular Courses</p>

            <div className="popular-courses-container">

                {
                    courses.map((course, index) => (
                        <CourseCard
                            key={index}
                            data={course}
                            mode="normal"
                            onClick={() => navigate(`/courses/${course._id}`)}
                        />
                    ))
                }

            </div>
        </section>
    )
}

export default PopularCourses
