import "./About.css";

function About() {
    return (
        <div className="about-page">

            {/* HERO */}
            <section className="about-hero">

                <div className="about-hero-left">

                    <div className="about-tag">
                        About EduNova
                    </div>

                    <h1>
                        Empowering students with
                        <span> modern education.</span>
                    </h1>

                    <p>
                        EduNova is a modern online learning platform
                        designed to help students learn practical
                        skills from industry experts. We focus on
                        quality education, real-world projects,
                        and career growth.
                    </p>

                    <div className="about-buttons">
                        <button>Explore Courses</button>
                        <button className="secondary-btn">
                            Learn More
                        </button>
                    </div>

                </div>

                <div className="about-hero-right">

                    <div className="about-image-card">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                            alt=""
                        />
                    </div>

                </div>

            </section>

            {/* STATS */}
            <section className="about-stats">

                <div className="stat-card">
                    <h2>50K+</h2>
                    <p>Students</p>
                </div>

                <div className="stat-card">
                    <h2>120+</h2>
                    <p>Courses</p>
                </div>

                <div className="stat-card">
                    <h2>80+</h2>
                    <p>Expert Mentors</p>
                </div>

                <div className="stat-card">
                    <h2>95%</h2>
                    <p>Success Rate</p>
                </div>

            </section>

            {/* MISSION */}
            <section className="mission-section">

                <div className="mission-left">

                    <h2>Our Mission</h2>

                    <p>
                        Our mission is to make high-quality
                        education accessible to everyone.
                        We believe learning should be engaging,
                        practical, and career-focused.
                    </p>

                    <p>
                        We help students gain real-world skills
                        through interactive courses, projects,
                        and mentorship from experienced
                        professionals.
                    </p>

                </div>

                <div className="mission-right">

                    <div className="mission-card">
                        <h3>🎯 Vision</h3>
                        <p>
                            Building the future of online
                            education with innovation and
                            accessibility.
                        </p>
                    </div>

                    <div className="mission-card">
                        <h3>🚀 Growth</h3>
                        <p>
                            Helping learners achieve personal
                            and professional success.
                        </p>
                    </div>

                </div>

            </section>

            {/* TEAM */}
            <section className="team-section">

                <div className="section-heading">
                    <h2>Meet Our Team</h2>
                    <p>
                        Passionate educators and developers
                        working together to build better learning.
                    </p>
                </div>

                <div className="team-grid">

                    <div className="team-card">
                        <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt=""
                        />
                        <h3>Ankit Sharma</h3>
                        <p>Full Stack Mentor</p>
                    </div>

                    <div className="team-card">
                        <img
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            alt=""
                        />
                        <h3>Priya Mehta</h3>
                        <p>UI/UX Designer</p>
                    </div>

                    <div className="team-card">
                        <img
                            src="https://randomuser.me/api/portraits/men/11.jpg"
                            alt=""
                        />
                        <h3>Rahul Verma</h3>
                        <p>Backend Instructor</p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default About;