import "./PopularCourses.css"
import CourseCard from "../CourseCard";

function PopularCourses() {

    return (
        <section className="popular-courses">
            <p>Popular Courses</p>
            <div className="popular-courses-container">
                <CourseCard />
            </div>
        </section>
    )
}

export default PopularCourses