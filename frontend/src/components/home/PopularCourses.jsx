import "./PopularCourses.css"
import CourseCard from "../CourseCard";

function PopularCourses() {

    const courses = [
        {
            title: "Complete MERN Stack Course",
            category: "Web Development",
            level: "beginner",
            teacher: "Rajesh Verma",
            description: "Build APIs, databases, and modern full-stack apps from scratch.",
            thumbnail: "mern-course.png"
        },
        {
            title: "Advanced React Course",
            category: "Frontend",
            level: "intermediate",
            teacher: "Rahul Sharma",
            description: "Master React patterns, reusable UI architecture, and production workflows.",
            thumbnail: "react-course.png"
        },
        {
            title: "Node.js Mastery",
            category: "Backend",
            level: "advance",
            teacher: "Aman Verma",
            description: "Create scalable backend services with authentication, performance, and clean architecture.",
            thumbnail: "node-course.png"
        }
    ]

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
                            onClick={() => alert(course.title)}
                        />
                    ))
                }

            </div>
        </section>
    )
}

export default PopularCourses
