// src/components/Layout.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth"; // Import useAuth để lấy thông tin người dùng

const Layout = ({ children }) => {
    const { user, logout } = useAuth(); // Sử dụng useAuth để lấy thông tin người dùng
    // Hàm để render các link trong sidebar dựa trên role của user
    const renderSidebarLinks = () => {
        if (!user) return null;

        switch (user.role) {
            case "admin":
                return (
                    <>
                        <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                        <li><Link to="/admin/classes">Classes</Link></li>
                        <li><Link to="/admin/students">Manage Students</Link></li>
                    </>
                );
            case "teacher":
                return (
                    <>
                        <li><Link to="/teacher/dashboard">Teacher Dashboard</Link></li>
                        <li><Link to="/teacher/attendance">Attendance</Link></li>
                        <li><Link to="/teacher/classes">My Classes</Link></li>
                    </>
                );
            case "student":
                return (
                    <>
                        <li><Link to="/student/dashboard">Student Dashboard</Link></li>
                        <li><Link to="/student/attendance">My Attendance</Link></li>
                        <li><Link to="/student/classes">My Classes</Link></li>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="layout">
            <div className="sidebar">
                <ul>
                    {user ? (
                        <>
                            <li>Welcome, {user.name}</li>
                            {renderSidebarLinks()} {/* Render các link tùy theo role */}
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/auth/login">Login</Link></li>
                        </>
                    )}
                </ul>
            </div>
            <div className="main-content">
                <header>
                    <h1>Welcome to the App</h1>
                </header>
                <div className="content">
                    {children} {/* Đây là nơi sẽ render các route con */}
                </div>
            </div>
        </div>
    );
};

export default Layout;
