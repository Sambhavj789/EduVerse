import "./Header.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useUser } from "../context/UserContext";
import api from "../utils/api";
import toast from "react-hot-toast";

function Header() {
    const links = [
        { name: "Home", url: "/" },
        { name: "Courses", url: "/courses" },
        { name: "About", url: "/about" },
        { name: "Contact", url: "/contact" },
    ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const path = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    async function handleLogout() {
        try {
            const response = await api.post("/auth/logout");
            if (response.data?.success) {
                setUser(null);
                toast.success("Logout Successfully");
                navigate("/");
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Internal Server Error");
        }
    }

    const dashboardLink = user?.role === "teacher" ? "/teacher/courses" : "/student/dashboard";

    return (
        <header>
            <nav>
                <div className="logo">
                    EduVerse
                </div>
                <div className="nav-links">
                    <ul>
                        {
                            links.map((link, index) => {
                                return <li key={index}>
                                    <Link to={link.url} className={path.pathname === link.url ? "selected" : ""}>{link.name}</Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className="nav-right">
                    <div className="search">
                        <FaSearch className="search-icon" /> <input type="text" placeholder="Search Courses" />
                    </div>
                    {
                        user ? (
                            <>
                                <Link to={dashboardLink} className="signup-btn">Dashboard</Link>
                                <button type="button" className="signup-btn" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <Link to="/login" className="signup-btn">SignIn</Link>
                        )
                    }
                </div>

                <div className="mobine-menu-button">
                    {isMenuOpen ? <RxCross1 onClick={() => setIsMenuOpen(false)} /> : <GiHamburgerMenu onClick={() => setIsMenuOpen(true)} />}
                </div>
            </nav>
            {
                isMenuOpen && <div className="mobile-menu">
                    <div className="mobile-nav-links">
                        <ul>
                            {
                                links.map((link, index) => {
                                    return <li key={index}>
                                        <Link to={link.url} className={path.pathname === link.url ? "selected" : ""}>{link.name}</Link>
                                    </li>
                                })
                            }
                        </ul>

                        <div className="mobile-search">
                            <FaSearch className="search-icon" /> <input type="text" placeholder="Search Courses" />
                        </div>

                        {
                            user ? (
                                <>
                                    <Link to={dashboardLink} className="mobile-signup-btn">Dashboard</Link>
                                    <button type="button" className="mobile-signup-btn" onClick={handleLogout}>Logout</button>
                                </>
                            ) : (
                                <Link to="/login" className="mobile-signup-btn">Signin</Link>
                            )
                        }
                    </div>
                </div>
            }
        </header>
    )
}

export default Header
