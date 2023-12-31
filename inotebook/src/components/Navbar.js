// import React, { useEffect } from "react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  let location = useLocation();
  // useEffect(() => {
  //   console.log("Pathname is: ", location.pathname);
  // }, [location]);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Logged out!!");
    try {
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About Us
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <>
                <Link
                  className={`nav-link ${
                    location.pathname === "/login" ? "active" : ""
                  } mx-2`}
                  to="/login"
                  style={{
                    color:
                      location.pathname === "/login" ? "white" : "darkgray",
                  }}
                >
                  Login
                </Link>
                <Link
                  className={`nav-link ${
                    location.pathname === "/signup" ? "active" : ""
                  } mx-2`}
                  to="/signup"
                  style={{
                    color:
                      location.pathname === "/signup" ? "white" : "darkgray",
                  }}
                >
                  SignUp
                </Link>
              </>
            ) : (
              // <>
              <Link
                className={`nav-link ${
                  location.pathname === "/logout" ? "active" : ""
                } mx-2`}
                to="/login"
                style={{
                  color: location.pathname === "/logout" ? "white" : "darkgray",
                }}
                onClick={handleLogout}
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
