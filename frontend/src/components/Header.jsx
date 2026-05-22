import "./Header.css"
import { Link, useLocation, useParams } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { RxCross1, RxCross2 } from "react-icons/rx";
function Header() {
    const links = [
        { name: "Home", url: "/" },
        { name: "Courses", url: "/courses" },
        { name: "About", url: "/about" },
        { name: "Contact", url: "/contact" },
    ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const path = useLocation();
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
                    <Link to="/signup" className="signup-btn">Signup/Join</Link>
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

                        <Link to="/signup" className="mobile-signup-btn">Signup/Join</Link>
                    </div>
                </div>
            }
        </header>
    )
}

export default Header