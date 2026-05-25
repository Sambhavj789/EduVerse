import "./Contact.css";
import {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaClock,
} from "react-icons/fa";

function Contact() {
    return (
        <div className="contact-page">

            {/* HERO */}
            <section className="contact-hero">

                <div className="contact-hero-left">

                    <div className="contact-tag">
                        Contact Us
                    </div>

                    <h1>
                        Let’s start a
                        <span> conversation.</span>
                    </h1>

                    <p>
                        Have questions about courses, mentorship,
                        or your learning journey? Our team is
                        here to help you anytime.
                    </p>

                </div>

                <div className="contact-hero-right">

                    <div className="contact-image-card">
                        <img
                            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
                            alt=""
                        />
                    </div>

                </div>

            </section>

            {/* MAIN CONTACT SECTION */}
            <section className="contact-container">

                {/* LEFT INFO */}
                <div className="contact-info">

                    <div className="info-card">
                        <div className="info-icon">
                            <FaEnvelope />
                        </div>

                        <div>
                            <h3>Email</h3>
                            <p>support@edunova.com</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <FaPhoneAlt />
                        </div>

                        <div>
                            <h3>Phone</h3>
                            <p>+91 98765 43210</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <FaMapMarkerAlt />
                        </div>

                        <div>
                            <h3>Location</h3>
                            <p>Lucknow, Uttar Pradesh, India</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <FaClock />
                        </div>

                        <div>
                            <h3>Working Hours</h3>
                            <p>Mon - Sat : 9AM - 7PM</p>
                        </div>
                    </div>

                </div>

                {/* FORM */}
                <div className="contact-form-container">

                    <h2>Send us a message</h2>

                    <form className="contact-form">

                        <div className="form-row">

                            <div className="input-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter first name"
                                />
                            </div>

                            <div className="input-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter last name"
                                />
                            </div>

                        </div>

                        <div className="input-group">
                            <label>Email Address</label>

                            <input
                                type="email"
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="input-group">
                            <label>Subject</label>

                            <input
                                type="text"
                                placeholder="Enter subject"
                            />
                        </div>

                        <div className="input-group">
                            <label>Message</label>

                            <textarea
                                rows="6"
                                placeholder="Write your message..."
                            ></textarea>
                        </div>

                        <button type="submit">
                            Send Message
                        </button>

                    </form>

                </div>

            </section>

        </div>
    );
}

export default Contact;