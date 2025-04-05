import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaClipboardList } from "react-icons/fa";


const Sidebar = () => {
    const { user } = useAuth();
    const location = useLocation();

    const menuItems = {
        admin: [
            { to: "/admin/students", label: "Quản lý sinh viên", icon: <FaUserGraduate /> },
            { to: "/admin/teachers", label: "Quản lý giảng viên", icon: <FaChalkboardTeacher /> },
            { to: "/admin/classes", label: "Quản lý lớp học", icon: <FaUsers /> },
            { to: "/admin/attendance", label: "Quản lý điểm danh", icon: <FaClipboardList /> }
        ],
        teacher: [
            { to: "/classes", label: "Quản lý lớp học", icon: <FaUsers /> },
            { to: "/teacher", label: "Thời khóa biểu", icon: <FaChalkboardTeacher /> },
            { to: "/attendance", label: "Điểm danh", icon: <FaClipboardList /> }
        ],
        student: [
            { to: "/attendance", label: "Điểm danh", icon: <FaClipboardList /> },
            { to: "/profile", label: "Thông tin cá nhân", icon: <FaUserGraduate /> }
        ]
    };

    const userMenu = menuItems[user?.role] || [];

    return (
        <div className="sidebar dark-theme shadow vh-100 p-3">
            <ul className="list-unstyled" >
                {userMenu.map((item, index) => (
                    <li key={index}>
                        <Link
                            className={`text-decoration-none fs-5 sidebar-link ${location.pathname === item.to ? "active" : ""}`}
                            to={item.to}
                        >
                            <span className="icon">{item.icon}</span> {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
