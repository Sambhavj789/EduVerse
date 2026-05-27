import "./PopularCourses.css"
import CourseCard from "../CourseCard";

function PopularCourses() {

    const courses = [
        {
            title: "Complete MERN Stack Course",
            category: "Web Development",
            level: "beginner",
            teacher: "Rajesh Verma",
            thumbnail: "mern-course.png"
        },
        {
            title: "Advanced React Course",
            category: "Frontend",
            level: "intermediate",
            teacher: "Rahul Sharma",
            thumbnail: "react-course.png"
        },
        {
            title: "Node.js Mastery",
            category: "Backend",
            level: "advanced",
            teacher: "Aman Verma",
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