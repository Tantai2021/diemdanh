import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/Auth"; // Sử dụng context để lấy thông tin người dùng

const Sidebar = () => {
    const { user } = useAuth(); // Lấy thông tin người dùng từ context

    return (
        <div className="sidebar">
            <h2>Trang Quản Lý</h2>
            <ul>
                {user?.role === "admin" && (
                    <>
                        <li><Link to="/students">Quản lý sinh viên</Link></li>
                        <li><Link to="/teachers">Quản lý giảng viên</Link></li>
                        <li><Link to="/classes">Quản lý lớp học</Link></li>
                        <li><Link to="/attendance">Quản lý điểm danh</Link></li>
                    </>
                )}

                {user?.role === "teacher" && (
                    <>
                        <li><Link to="/classes">Quản lý lớp học</Link></li>
                        <li><Link to="/attendance">Điểm danh</Link></li>
                    </>
                )}

                {user?.role === "student" && (
                    <>
                        <li><Link to="/attendance">Điểm danh</Link></li>
                        <li><Link to="/profile">Thông tin cá nhân</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
