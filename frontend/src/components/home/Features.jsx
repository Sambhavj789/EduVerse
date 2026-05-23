import "./Features.css";
import { FaUser } from "react-icons/fa";
function Features() {
    return (
        <section className="features">
            <p>Features</p>
            <div className="features-main">
                <div className="features-left">
                    <h1>Everything You Need <br />to Succeed</h1>
                </div>
                <div className="features-right">
                    <div className="features-card">
                        <FaUser className="feature-icon" />
                        <h2>Expert Teachers</h2>
                        <p>Study From Professional teachers and gain real world experiance</p>
                    </div>
                    <div className="features-card">
                        <FaUser className="feature-icon" />
                        <h2>Expert Teachers</h2>
                        <p>Study From Professional teachers and gain real world experiance</p>
                    </div>
                    <div className="features-card">
                        <FaUser className="feature-icon" />
                        <h2>Expert Teachers</h2>
                        <p>Study From Professional teachers and gain real world experiance</p>
                    </div>
                    <div className="features-card">
                        <FaUser className="feature-icon" />
                        <h2>Expert Teachers</h2>
                        <p>Study From Professional teachers and gain real world experiance</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features