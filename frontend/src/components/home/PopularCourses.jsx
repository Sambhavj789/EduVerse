import "./PopularCourses.css"
import { GrWifiLow } from "react-icons/gr";
import { GrWifiMedium } from "react-icons/gr";
import { GrWifi } from "react-icons/gr";

function PopularCourses() {

    function levelIcon(level){
        if(level == "beginner"){
            return <GrWifiLow className="level-icon"/>
        }
        if(level == "intermediate"){
            return <GrWifiMedium className="level-icon"/>
        }
        return <GrWifi className="level-icon"/>
    }
    return (
        <section className="popular-courses">
            <p>Popular Courses</p>
            <div className="popular-courses-container">
                <div className="course-card">
                    <div className="course-img">
                        <img src="https://wallpaperaccess.com/full/9445601.jpg" alt="" />
                    </div>
                    <div className="course-category">
                        Web
                    </div>
                    <div className="course-body">
                        <h1 className="course-title">
                            Mern Stack Course
                        </h1>
                        <div className="course-level">
                           {
                            levelIcon("beginner")
                           }
                           <p className="level-text">Beginner Level</p>
                        </div>
                        <div className="course-teacher">
                            <img src="https://tse2.mm.bing.net/th/id/OIP.U0lavRZhl9Y5-e_-UiptAwHaHa?pid=Api&h=220&P=0" alt="" />
                            <span className="teacher-name">Ankit Sir</span>
                        </div>
                    </div>
                    <button className="view-course">
                        View Course
                    </button>
                </div>
                <div className="course-card">
                    <div className="course-img">
                        <img src="https://wallpaperaccess.com/full/9445601.jpg" alt="" />
                    </div>
                    <div className="course-category">
                        Web
                    </div>
                    <div className="course-body">
                        <h1 className="course-title">
                            Mern Stack Course
                        </h1>
                        <div className="course-level">
                           {
                            levelIcon("beginner")
                           }
                           <p className="level-text">Beginner Level</p>
                        </div>
                        <div className="course-teacher">
                            <img src="https://tse2.mm.bing.net/th/id/OIP.U0lavRZhl9Y5-e_-UiptAwHaHa?pid=Api&h=220&P=0" alt="" />
                            <span className="teacher-name">Ankit Sir</span>
                        </div>
                    </div>
                    <button className="view-course">
                        View Course
                    </button>
                </div>
                <div className="course-card">
                    <div className="course-img">
                        <img src="https://wallpaperaccess.com/full/9445601.jpg" alt="" />
                    </div>
                    <div className="course-category">
                        Web
                    </div>
                    <div className="course-body">
                        <h1 className="course-title">
                            Mern Stack Course
                        </h1>
                        <div className="course-level">
                           {
                            levelIcon("beginner")
                           }
                           <p className="level-text">Beginner Level</p>
                        </div>
                        <div className="course-teacher">
                            <img src="https://tse2.mm.bing.net/th/id/OIP.U0lavRZhl9Y5-e_-UiptAwHaHa?pid=Api&h=220&P=0" alt="" />
                            <span className="teacher-name">Ankit Sir</span>
                        </div>
                    </div>
                    <button className="view-course">
                        View Course
                    </button>
                </div>
                <div className="course-card">
                    <div className="course-img">
                        <img src="https://wallpaperaccess.com/full/9445601.jpg" alt="" />
                    </div>
                    <div className="course-category">
                        Web
                    </div>
                    <div className="course-body">
                        <h1 className="course-title">
                            Mern Stack Course
                        </h1>
                        <div className="course-level">
                           {
                            levelIcon("beginner")
                           }
                           <p className="level-text">Beginner Level</p>
                        </div>
                        <div className="course-teacher">
                            <img src="https://tse2.mm.bing.net/th/id/OIP.U0lavRZhl9Y5-e_-UiptAwHaHa?pid=Api&h=220&P=0" alt="" />
                            <span className="teacher-name">Ankit Sir</span>
                        </div>
                    </div>
                    <button className="view-course">
                        View Course
                    </button>
                </div>
                <div className="course-card">
                    <div className="course-img">
                        <img src="https://wallpaperaccess.com/full/9445601.jpg" alt="" />
                    </div>
                    <div className="course-category">
                        Web
                    </div>
                    <div className="course-body">
                        <h1 className="course-title">
                            Mern Stack Course
                        </h1>
                        <div className="course-level">
                           {
                            levelIcon("beginner")
                           }
                           <p className="level-text">Beginner Level</p>
                        </div>
                        <div className="course-teacher">
                            <img src="https://tse2.mm.bing.net/th/id/OIP.U0lavRZhl9Y5-e_-UiptAwHaHa?pid=Api&h=220&P=0" alt="" />
                            <span className="teacher-name">Ankit Sir</span>
                        </div>
                    </div>
                    <button className="view-course">
                        View Course
                    </button>
                </div>
                <div className="course-card">
                    <div className="course-img">
                        <img src="https://wallpaperaccess.com/full/9445601.jpg" alt="" />
                    </div>
                    <div className="course-category">
                        Web
                    </div>
                    <div className="course-body">
                        <h1 className="course-title">
                            Mern Stack Course
                        </h1>
                        <div className="course-level">
                           {
                            levelIcon("beginner")
                           }
                           <p className="level-text">Beginner Level</p>
                        </div>
                        <div className="course-teacher">
                            <img src="https://tse2.mm.bing.net/th/id/OIP.U0lavRZhl9Y5-e_-UiptAwHaHa?pid=Api&h=220&P=0" alt="" />
                            <span className="teacher-name">Ankit Sir</span>
                        </div>
                    </div>
                    <button className="view-course">
                        View Course
                    </button>
                </div>
                <div className="course-card">
                    <div className="course-img">
                        <img src="https://wallpaperaccess.com/full/9445601.jpg" alt="" />
                    </div>
                    <div className="course-category">
                        Web
                    </div>
                    <div className="course-body">
                        <h1 className="course-title">
                            Mern Stack Course
                        </h1>
                        <div className="course-level">
                           {
                            levelIcon("beginner")
                           }
                           <p className="level-text">Beginner Level</p>
                        </div>
                        <div className="course-teacher">
                            <img src="https://tse2.mm.bing.net/th/id/OIP.U0lavRZhl9Y5-e_-UiptAwHaHa?pid=Api&h=220&P=0" alt="" />
                            <span className="teacher-name">Ankit Sir</span>
                        </div>
                    </div>
                    <button className="view-course">
                        View Course
                    </button>
                </div>
            </div>
        </section>
    )
}

export default PopularCourses