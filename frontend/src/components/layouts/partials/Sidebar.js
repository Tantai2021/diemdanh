import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/Auth"; // Sử dụng context để lấy thông tin người dùng

const Sidebar = () => {
    const { user } = useAuth(); // Lấy thông tin người dùng từ context

    return (
        <div className="sidebar border-2 border vh-100 pt-2 px-3">
            <ul className="list-unstyled">
                {user?.role === "admin" && (
                    <>
                        <li className="list-style-none mb-2"><Link className="text-decoration-none fs-5 text-black" to="/students">Quản lý sinh viên</Link></li>
                        <li className="list-style-none mb-2"><Link className="text-decoration-none fs-5 text-black" to="/teachers">Quản lý giảng viên</Link></li>
                        <li className="list-style-none mb-2"><Link className="text-decoration-none fs-5 text-black" to="/classes">Quản lý lớp học</Link></li>
                        <li className="list-style-none mb-2"><Link className="text-decoration-none fs-5 text-black" to="/attendance">Quản lý điểm danh</Link></li>
                    </>
                )}

                {user?.role === "teacher" && (
                    <>
                        <li className="list-style-none mb-2"><Link className="text-decoration-none fs-5 text-black" to="/classes">Quản lý lớp học</Link></li>
                        <li className="list-style-none mb-2"><Link className="text-decoration-none fs-5 text-black" to="/teacher">Thời khóa biểu</Link></li>
                        <li className="list-style-none mb-2"><Link className="text-decoration-none fs-5 text-black" to="/attendance">Điểm danh</Link></li>
                    </>
                )}

                {user?.role === "student" && (
                    <>
                        <li className="list-style-none mb-2"><Link className="text-decoration-none fs-5 text-black" to="/attendance">Điểm danh</Link></li>
                        <li className="list-style-none mb-2"><Link className="text-decoration-none fs-5 text-black" to="/profile">Thông tin cá nhân</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
