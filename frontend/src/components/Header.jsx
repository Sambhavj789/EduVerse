import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useUser } from "../context/UserContext";

function Header() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/courses" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const isLogin = Boolean(user);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearch(searchParams.get("search") || "");
  }, [location.search]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.search]);

  function isActiveLink(url) {
    if (url === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(url);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();

    const trimmedSearch = search.trim();
    if (!trimmedSearch) {
      navigate("/courses");
      return;
    }

    navigate(`/courses?search=${encodeURIComponent(trimmedSearch)}`);
  }

  function redirectUser() {
    if (user?.role === "teacher") {
      return "/teacher/dashboard";
    }

    return "/student/dashboard";
  }

  function handleLogout() {
    setIsMenuOpen(false);
    logout();
  }

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link to="/" className="logo">
          <span>Edu</span>Verse
        </Link>

        <div className="nav-links">
          <ul>
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <Link
                    to={link.url}
                    className={isActiveLink(link.url) ? "selected" : ""}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav-right">
          <form className="search" onSubmit={handleSearchSubmit}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search Courses"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </form>

          {isLogin ? (
            <div className="after-login-header-btns">
              <Link to={redirectUser()}>Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="signup-btn">
              Sign In
            </Link>
          )}
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          type="button"
        >
          {isMenuOpen ? (
            <RxCross1 />
          ) : (
            <GiHamburgerMenu />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-links">
            <ul>
              {links.map((link, index) => {
                return (
                  <li key={index}>
                    <Link
                      to={link.url}
                      className={isActiveLink(link.url) ? "selected" : ""}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <form className="mobile-search" onSubmit={handleSearchSubmit}>
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search Courses"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button type="submit">Go</button>
            </form>

            {isLogin ? (
              <div className="mobile-header-actions">
                <Link to={redirectUser()} className="mobile-signup-btn">
                  Dashboard
                </Link>

                <button type="button" className="mobile-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="mobile-signup-btn">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
