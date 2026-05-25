import "./Footer.css";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-top">

                {/* LEFT */}
                <div className="footer-brand">

                    <div className="footer-logo">
                        <span>Edu</span>Verse
                    </div>

                    <p>
                        Learn modern skills with expert instructors and
                        build your future with confidence.
                    </p>

                    <div className="footer-socials">
                        <div><FaFacebookF /></div>
                        <div><FaInstagram /></div>
                        <div><FaTwitter /></div>
                        <div><FaLinkedinIn /></div>
                    </div>

                </div>

                {/* LINKS */}
                <div className="footer-links">

                    <div className="footer-column">
                        <h3>Platform</h3>

                        <a href="#">Browse Courses</a>
                        <a href="#">Mentors</a>
                        <a href="#">Certificates</a>
                        <a href="#">Community</a>
                    </div>

                    <div className="footer-column">
                        <h3>Company</h3>

                        <a href="#">About Us</a>
                        <a href="#">Careers</a>
                        <a href="#">Blog</a>
                        <a href="#">Contact</a>
                    </div>

                    <div className="footer-column">
                        <h3>Support</h3>

                        <a href="#">Help Center</a>
                        <a href="#">Terms</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">FAQs</a>
                    </div>

                </div>

                {/* NEWSLETTER */}
                <div className="footer-newsletter">

                    <h2>Stay Updated</h2>

                    <p>
                        Subscribe to get latest courses,
                        news and updates.
                    </p>

                    <div className="newsletter-box">
                        <input
                            type="email"
                            placeholder="Enter your email"
                        />

                        <button>Subscribe</button>
                    </div>

                </div>

            </div>

            {/* BOTTOM */}
            <div className="footer-bottom">
                <p>
                    © 2026 EduVerse. All rights reserved.
                </p>
            </div>

        </footer>
    );
}

export default Footer;