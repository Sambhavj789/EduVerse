import "./Hero.css"
import HeroImg from "../../assets/hero-image-2.png"
function Hero() {
    return (
        <section className="hero">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>

            <div className="hero-left">
                <div className="hero-tag">
                    <span>#1</span><span>Learing Platform</span>
                </div>
                <div className="hero-heading">
                    <h1>
                        Learn the skills <br />
                        of <span>tomorrow.</span>
                    </h1>
                </div>
                <p className="hero-para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit natus itaque animi provident, veritatis harum dolorum facere aperiam voluptas inventore.
                </p>
                <div className="hero-btn">
                    <div className="browse-course">
                        <button>Browse Courses</button>
                    </div>
                    <div className="explore">
                        <button>Explore</button>
                    </div>
                </div>
                <div className="students-info">
                    <img src="https://tse2.mm.bing.net/th/id/OIP.U0lavRZhl9Y5-e_-UiptAwHaHa?pid=Api&h=220&P=0" alt="" />
                    <img src="https://tse1.mm.bing.net/th/id/OIP.qa7DYhip4-1kXMNKynWR9gAAAA?pid=Api&h=220&P=0" alt="" />
                    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" alt="" />
                    <img src="https://tse2.mm.bing.net/th/id/OIP.iMETKOz3mAfjiwlQ4Kf1GgHaHa?pid=Api&h=220&P=0" alt="" />
                    <p>50K+<br /><span>Active Students</span></p>
                </div>
            </div>
            <div className="hero-right">
                <img src={HeroImg} alt="" />
            </div>
        </section>
    )
}

export default Hero