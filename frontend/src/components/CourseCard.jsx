import { GrWifiLow } from "react-icons/gr";
import { GrWifiMedium } from "react-icons/gr";
import { GrWifi } from "react-icons/gr";

function CourseCard({ data, mode, onClick }) {

    function levelIcon(level) {
        if (level == "beginner") {
            return <GrWifiLow className="level-icon" />
        }
        if (level == "intermediate") {
            return <GrWifiMedium className="level-icon" />
        }
        return <GrWifi className="level-icon" />
    }
    const IMAGE_URL = "http://localhost:4000/uploads/"
    const teacherName = typeof data.teacher === "string"
        ? data.teacher
        : data.teacher?.fullname || "Expert Instructor";
    const thumbnail = data.thumbnail ? IMAGE_URL + data.thumbnail : "https://placehold.co/600x400/e2e8f0/475569?text=EduVerse";

    return (
        <div className="course-card">
            <div className="course-img">
                <img src={thumbnail} alt={data.title} />
            </div>
            <div className="course-category">
                {data.category}
            </div>
            <div className="course-body">
                <h1 className="course-title">
                    {data.title}
                </h1>
                <div className="course-level">
                    {
                        levelIcon(data.level)
                    }
                    <p className="level-text">{data.level} Level</p>
                </div>
                {mode == "normal" && <div className="course-teacher">
                    <img src="https://tse2.mm.bing.net/th/id/OIP.U0lavRZhl9Y5-e_-UiptAwHaHa?pid=Api&h=220&P=0" alt="" />
                    <span className="teacher-name">{teacherName}</span>
                </div>}
            </div>
            <button className="view-course" onClick={onClick}>
                View Course
            </button>
        </div>
    )
}

export default CourseCard
