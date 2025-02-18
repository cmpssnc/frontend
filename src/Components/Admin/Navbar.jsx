import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Optional, if you want to add custom styles

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3000/auth/logout", {
                method: "POST",
            });
            if (!response.ok) {
                throw new Error("Failed to log out");
            }
            // Redirect to login page after successful logout
            navigate("/login");
        } catch (err) {
            console.error("Logout Error:", err);
        }
    };

    return (
        <div className="navbar-container">
            <button onClick={() => navigate("/admin")} className="navbar-btn">
                Dashboard
            </button>
            <button onClick={() => navigate("/admin/students")} className="navbar-btn">
                Students
            </button>
            <button onClick={() => navigate("/admin/teachers")} className="navbar-btn">
                Teachers
            </button>
            <button onClick={() => navigate("/admin/courses")} className="navbar-btn">
                Courses
            </button>
            <button onClick={handleLogout} className="navbar-btn logout-btn">
                Logout
            </button>
        </div>
    );
};

export default Navbar;
