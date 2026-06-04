import "./Features.css";
import {
    FaChalkboardTeacher,
    FaChartLine,
    FaLaptopCode,
    FaRegClock
} from "react-icons/fa";

function Features() {
    const features = [
        {
            icon: <FaChalkboardTeacher className="feature-icon" />,
            accentClass: "feature-accent-blue",
            title: "Mentor-Led Learning",
            description: "Learn with experienced teachers through structured lessons, feedback, and guided support."
        },
        {
            icon: <FaLaptopCode className="feature-icon" />,
            accentClass: "feature-accent-purple",
            title: "Practical Course Content",
            description: "Access videos, notes, quizzes, and hands-on modules designed for real skill building."
        },
        {
            icon: <FaChartLine className="feature-icon" />,
            accentClass: "feature-accent-green",
            title: "Track Your Progress",
            description: "See completed lectures, quiz attempts, and overall course progress in one dashboard."
        },
        {
            icon: <FaRegClock className="feature-icon" />,
            accentClass: "feature-accent-orange",
            title: "Learn At Your Pace",
            description: "Study anytime with flexible lessons that fit around college, work, or daily routines."
        }
    ];

    return (
        <section className="features">
            <p>Features</p>
            <div className="features-main">
                <div className="features-left">
                    <h1>Everything You Need <br />to Succeed</h1>
                </div>
                <div className="features-right">
                    {features.map((feature) => (
                        <div className="features-card" key={feature.title}>
                            <div className={`feature-icon-wrap ${feature.accentClass}`}>
                                {feature.icon}
                            </div>
                            <h2>{feature.title}</h2>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
